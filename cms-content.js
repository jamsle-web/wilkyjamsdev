/* Dynamic public content for WilkyJamsDev Portfolio. Static HTML remains as fallback. */
(function () {
    const db = window.portfolioSupabase;
    const cacheGet=(key,fallback=null)=>{try{const r=localStorage.getItem('wilkyjams_v145_'+key);return r?JSON.parse(r):fallback;}catch{return fallback;}};
    const esc = (v='') => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
    const safeUrl = (value='') => { try { const u = new URL(value, location.href); return ['http:','https:'].includes(u.protocol) ? u.href : ''; } catch { return ''; } };
    const lang = () => (typeof currentLang !== 'undefined' ? currentLang : (localStorage.getItem('jp_lang') || 'es'));
    const tr = (key, fallback) => typeof jpT === 'function' ? jpT(key, fallback) : fallback;
    const pick = (row, field) => row[`${field}_${lang()}`] || row[`${field}_es`] || row[`${field}_en`] || row[`${field}_fr`] || '';

    async function loadProjects() {
        const grid = document.querySelector('#projects .projects-grid');
        if (!grid) return;
        let data=null, error=null;
        if (db) { try { const result=await db.from('projects').select('*').eq('published', true).order('sort_order').order('created_at', {ascending:false}); data=result.data; error=result.error; } catch(e){ error=e; } }
        if (error || !data?.length) data=cacheGet('projects',[]);
        if (!data?.length) return;
        grid.innerHTML = data.map((p, i) => {
            const image = safeUrl(p.image_url);
            const projectUrl = safeUrl(p.project_url);
            return `<div class="project-card" data-aos="flip-up" data-aos-delay="${Math.min(i*100,400)}">
                <div class="project-thumb">${image ? `<img src="${esc(image)}" alt="${esc(pick(p,'title'))}" loading="lazy">` : ''}</div>
                <div class="project-body">
                    <div class="tags">${(p.tags||[]).map(t=>`<span>${esc(t)}</span>`).join('')}</div>
                    <h3>${esc(pick(p,'title'))}</h3>
                    <p>${esc(pick(p,'description'))}</p>
                    ${projectUrl ? `<a class="btn-secondary" href="${esc(projectUrl)}" target="_blank" rel="noopener noreferrer">${tr('cms.view_project', 'View project')}</a>` : ''}
                </div>
            </div>`;
        }).join('');
        if (window.AOS) AOS.refresh();
    }


    const waNumber = () => {
        const configured = document.querySelector('[data-site-setting="whatsapp"]')?.getAttribute('href') || '';
        return configured.match(/wa\.me\/(\d+)/)?.[1] || '18099995904';
    };
    const localizedServiceMessage = (serviceName, price) => {
        const templates = {
            es: `Hola Jamsle, me interesa solicitar el servicio "${serviceName}"${price ? ` por ${price}` : ''}. Me gustaría conocer disponibilidad, plazo y próximos pasos.`,
            en: `Hi Jamsle, I’m interested in requesting the "${serviceName}" service${price ? ` for ${price}` : ''}. I’d like to know availability, timeline and next steps.`,
            fr: `Bonjour Jamsle, je souhaite demander le service « ${serviceName} »${price ? ` au prix de ${price}` : ''}. J’aimerais connaître la disponibilité, le délai et les prochaines étapes.`
        };
        return templates[lang()] || templates.es;
    };

    async function loadServices() {
        const grid = document.querySelector('#pricing .pricing-grid');
        if (!grid) return;
        let data=null, error=null;
        if (db) { try { const result=await db.from('services').select('*').eq('published', true).order('sort_order').order('created_at',{ascending:false}); data=result.data; error=result.error; } catch(e){ error=e; } }
        if (error || !data?.length) data=cacheGet('services',[]);
        if (!data?.length) return;
        grid.innerHTML = data.map((s,i) => {
            const name = pick(s,'title');
            const price = new Intl.NumberFormat('en-US',{style:'currency',currency:s.currency||'USD'}).format(Number(s.price||0));
            const href = `https://wa.me/${waNumber()}?text=${encodeURIComponent(localizedServiceMessage(name, price))}`;
            return `<div class="pricing-card ${i===1?'featured':''}" data-aos="fade-up" data-aos-delay="${50+i*100}">
            ${i===1 ? `<span class="badge-popular">${esc(tr('services.popular','Most chosen'))}</span>` : ''}
            <h4 class="plan-name">${esc(name)}</h4>
            <p class="plan-desc">${esc(pick(s,'description'))}</p>
            <div class="plan-price">${price} <span>${esc(tr('plans.per_project','/ project'))}</span></div>
            <a href="${esc(href)}" target="_blank" rel="noopener noreferrer" class="btn-${i===1?'primary':'secondary'}" style="justify-content:center;">${esc(tr('services.request','Request'))}</a>
        </div>`;
        }).join('');
        if (window.AOS) AOS.refresh();
    }

    async function loadTestimonials() {
        const grid = document.querySelector('#testimonials .testimonials-grid');
        if (!grid) return;
        let data=null, error=null;
        if (db) { try { const result=await db.from('testimonials').select('*').eq('active', true).order('sort_order').order('created_at',{ascending:false}); data=result.data; error=result.error; } catch(e){ error=e; } }
        if (error || !data?.length) data=cacheGet('testimonials',[]);
        if (!data?.length) return;
        grid.innerHTML = data.map((t,i) => {
            const name = pick(t,'name'); const role = pick(t,'role'); const text = pick(t,'text');
            const initial = esc((name || '?').trim().charAt(0).toUpperCase());
            const avatar = safeUrl(t.avatar_url); const rating = Math.max(1,Math.min(5,Number(t.rating||5)));
            return `<div class="testimonial-card" data-aos="fade-up" data-aos-delay="${Math.min(100+i*100,300)}">
                <i class="fas fa-quote-left"></i>
                <div class="testimonial-stars" aria-label="${rating} / 5">${'★'.repeat(rating)}</div>
                <p>${esc(text)}</p>
                <div class="client"><div class="avatar">${avatar ? `<img src="${esc(avatar)}" alt="${esc(name)}" loading="lazy">` : initial}</div><div class="info"><h4>${esc(name)}</h4><span>${esc(role)}</span></div></div>
            </div>`;
        }).join('');
        if (window.AOS) AOS.refresh();
    }

    async function loadSiteSettings() {
        let data=[];
        if (db) { try { const result=await db.from('site_settings').select('key,value'); if(!result.error) data=result.data||[]; } catch {} }
        const cached=cacheGet('settings',{});
        Object.entries(cached||{}).forEach(([key,value])=>{ if(!data.some(r=>r.key===key)) data.push({key,value}); });
        const cachedOverrides=cacheGet('content_overrides',null);
        if(cachedOverrides && !data.some(r=>r.key==='content_overrides')) data.push({key:'content_overrides',value:cachedOverrides});
        const settings = {};
        data.forEach(row => { settings[row.key] = row.value; });

        const localized = (key) => {
            const value = settings[key];
            if (!value || typeof value !== 'object') return '';
            return value[lang()] || value.es || value.en || value.fr || '';
        };
        const FALLBACKS = { site_name: 'Wilkyjams Dev', site_role: 'Diseño Web & Marketing Digital', whatsapp: '18099995904', email: 'porcenatjamsle07@gmail.com', phone: '+1 (809) 999-59-04', github: 'https://github.com/jamsle-web' };
        const raw = (key) => {
            const value = settings[key];
            return value == null || value === '' ? (FALLBACKS[key] || '') : String(value);
        };
        const applyHref = (key, url) => {
            const safe = safeUrl(url);
            document.querySelectorAll(`[data-site-setting="${key}"]`).forEach(el => {
                if (safe) {
                    el.setAttribute('href', safe);
                    el.hidden = false;
                } else {
                    el.setAttribute('href', '#');
                    el.hidden = true;
                }
            });
        };
        const applyText = (key, value) => {
            document.querySelectorAll(`[data-site-setting="${key}"]`).forEach(el => {
                el.textContent = value || el.textContent;
            });
        };

        applyText('site_name', raw('site_name'));
        applyText('site_role', raw('site_role'));
        applyText('email', raw('email'));
        applyText('phone', raw('phone'));
        applyHref('linkedin', raw('linkedin'));
        applyHref('github', raw('github'));
        applyHref('behance', raw('behance'));
        applyHref('youtube', raw('youtube'));

        const email = raw('email');
        document.querySelectorAll('[data-site-setting="email-link"]').forEach(el => {
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                el.href = `mailto:${email}`;
                el.textContent = email;
                el.hidden = false;
            } else el.hidden = true;
        });
        const phone = raw('phone');
        const phoneDigits = phone.replace(/[^\d+]/g, '');
        document.querySelectorAll('[data-site-setting="phone-link"]').forEach(el => {
            if (phoneDigits) {
                el.href = `tel:${phoneDigits}`;
                if (!el.textContent.trim() || el.dataset.siteSettingText === 'true') el.textContent = phone;
                el.hidden = false;
            } else el.hidden = true;
        });
        const wa = raw('whatsapp').replace(/\D/g, '');
        document.querySelectorAll('[data-site-setting="whatsapp"]').forEach(el => {
            if (wa) {
                el.href = `https://wa.me/${wa}`;
                el.hidden = false;
            } else el.hidden = true;
        });

        const descriptions = document.querySelectorAll('[data-site-setting="description"]');
        const description = localized('description');
        descriptions.forEach(el => { if (description) el.textContent = description; });

        const image = safeUrl(raw('profile_image'));
        document.querySelectorAll('[data-site-setting="profile_image"]').forEach(el => {
            if (image) { el.src = image; el.hidden = false; }
        });
        if (typeof window.applyProfileSettings === 'function') window.applyProfileSettings(settings);
        try {
            const socialRaw = settings.social_config;
            const socials = typeof socialRaw === 'string' ? JSON.parse(socialRaw) : socialRaw;
            if (Array.isArray(socials)) document.querySelectorAll('.social-links').forEach(container => {
                const area=container.closest('[data-social-area]')?.dataset.socialArea||'all';
                container.innerHTML = socials.filter(item => item && item.active && safeUrl(item.url) && (item.location==='all' || item.location===area)).map(item => { const size=Math.max(24,Math.min(96,Number(item.size)||48)); return `<a href="${esc(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer" aria-label="${esc(item.label||'Red social')}" style="width:${size}px;height:${size}px;font-size:${Math.max(12,Math.round(size*.42))}px"><i class="${esc(item.icon||'fas fa-link')}"></i></a>`; }).join('');
            });
        } catch {}

        const overrideRow = data.find(row => row.key === 'content_overrides');
        if (overrideRow) {
            try {
                window.portfolioContentOverrides = typeof overrideRow.value === 'string' ? JSON.parse(overrideRow.value) : (overrideRow.value || {});
                if (typeof window.applyContentOverrides === 'function') window.applyContentOverrides();
            } catch (e) { console.warn('Content overrides inválidos:', e); }
        }
    }

    async function refresh() { await Promise.all([loadProjects(), loadServices(), loadTestimonials(), loadSiteSettings()]); }
    window.portfolioCMS = { refresh, loadProjects, loadServices, loadTestimonials, loadSiteSettings };
    if (db?.channel) {
        try {
            db.channel('wilkyjams-public-cms-live')
              .on('postgres_changes',{event:'*',schema:'public',table:'site_settings'},()=>refresh())
              .on('postgres_changes',{event:'*',schema:'public',table:'projects'},()=>loadProjects())
              .on('postgres_changes',{event:'*',schema:'public',table:'services'},()=>loadServices())
              .on('postgres_changes',{event:'*',schema:'public',table:'testimonials'},()=>loadTestimonials())
              .subscribe();
        } catch {}
    }
    document.addEventListener('DOMContentLoaded', refresh);
    window.addEventListener('jp-language-changed', refresh);
})();
