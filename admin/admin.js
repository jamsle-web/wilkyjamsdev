const db = window.portfolioSupabase;

const esc = (value = '') => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const money = (value, currency = 'USD') => new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Number(value || 0));

function adminNotify(message, type='info') {
    if (typeof window.jpNotify === 'function') return window.jpNotify(message, type);
    console[type === 'error' ? 'error' : 'log'](message);
}
function adminConfirm(message) {
    if (typeof window.jpConfirm === 'function') return window.jpConfirm(message);
    return Promise.resolve(window.confirm(message));
}

async function uploadMedia(file, folder = 'uploads') {
    if (!file || !file.size) return '';
    const allowed = ['image/jpeg','image/png','image/webp','image/gif','image/avif'];
    if (!allowed.includes(file.type)) throw new Error('Formato no permitido. Usa JPG, PNG, WebP, GIF o AVIF.');
    if (file.size > 5 * 1024 * 1024) throw new Error('La imagen supera el límite de 5 MB.');
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
    const safeFolder = String(folder).replace(/[^a-z0-9/_-]/gi, '').replace(/^\/+|\/+$/g, '') || 'uploads';
    const path = `${safeFolder}/${crypto.randomUUID()}.${ext}`;
    const { error } = await db.storage.from('portfolio-media').upload(path, file, {
        cacheControl: '31536000',
        contentType: file.type,
        upsert: false
    });
    if (error) throw error;
    return db.storage.from('portfolio-media').getPublicUrl(path).data.publicUrl;
}

function imageUploadField(name='image_file', folder='uploads') {
    return `<label style="display:grid;gap:6px"><span>Subir imagen (máx. 5 MB)</span><input name="${esc(name)}" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" data-upload-folder="${esc(folder)}"></label>`;
}

async function requireAdmin() {
    if (!db) return location.replace('login.html');
    const { data: { session } } = await db.auth.getSession();
    if (!session?.user) return location.replace('login.html');
    const role = session.user.app_metadata?.role;
    if (role !== 'admin') {
        await db.auth.signOut();
        adminNotify('Acceso denegado. Esta cuenta no tiene permisos de administrador.', 'error');
        return location.replace('login.html');
    }
    return session.user;
}

async function loadStats() {
    const [{ data: orderRows, count: orders }, { count: messages }, { count: visits }] = await Promise.all([
        db.from('orders').select('total,status', { count: 'exact' }).limit(5000),
        db.from('contact_messages').select('*', { count: 'exact', head: true }).in('status', ['new','read']),
        db.from('site_events').select('*', { count: 'exact', head: true }).eq('event_type', 'page_view')
    ]);
    const sales = (orderRows || []).filter(o => !['cancelled'].includes(o.status)).reduce((sum,o) => sum + Number(o.total || 0), 0);
    const values = document.querySelectorAll('.admin-stat-card .stat-value');
    if (values[0]) values[0].textContent = new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(sales);
    if (values[1]) values[1].textContent = orders ?? 0;
    if (values[2]) values[2].textContent = visits ?? 0;
    if (values[3]) values[3].textContent = messages ?? 0;
    const labels = document.querySelectorAll('.admin-stat-card .stat-label');
    if (labels[0]) labels[0].textContent = 'Ventas registradas';
    if (labels[1]) labels[1].textContent = 'Pedidos totales';
    if (labels[2]) labels[2].textContent = 'Visitas registradas';
    if (labels[3]) labels[3].textContent = 'Mensajes pendientes';
    await loadAnalytics();
}

async function loadAnalytics() {
    const body = document.getElementById('topPagesTableBody');
    const sessionsEl = document.getElementById('uniqueSessionsValue');
    const todayEl = document.getElementById('todayVisitsValue');
    const liveEl = document.getElementById('analyticsLiveStatus');
    if (!body && !sessionsEl && !todayEl) return;

    const { data, error } = await db.from('site_events')
        .select('page,session_id,created_at')
        .eq('event_type', 'page_view')
        .order('created_at', { ascending: false })
        .limit(2000);

    if (error) {
        if (body) body.innerHTML = `<tr><td colspan="3">${esc(error.message)}</td></tr>`;
        if (liveEl) liveEl.textContent = 'Sin conexión';
        return;
    }

    const rows = data || [];
    const uniqueSessions = new Set(rows.map(r => r.session_id).filter(Boolean)).size;
    const todayKey = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Santo_Domingo' });
    const todayVisits = rows.filter(r => new Date(r.created_at).toLocaleDateString('en-CA', { timeZone: 'America/Santo_Domingo' }) === todayKey).length;
    if (sessionsEl) sessionsEl.textContent = uniqueSessions;
    if (todayEl) todayEl.textContent = todayVisits;

    if (!body) return;
    const pages = new Map();
    rows.forEach(row => {
        const page = row.page || '/';
        const item = pages.get(page) || { count: 0, last: row.created_at };
        item.count += 1;
        if (new Date(row.created_at) > new Date(item.last)) item.last = row.created_at;
        pages.set(page, item);
    });
    const top = [...pages.entries()].sort((a,b) => b[1].count - a[1].count).slice(0, 10);
    body.innerHTML = top.length ? top.map(([page, item]) => `<tr><td>${esc(page)}</td><td>${item.count}</td><td>${new Date(item.last).toLocaleString('es-DO')}</td></tr>`).join('') : '<tr><td colspan="3">Todavía no hay visitas registradas.</td></tr>';
    if (liveEl) liveEl.textContent = 'En tiempo real';
}

function initRealtimeDashboard() {
    if (!db || !db.channel) return;
    const refresh = (() => {
        let timer;
        return () => {
            clearTimeout(timer);
            timer = setTimeout(async () => {
                await loadStats();
                if (typeof window.loadAdminNotifications === 'function') window.loadAdminNotifications();
            }, 350);
        };
    })();

    const channel = db.channel('wilkyjams-admin-live')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'site_events' }, payload => {
            refresh();
            window.handleRealtimeSiteEvent?.(payload);
        })
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, payload => { refresh(); window.handleRealtimeBusinessEvent?.(payload); })
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'contact_messages' }, payload => { refresh(); window.handleRealtimeBusinessEvent?.(payload); })
        .subscribe(status => {
            const liveEl = document.getElementById('analyticsLiveStatus');
            if (!liveEl) return;
            liveEl.textContent = status === 'SUBSCRIBED' ? 'En tiempo real' : 'Conectando…';
            liveEl.classList.toggle('is-live', status === 'SUBSCRIBED');
        });

    window.addEventListener('beforeunload', () => db.removeChannel(channel));
}

async function loadProducts() {
    const body = document.getElementById('productsTableBody');
    if (!body) return;
    const { data, error } = await db.from('products').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: false });
    if (error) { body.innerHTML = `<tr><td colspan="5">${esc(error.message)}</td></tr>`; return; }
    if (!data.length) { body.innerHTML = '<tr><td colspan="5">No hay productos todavía.</td></tr>'; return; }
    body.innerHTML = data.map(p => `<tr>
        <td><div class="prod-cell">${p.image_url ? `<img src="${esc(p.image_url)}" alt="${esc(p.name_es)}">` : ''}<span>${esc(p.name_es)}</span></div></td>
        <td>${esc(p.category || p.slug || '—')}</td><td>${money(p.price, p.currency)}</td>
        <td><span class="status-pill ${p.active ? 'active' : 'pending'}">${p.active ? 'Activo' : 'Oculto'}</span></td>
        <td><div class="table-actions"><button onclick="editProduct('${p.id}')" title="Editar"><i class="fas fa-pen"></i></button><button class="danger" onclick="deleteProduct('${p.id}')" title="Eliminar"><i class="fas fa-trash"></i></button></div></td>
    </tr>`).join('');
}

function field(icon, label, name, value='', type='text', extra='') {
    return `<label class="cms-field"><span class="cms-field-label"><i class="${icon}"></i>${label}</span><input name="${esc(name)}" type="${esc(type)}" value="${esc(value)}" ${extra}></label>`;
}
function area(icon, label, name, value='', extra='') {
    return `<label class="cms-field cms-field-full"><span class="cms-field-label"><i class="${icon}"></i>${label}</span><textarea name="${esc(name)}" ${extra}>${esc(value)}</textarea></label>`;
}
function imageUploadField(name='image_file', folder='uploads', current='') {
    return `<div class="cms-upload-field"><div class="cms-upload-head"><span class="cms-field-label"><i class="fas fa-image"></i>Imagen</span><span class="cms-help">JPG, PNG, WebP, GIF o AVIF · máx. 5 MB</span></div><label class="cms-dropzone"><input name="${esc(name)}" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" data-upload-folder="${esc(folder)}"><span><i class="fas fa-cloud-arrow-up"></i><strong>Seleccionar imagen</strong><small>Haz clic para subir una nueva imagen</small></span></label><div class="cms-image-preview" data-preview>${current ? `<img src="${esc(current)}" alt="Vista previa">` : '<i class="fas fa-image"></i><span>Vista previa</span>'}</div></div>`;
}
function cmsModal(title, fields, onSubmit) {
    const wrap = document.createElement('div');
    wrap.id = 'cmsGenericModal';
    wrap.className = 'cms-modal';
    wrap.innerHTML = `<div class="cms-dialog" role="dialog" aria-modal="true" aria-label="${esc(title)}"><button type="button" class="cms-close" id="cmsClose" aria-label="Cerrar"><i class="fas fa-xmark"></i></button><div class="cms-dialog-head"><span class="cms-eyebrow"><i class="fas fa-sparkles"></i> CMS · WilkyJamsDev</span><h2>${esc(title)}</h2><p>Administra el contenido sin alterar el diseño público.</p></div><form id="cmsGenericForm" class="cms-form">${fields.join('')}<div class="cms-form-actions"><button type="button" class="cms-btn cms-btn-secondary" id="cmsCancel">Cancelar</button><button type="submit" class="cms-btn cms-btn-primary"><i class="fas fa-save"></i> Guardar cambios</button></div></form></div>`;
    document.body.appendChild(wrap);
    const close=()=>wrap.remove();
    wrap.querySelector('#cmsClose').onclick=close;
    wrap.querySelector('#cmsCancel').onclick=close;
    wrap.addEventListener('click', e=>{ if(e.target===wrap) close(); });
    wrap.querySelector('form').addEventListener('submit', async e=>{ e.preventDefault(); const submit=e.currentTarget.querySelector('[type="submit"]'); if(submit) submit.disabled=true; try { await onSubmit(new FormData(e.currentTarget)); } finally { if(submit && document.body.contains(submit)) submit.disabled=false; } });
    wrap.querySelectorAll('input[type="file"]').forEach(input=>input.addEventListener('change',()=>{ const file=input.files?.[0]; const preview=wrap.querySelector('[data-preview]'); if(!file||!preview)return; if(file.size>5*1024*1024){adminNotify('La imagen supera el límite de 5 MB.');input.value='';return;} const url=URL.createObjectURL(file); preview.innerHTML=`<img src="${url}" alt="Vista previa">`; }));
    return wrap;
}

function productForm(product = {}) {
    return cmsModal(product.id ? 'Editar producto' : 'Nuevo producto', [
        `<div class="cms-section"><div class="cms-section-title"><i class="fas fa-language"></i><span>Contenido multilingüe</span></div><div class="cms-grid cms-grid-3">${field('fas fa-flag','Nombre · Español','name_es',product.name_es||'','text','required')}${field('fas fa-flag-usa','Name · English','name_en',product.name_en||'')}${field('fas fa-language','Nom · Français','name_fr',product.name_fr||'')}</div><div class="cms-grid cms-grid-3">${area('fas fa-align-left','Descripción · Español','description_es',product.description_es||'')}${area('fas fa-align-left','Description · English','description_en',product.description_en||'')}${area('fas fa-align-left','Description · Français','description_fr',product.description_fr||'')}</div></div>`,
        `<div class="cms-section"><div class="cms-section-title"><i class="fas fa-sliders"></i><span>Catálogo y precio</span></div><div class="cms-grid cms-grid-3">${field('fas fa-tags','Categoría','category',product.category||'')}${field('fas fa-link','Slug','slug',product.slug||'','text','required')}${field('fas fa-sort','Orden','sort_order',product.sort_order??0,'number','min="0" step="1"')}</div><div class="cms-grid cms-grid-3">${field('fas fa-tag','Precio','price',product.price??0,'number','min="0" step="0.01" required')}${field('fas fa-tags','Precio anterior','old_price',product.old_price??'','number','min="0" step="0.01"')}${field('fas fa-boxes-stacked','Stock','stock',product.stock??0,'number','min="0" step="1" required')}</div></div>`,        `<div class="cms-section"><div class="cms-section-title"><i class="fas fa-circle-info"></i><span>Información del producto</span></div><div class="cms-grid cms-grid-3">${field('fas fa-list-check','Incluye · ES','detail_includes_es',product.details?.es?.includes||'')}${field('fas fa-clock','Tiempo · ES','detail_time_es',product.details?.es?.time||'')}${field('fas fa-file-lines','Formato · ES','detail_format_es',product.details?.es?.format||'')}</div><div class="cms-grid cms-grid-3">${field('fas fa-list-check','Includes · EN','detail_includes_en',product.details?.en?.includes||'')}${field('fas fa-clock','Time · EN','detail_time_en',product.details?.en?.time||'')}${field('fas fa-file-lines','Format · EN','detail_format_en',product.details?.en?.format||'')}</div><div class="cms-grid cms-grid-3">${field('fas fa-list-check','Comprend · FR','detail_includes_fr',product.details?.fr?.includes||'')}${field('fas fa-clock','Délai · FR','detail_time_fr',product.details?.fr?.time||'')}${field('fas fa-file-lines','Format · FR','detail_format_fr',product.details?.fr?.format||'')}</div><div class="cms-grid cms-grid-3">${field('fas fa-rotate','Revisiones · ES','detail_revisions_es',product.details?.es?.revisions||'')}${field('fas fa-circle-check','Disponibilidad · ES','detail_availability_es',product.details?.es?.availability||'')}</div></div>`,
        imageUploadField('image_file','products',product.image_url||''),
        field('fas fa-link','URL de imagen (opcional)','image_url',product.image_url||'','url','maxlength="500"'),
        `<label class="cms-switch"><input name="active" type="checkbox" ${product.active!==false?'checked':''}><span class="cms-switch-ui"></span><span><strong>Publicado en la tienda</strong><small>El producto será visible para los visitantes.</small></span></label>`
    ], async fd => {
        try { const file=fd.get('image_file'); let imageUrl=String(fd.get('image_url')||'').trim(); if(file&&file.size) imageUrl=await uploadMedia(file,'products'); const payload=Object.fromEntries(fd.entries()); delete payload.image_file; payload.image_url=imageUrl||null; payload.price=Number(payload.price||0); payload.stock=Number(payload.stock||0); payload.old_price=fd.get('old_price')?Number(fd.get('old_price')):null; payload.sort_order=Number(fd.get('sort_order')||0); payload.active=fd.has('active'); payload.currency='USD'; if(!payload.category) payload.category='web'; payload.details={es:{includes:String(fd.get('detail_includes_es')||''),time:String(fd.get('detail_time_es')||''),format:String(fd.get('detail_format_es')||''),revisions:String(fd.get('detail_revisions_es')||''),availability:String(fd.get('detail_availability_es')||'')},en:{includes:String(fd.get('detail_includes_en')||''),time:String(fd.get('detail_time_en')||''),format:String(fd.get('detail_format_en')||'')},fr:{includes:String(fd.get('detail_includes_fr')||''),time:String(fd.get('detail_time_fr')||''),format:String(fd.get('detail_format_fr')||'')}}; const q=product.id?db.from('products').update(payload).eq('id',product.id):db.from('products').insert(payload); const {error}=await q; if(error)throw error; document.getElementById('cmsGenericModal')?.remove(); await loadProducts(); } catch(error){ adminNotify(error.message||'No se pudo guardar el producto.'); }
    });
}

async function editProduct(id) {
    const { data, error } = await db.from('products').select('*').eq('id', id).single();
    if (error) return adminNotify(error.message); productForm(data);
}
async function deleteProduct(id) {
    if (!(await adminConfirm('¿Eliminar este producto? Esta acción no se puede deshacer.'))) return;
    const { error } = await db.from('products').delete().eq('id', id);
    if (error) return adminNotify(error.message); await loadProducts();
}

async function loadOrders() {
    const panel = document.querySelector('#panelPedidos tbody'); if (!panel) return;
    const { data, error } = await db.from('orders').select('*').order('created_at', { ascending: false }).limit(50);
    if (error) return panel.innerHTML = `<tr><td colspan="5">${esc(error.message)}</td></tr>`;
    panel.innerHTML = data.length ? data.map(o => {
        const items = Array.isArray(o.items) ? o.items.map(i => i?.name).filter(Boolean).join(', ') : 'Pedido';
        const status = o.status || 'pending';
        const labels = {pending:'Pendiente',confirmed:'Confirmado',processing:'Procesando',completed:'Completado',cancelled:'Cancelado'};
        const cls = status === 'completed' ? 'paid' : status === 'cancelled' ? 'cancelled' : status === 'pending' ? 'pending' : 'active';
        return `<tr><td>${esc(o.customer_name || '—')}</td><td title="${esc(items)}">${esc(items || 'Pedido')}</td><td>${money(o.total,o.currency)}</td><td><select class="admin-inline-select" aria-label="Estado del pedido" onchange="updateOrderStatus('${o.id}',this.value)">${Object.entries(labels).map(([k,v])=>`<option value="${k}" ${k===status?'selected':''}>${v}</option>`).join('')}</select></td><td>${new Date(o.created_at).toLocaleDateString('es-DO')}</td></tr>`;
    }).join('') : '<tr><td colspan="5">No hay pedidos todavía.</td></tr>';
}
async function updateOrderStatus(id, status) {
    const allowed=['pending','confirmed','processing','completed','cancelled']; if(!allowed.includes(status))return;
    const {error}=await db.from('orders').update({status,updated_at:new Date().toISOString()}).eq('id',id);
    if(error){adminNotify(error.message);await loadOrders();return;}
    await loadStats();
}

async function loadMessages() {
    const panel = document.querySelector('#panelMensajes tbody'); if (!panel) return;
    const { data, error } = await db.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(50);
    if (error) return panel.innerHTML = `<tr><td colspan="5">${esc(error.message)}</td></tr>`;
    panel.innerHTML = data.length ? data.map(m => {
        const status=m.status||'new'; const labels={new:'Nuevo',read:'Leído',replied:'Respondido',archived:'Archivado'};
        return `<tr><td>${esc(m.name)}</td><td>${esc(m.subject || '—')}</td><td>${esc(m.email)}</td><td><select class="admin-inline-select" aria-label="Estado del mensaje" onchange="updateMessageStatus('${m.id}',this.value)">${Object.entries(labels).map(([k,v])=>`<option value="${k}" ${k===status?'selected':''}>${v}</option>`).join('')}</select></td><td>${new Date(m.created_at).toLocaleDateString('es-DO')}</td></tr>`;
    }).join('') : '<tr><td colspan="5">No hay mensajes todavía.</td></tr>';
}
async function updateMessageStatus(id,status){const allowed=['new','read','replied','archived'];if(!allowed.includes(status))return;const {error}=await db.from('contact_messages').update({status}).eq('id',id);if(error){adminNotify(error.message);await loadMessages();return;}await loadStats();}

window.updateOrderStatus=updateOrderStatus;
window.updateMessageStatus=updateMessageStatus;

window.logoutAdmin = async () => { await db.auth.signOut(); location.href = 'login.html'; };
window.scrollToPanel = (e,id) => { e.preventDefault(); window.setAdminSection?.(id); };
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.newProduct = () => productForm();


async function loadTestimonials() {
    const body = document.getElementById('testimonialsTableBody'); if (!body) return;
    body.innerHTML = '<tr><td colspan="5">Cargando opiniones…</td></tr>';
    const { data, error } = await db.from('testimonials').select('*').order('sort_order').order('created_at',{ascending:false});
    if (error) return body.innerHTML = `<tr><td colspan="5">${esc(error.message)}</td></tr>`;
    body.innerHTML = data?.length ? data.map(t => `<tr><td><strong>${esc(t.name_es)}</strong></td><td>${esc(t.role_es || '—')}</td><td>${'★'.repeat(Number(t.rating || 5))}</td><td><span class="status-pill ${t.active?'active':'pending'}">${t.active?'Visible':'Oculta'}</span></td><td><div class="table-actions"><button onclick="editTestimonial('${t.id}')" title="Editar" aria-label="Editar"><i class="fas fa-pen"></i></button><button onclick="toggleTestimonial('${t.id}',${!t.active})" title="${t.active?'Ocultar':'Mostrar'}" aria-label="${t.active?'Ocultar':'Mostrar'}"><i class="fas fa-${t.active?'eye-slash':'eye'}"></i></button><button class="danger" onclick="deleteTestimonial('${t.id}')" title="Eliminar" aria-label="Eliminar"><i class="fas fa-trash"></i></button></div></td></tr>`).join('') : '<tr><td colspan="5">No hay opiniones todavía. Añade la primera desde aquí.</td></tr>';
}

function testimonialForm(testimonial={}) {
    const v = k => testimonial[k] ?? '';
    return cmsModal(testimonial.id ? 'Editar opinión' : 'Nueva opinión', [
        `<div class="cms-section"><div class="cms-section-title"><i class="fas fa-language"></i><span>Contenido multilingüe</span></div><div class="cms-grid cms-grid-3">${field('fas fa-user','Nombre · Español','name_es',v('name_es'),'text','required')}${field('fas fa-user','Name · English','name_en',v('name_en'))}${field('fas fa-user','Nom · Français','name_fr',v('name_fr'))}</div><div class="cms-grid cms-grid-3">${field('fas fa-briefcase','Rol / empresa · Español','role_es',v('role_es'))}${field('fas fa-briefcase','Role / company · English','role_en',v('role_en'))}${field('fas fa-briefcase','Rôle / entreprise · Français','role_fr',v('role_fr'))}</div><div class="cms-grid cms-grid-3">${area('fas fa-comment','Opinión · Español','text_es',v('text_es'),'required')}${area('fas fa-comment','Testimonial · English','text_en',v('text_en'))}${area('fas fa-comment','Témoignage · Français','text_fr',v('text_fr'))}</div></div>`,
        imageUploadField('image_file','testimonials',v('avatar_url')),
        field('fas fa-image','URL de avatar (opcional)','avatar_url',v('avatar_url'),'url','maxlength="500"'),
        `<div class="cms-grid cms-grid-3">${field('fas fa-star','Estrellas','rating',testimonial.rating??5,'number','min="1" max="5" step="1" required')}${field('fas fa-sort','Orden','sort_order',testimonial.sort_order??0,'number','min="0" step="1"')}<label class="cms-switch"><input name="active" type="checkbox" ${testimonial.active!==false?'checked':''}><span class="cms-switch-ui"></span><span><strong>Visible</strong><small>La opinión se muestra en el sitio público.</small></span></label></div>`
    ], async fd => {
        try {
            const file = fd.get('image_file');
            let avatarUrl = String(fd.get('avatar_url') || '').trim();
            if (file && file.size) avatarUrl = await uploadMedia(file,'testimonials');
            const payload = Object.fromEntries(fd.entries());
            delete payload.image_file;
            payload.avatar_url = avatarUrl || null;
            payload.rating = Math.max(1, Math.min(5, Number(fd.get('rating') || 5)));
            payload.sort_order = Number(fd.get('sort_order') || 0);
            payload.active = fd.has('active');
            payload.updated_at = new Date().toISOString();
            const q = testimonial.id ? db.from('testimonials').update(payload).eq('id',testimonial.id) : db.from('testimonials').insert(payload);
            const { error } = await q; if (error) throw error;
            document.getElementById('cmsGenericModal')?.remove();
            await loadTestimonials();
        } catch(error) { adminNotify(error.message || 'No se pudo guardar la opinión.','error'); }
    });
}
async function editTestimonial(id){const {data,error}=await db.from('testimonials').select('*').eq('id',id).single();if(error)return adminNotify(error.message,'error');testimonialForm(data)}
async function toggleTestimonial(id,active){const {error}=await db.from('testimonials').update({active,updated_at:new Date().toISOString()}).eq('id',id);if(error)return adminNotify(error.message,'error');await loadTestimonials()}
async function deleteTestimonial(id){if(!(await adminConfirm('¿Eliminar esta opinión? Esta acción no se puede deshacer.')))return;const {error}=await db.from('testimonials').delete().eq('id',id);if(error)return adminNotify(error.message,'error');await loadTestimonials()}
window.editTestimonial=editTestimonial; window.toggleTestimonial=toggleTestimonial; window.deleteTestimonial=deleteTestimonial; window.newTestimonial=()=>testimonialForm();



async function loadProjects() {
    const body = document.getElementById('projectsTableBody'); if (!body) return;
    const { data, error } = await db.from('projects').select('*').order('sort_order').order('created_at', {ascending:false});
    if (error) return body.innerHTML = `<tr><td colspan="4">${esc(error.message)}</td></tr>`;
    body.innerHTML = data.length ? data.map(p => `<tr><td>${esc(p.title_es)}</td><td>${esc(p.slug)}</td><td><span class="status-pill ${p.published?'active':'pending'}">${p.published?'Publicado':'Oculto'}</span></td><td><div class="table-actions"><button onclick="editProject('${p.id}')"><i class="fas fa-pen"></i></button><button class="danger" onclick="deleteProject('${p.id}')"><i class="fas fa-trash"></i></button></div></td></tr>`).join('') : '<tr><td colspan="4">No hay proyectos. Puedes añadirlos desde aquí.</td></tr>';
}
function projectForm(project={}) {
    const v=k=>project[k]||'';
    return cmsModal(project.id?'Editar proyecto':'Nuevo proyecto', [
        `<div class="cms-section"><div class="cms-section-title"><i class="fas fa-language"></i><span>Contenido multilingüe</span></div><div class="cms-grid cms-grid-3">${field('fas fa-flag','Título · Español','title_es',v('title_es'),'text','required')}${field('fas fa-flag-usa','Title · English','title_en',v('title_en'))}${field('fas fa-language','Titre · Français','title_fr',v('title_fr'))}</div><div class="cms-grid cms-grid-3">${area('fas fa-align-left','Descripción · Español','description_es',v('description_es'))}${area('fas fa-align-left','Description · English','description_en',v('description_en'))}${area('fas fa-align-left','Description · Français','description_fr',v('description_fr'))}</div></div>`,
        `<div class="cms-section"><div class="cms-section-title"><i class="fas fa-link"></i><span>Proyecto</span></div><div class="cms-grid cms-grid-2">${field('fas fa-link','Slug','slug',v('slug'),'text','required')}${field('fas fa-globe','URL del proyecto','project_url',v('project_url'),'url')}</div>${field('fas fa-tags','Etiquetas','tags',(project.tags||[]).join(', '))}</div>`,
        imageUploadField('image_file','projects',v('image_url')),
        field('fas fa-image','URL de imagen (opcional)','image_url',v('image_url'),'url'),
        `<div class="cms-grid cms-grid-2">${field('fas fa-sort','Orden','sort_order',project.sort_order??0,'number','min="0" step="1"')}<div class="cms-check-group"><label class="cms-switch"><input name="featured" type="checkbox" ${project.featured?'checked':''}><span class="cms-switch-ui"></span><span><strong>Destacado</strong><small>Aparece como proyecto destacado.</small></span></label><label class="cms-switch"><input name="published" type="checkbox" ${project.published!==false?'checked':''}><span class="cms-switch-ui"></span><span><strong>Publicado</strong><small>Visible en el portfolio público.</small></span></label></div></div>`
    ], async fd=>{ try { const file=fd.get('image_file'); let imageUrl=String(fd.get('image_url')||'').trim(); if(file&&file.size) imageUrl=await uploadMedia(file,'projects'); const payload=Object.fromEntries(fd.entries()); delete payload.image_file; payload.image_url=imageUrl||null; payload.tags=String(fd.get('tags')||'').split(',').map(x=>x.trim()).filter(Boolean); payload.sort_order=Number(fd.get('sort_order')||0); payload.featured=fd.has('featured'); payload.published=fd.has('published'); const q=project.id?db.from('projects').update(payload).eq('id',project.id):db.from('projects').insert(payload); const {error}=await q;if(error)throw error;document.getElementById('cmsGenericModal')?.remove();await loadProjects(); } catch(error){adminNotify(error.message||'No se pudo guardar el proyecto.');} });
}
async function editProject(id){const {data,error}=await db.from('projects').select('*').eq('id',id).single();if(error)return adminNotify(error.message);projectForm(data)}
async function deleteProject(id){if(!(await adminConfirm('¿Eliminar este proyecto? Esta acción no se puede deshacer.')))return;const {error}=await db.from('projects').delete().eq('id',id);if(error)return adminNotify(error.message);await loadProjects()}

async function loadServices() {
    const body=document.getElementById('servicesTableBody'); if(!body)return;
    const {data,error}=await db.from('services').select('*').order('sort_order').order('created_at',{ascending:false});
    if(error)return body.innerHTML=`<tr><td colspan="4">${esc(error.message)}</td></tr>`;
    body.innerHTML=data.length?data.map(s=>`<tr><td>${esc(s.title_es)}</td><td>${money(s.price,s.currency)}</td><td><span class="status-pill ${s.published?'active':'pending'}">${s.published?'Publicado':'Oculto'}</span></td><td><div class="table-actions"><button onclick="editService('${s.id}')" title="Editar" aria-label="Editar"><i class="fas fa-pen"></i></button><button class="danger" onclick="deleteService('${s.id}')" title="Eliminar" aria-label="Eliminar"><i class="fas fa-trash"></i></button></div></td></tr>`).join(''):'<tr><td colspan="4">No hay servicios. Puedes añadirlos desde aquí.</td></tr>';
}
function serviceForm(service={}){const v=k=>service[k]||''; return cmsModal(service.id?'Editar servicio':'Nuevo servicio',[
    `<div class="cms-section"><div class="cms-section-title"><i class="fas fa-language"></i><span>Contenido multilingüe</span></div><div class="cms-grid cms-grid-3">${field('fas fa-flag','Título · Español','title_es',v('title_es'),'text','required')}${field('fas fa-flag-usa','Title · English','title_en',v('title_en'))}${field('fas fa-language','Titre · Français','title_fr',v('title_fr'))}</div><div class="cms-grid cms-grid-3">${area('fas fa-align-left','Descripción · Español','description_es',v('description_es'))}${area('fas fa-align-left','Description · English','description_en',v('description_en'))}${area('fas fa-align-left','Description · Français','description_fr',v('description_fr'))}</div></div>`,
    `<div class="cms-section"><div class="cms-section-title"><i class="fas fa-sliders"></i><span>Configuración</span></div><div class="cms-grid cms-grid-2">${field('fas fa-link','Slug','slug',v('slug'),'text','required')}${field('fas fa-icons','Icono Font Awesome','icon',v('icon')||'fas fa-globe')}</div><div class="cms-grid cms-grid-3">${field('fas fa-dollar-sign','Precio','price',service.price??0,'number','min="0" step="0.01" required')}${field('fas fa-coins','Moneda','currency',v('currency')||'USD','text','maxlength="3"')}${field('fas fa-sort','Orden','sort_order',service.sort_order??0,'number','min="0" step="1"')}</div></div>`,
    `<label class="cms-switch"><input name="published" type="checkbox" ${service.published!==false?'checked':''}><span class="cms-switch-ui"></span><span><strong>Publicado</strong><small>Visible en la sección de servicios.</small></span></label>`
],async fd=>{try{const payload=Object.fromEntries(fd.entries());payload.price=Number(fd.get('price')||0);payload.sort_order=Number(fd.get('sort_order')||0);payload.published=fd.has('published');payload.currency=String(payload.currency||'USD').toUpperCase().slice(0,3);const q=service.id?db.from('services').update(payload).eq('id',service.id):db.from('services').insert(payload);const {error}=await q;if(error)throw error;document.getElementById('cmsGenericModal')?.remove();await loadServices()}catch(error){adminNotify(error.message||'No se pudo guardar el servicio.')}})}
async function editService(id){const {data,error}=await db.from('services').select('*').eq('id',id).single();if(error)return adminNotify(error.message);serviceForm(data)}
async function deleteService(id){if(!(await adminConfirm('¿Eliminar este servicio? Esta acción no se puede deshacer.')))return;const {error}=await db.from('services').delete().eq('id',id);if(error)return adminNotify(error.message);await loadServices()}

window.editProject=editProject; window.deleteProject=deleteProject; window.editService=editService; window.deleteService=deleteService;



const SETTINGS_DEFAULTS = {
    site_name: 'Jamsle Porcena',
    site_role: 'Diseño Web & Marketing Digital',
    whatsapp: '18099995904',
    phone: '+1 (809) 999-59-04',
    email: '',
    description_es: '',
    description_en: '',
    description_fr: '',
    linkedin: '',
    github: 'https://github.com/jamsle-web',
    behance: '',
    youtube: '',
    profile_image: '',
};

async function loadSettings() {
    const form = document.getElementById('siteSettingsForm');
    if (!form) return;
    const { data, error } = await db.from('site_settings').select('key,value');
    if (error) return adminNotify(error.message);
    const values = { ...SETTINGS_DEFAULTS };
    (data || []).forEach(row => {
        if (Object.prototype.hasOwnProperty.call(values, row.key)) {
            values[row.key] = typeof row.value === 'object' && row.value !== null && 'value' in row.value ? row.value.value : row.value;
        }
    });
    Object.entries(values).forEach(([key, value]) => {
        const field = form.elements.namedItem(key);
        if (field) field.value = value ?? '';
    });
}

async function saveSettings() {
    const form = document.getElementById('siteSettingsForm');
    if (!form) return;
    const button = document.getElementById('saveSettingsBtn');
    const data = Object.fromEntries(new FormData(form).entries());
    for (const key of ['linkedin','github','behance','youtube','profile_image']) {
        if (data[key] && !/^https:\/\//i.test(data[key])) throw new Error(`La URL de ${key} debe comenzar por https://`);
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new Error('Introduce un correo electrónico válido.');
    if (button) button.disabled = true;
    try {
        for (const [key, value] of Object.entries(data)) {
            const { error } = await db.from('site_settings').upsert({ key, value: String(value).trim(), updated_at: new Date().toISOString() }, { onConflict: 'key' });
            if (error) throw error;
        }
        adminNotify('Configuración guardada correctamente.');
    } catch (error) {
        adminNotify(error.message || 'No se pudo guardar la configuración.');
    } finally { if (button) button.disabled = false; }
}
document.addEventListener('DOMContentLoaded', async () => {
    const user = await requireAdmin(); if (!user) return;
    const emailEl = document.querySelector('.admin-user span'); if (emailEl) emailEl.textContent = user.email || 'Administrador';
    window.dispatchEvent(new CustomEvent('admin:user-ready', { detail: { email: user.email || '' } }));
    contentOverrides = await loadContentOverrides().catch(() => ({}));
    document.getElementById('loadContentEditorBtn')?.addEventListener('click', loadContentEditor);
    document.getElementById('contentPage')?.addEventListener('change', loadContentEditor);
    document.getElementById('contentLang')?.addEventListener('change', loadContentEditor);
    document.getElementById('loadContentEditorBtn')?.click();
    document.getElementById('newProductBtn')?.addEventListener('click', newProduct);
    document.getElementById('newProjectBtn')?.addEventListener('click',()=>projectForm());
    document.getElementById('newTestimonialBtn')?.addEventListener('click',()=>testimonialForm());
    document.getElementById('newServiceBtn')?.addEventListener('click',()=>serviceForm());
    document.getElementById('refreshOrdersBtn')?.addEventListener('click', loadOrders);
    document.getElementById('refreshMessagesBtn')?.addEventListener('click', loadMessages);
    await Promise.all([loadStats(), loadProducts(), loadOrders(), loadMessages(), loadProjects(), loadServices(), loadTestimonials(), loadSettings()]);
    initRealtimeDashboard();
    document.getElementById('siteSettingsForm')?.addEventListener('submit', async (event) => { event.preventDefault(); try { await saveSettings(); } catch (e) { adminNotify(e.message); } });
});


/* ===== Editor de contenido por página/idioma ===== */
const CONTENT_OVERRIDE_KEY = 'content_overrides';
let contentOverrides = {};

async function loadContentOverrides() {
    const { data, error } = await db.from('site_settings').select('value').eq('key', CONTENT_OVERRIDE_KEY).maybeSingle();
    if (error) throw error;
    const raw = data?.value;
    if (!raw) return {};
    try { return typeof raw === 'string' ? JSON.parse(raw) : raw; } catch { return {}; }
}

function contentKeyFromElement(el) {
    return el.getAttribute('data-i18n') || el.getAttribute('data-i18n-placeholder') || '';
}

function contentLabel(key, fallback) {
    const clean = String(key).replace(/\./g,' · ').replace(/_/g,' ');
    return `${clean}${fallback ? ` — ${fallback.slice(0,70)}` : ''}`;
}

async function loadContentEditor() {
    const page = document.getElementById('contentPage')?.value || 'index.html';
    const language = document.getElementById('contentLang')?.value || 'es';
    const wrap = document.getElementById('contentEditorFields');
    if (!wrap) return;
    wrap.innerHTML = '<div class="cms-settings-note"><i class="fas fa-spinner fa-spin"></i><span>Cargando contenido…</span></div>';
    try {
        const response = await fetch(`../${page}`, { cache: 'no-store' });
        if (!response.ok) throw new Error(`No se pudo leer ${page}`);
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const elements = [...doc.querySelectorAll('[data-i18n], [data-i18n-placeholder]')];
        const seen = new Set();
        const fields = [];
        for (const el of elements) {
            const key = contentKeyFromElement(el);
            if (!key || seen.has(key)) continue;
            seen.add(key);
            const isPlaceholder = el.hasAttribute('data-i18n-placeholder');
            const fallback = isPlaceholder ? (el.getAttribute('placeholder') || '') : (el.textContent || '').trim();
            const value = contentOverrides?.[page]?.[language]?.[key] ?? fallback;
            const safeName = `content_${fields.length}`;
            fields.push({ key, value, isPlaceholder, fallback, safeName });
        }
        if (!fields.length) {
            wrap.innerHTML = '<div class="cms-settings-note"><i class="fas fa-circle-info"></i><span>No hay textos editables marcados en esta página.</span></div>';
            return;
        }
        wrap.innerHTML = `<div class="cms-editor-toolbar"><div><strong><i class="fas fa-layer-group"></i> ${esc(page.replace('.html',''))}</strong><small><i class="fas fa-globe"></i> ${esc(language.toUpperCase())} · ${fields.length} campos editables</small></div><span class="cms-live-badge"><i class="fas fa-circle"></i> Editor seguro</span></div>` + fields.map((item, index) => `
            <label class="cms-field cms-content-field" data-content-key="${esc(item.key)}">
                <span class="cms-field-label"><span class="cms-field-index">${index+1}</span><i class="fas fa-language"></i><span>${esc(contentLabel(item.key, item.fallback))}</span></span>
                <textarea rows="3" data-content-input="${esc(item.key)}" placeholder="${esc(item.fallback)}">${esc(item.value)}</textarea>
                <small class="cms-field-hint"><i class="fas fa-pen"></i> Edita solo el texto. El diseño y los efectos permanecen intactos.</small>
            </label>`).join('') + `
            <div class="cms-form-actions cms-content-actions">\
                <button type="button" class="cms-btn cms-btn-secondary" id="resetContentOverrides"><i class="fas fa-rotate-left"></i> Restablecer página</button>\
                <button type="button" class="cms-btn cms-btn-primary" id="saveContentOverrides"><i class="fas fa-save"></i> Guardar contenido</button>\
            </div>`;
        document.getElementById('saveContentOverrides').onclick = async () => {
            const values = {};
            wrap.querySelectorAll('[data-content-input]').forEach(input => { values[input.dataset.contentInput] = input.value; });
            contentOverrides[page] = contentOverrides[page] || {};
            contentOverrides[page][language] = values;
            const { error } = await db.from('site_settings').upsert({ key: CONTENT_OVERRIDE_KEY, value: contentOverrides, updated_at: new Date().toISOString() }, { onConflict: 'key' });
            if (error) return adminNotify(error.message);
            adminNotify('Contenido guardado. Recarga el sitio público para ver los cambios.');
        };
        document.getElementById('resetContentOverrides').onclick = async () => {
            if (!(await adminConfirm('¿Restablecer los textos personalizados de esta página e idioma?'))) return;
            if (contentOverrides[page]) delete contentOverrides[page][language];
            const { error } = await db.from('site_settings').upsert({ key: CONTENT_OVERRIDE_KEY, value: contentOverrides, updated_at: new Date().toISOString() }, { onConflict: 'key' });
            if (error) return adminNotify(error.message);
            await loadContentEditor();
        };
    } catch (error) {
        wrap.innerHTML = `<div class="cms-settings-note"><i class="fas fa-triangle-exclamation"></i><span>${esc(error.message || 'No se pudo cargar el contenido.')}</span></div>`;
    }
}

window.loadContentEditor = loadContentEditor;
