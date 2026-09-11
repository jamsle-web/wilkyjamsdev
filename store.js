/* ==========================================================================
   store.js — Catálogo de productos digitales (datos de ejemplo).
   Cuando conectes un backend real, esta lista se reemplaza por una
   petición a tu API/base de datos (ver panel admin -> Productos).
   ========================================================================== */

const PRODUCTS_FALLBACK = [
    {
        id: 'logo-01',
        name: 'Logo Profesional Minimalista',
        category: 'logos',
        categoryLabel: 'Logos',
        price: 45,
        oldPrice: 65,
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=80',
        description: 'Diseño de logotipo único con 3 propuestas iniciales, revisiones y archivos en alta resolución (PNG, SVG, PDF).'
    },
    {
        id: 'logo-02',
        name: 'Logo + Manual de Marca',
        category: 'logos',
        categoryLabel: 'Logos',
        price: 90,
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=80',
        description: 'Logotipo completo acompañado de un mini manual de marca: colores, tipografías y usos correctos.'
    },
    {
        id: 'web-01',
        name: 'Sitio Web Corporativo (5 páginas)',
        category: 'web',
        categoryLabel: 'Sitios Web',
        price: 450,
        image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&q=80',
        description: 'Sitio multi-página responsive: Inicio, Sobre, Servicios, Portafolio y Contacto. SEO on-page incluido.'
    },
    {
        id: 'web-02',
        name: 'Tienda Online Básica',
        category: 'web',
        categoryLabel: 'Sitios Web',
        price: 650,
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500&q=80',
        description: 'E-commerce simple con catálogo, carrito y solicitud de pedido por WhatsApp.'
    },
    {
        id: 'landing-01',
        name: 'Landing Page de Alta Conversión',
        category: 'landing',
        categoryLabel: 'Landing Pages',
        price: 180,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
        description: 'Página única enfocada en conversión: hero impactante, beneficios, testimonios y llamado a la acción.'
    },
    {
        id: 'landing-02',
        name: 'Landing Page para Evento',
        category: 'landing',
        categoryLabel: 'Landing Pages',
        price: 140,
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80',
        description: 'Ideal para webinars, lanzamientos o eventos con countdown, registro y confirmación automática.'
    },
    {
        id: 'app-01',
        name: 'Prototipo de App Móvil (UI/UX)',
        category: 'apps',
        categoryLabel: 'Apps',
        price: 320,
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80',
        description: 'Diseño de interfaz completo en Figma para tu app: flujos de usuario, pantallas y prototipo interactivo.'
    },
    {
        id: 'app-02',
        name: 'App Educativa con IA (Concepto)',
        category: 'apps',
        categoryLabel: 'Apps',
        price: 380,
        image: 'https://images.unsplash.com/photo-1584697964358-3e14ca57658b?w=500&q=80',
        description: 'Arquitectura de información y diseño UI/UX para apps educativas potenciadas por inteligencia artificial.'
    },
    {
        id: 'flyer-01',
        name: 'Flyer Digital Promocional',
        category: 'flyers',
        categoryLabel: 'Flyers',
        price: 25,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80',
        description: 'Diseño de flyer para redes sociales o impresión, con tu contenido y branding.'
    },
    {
        id: 'flyer-02',
        name: 'Pack de 5 Flyers para Redes',
        category: 'flyers',
        categoryLabel: 'Flyers',
        price: 95,
        oldPrice: 125,
        image: 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?w=500&q=80',
        description: 'Cinco diseños coordinados para tu calendario de contenido, listos para publicar en Instagram y Facebook.'
    },
    {
        id: 'card-01',
        name: 'Tarjeta de Presentación Digital',
        category: 'business-cards',
        categoryLabel: 'Business Cards',
        price: 20,
        image: 'https://images.unsplash.com/photo-1589041127690-c3ba9a30a1a5?w=500&q=80',
        description: 'Diseño de business card profesional, formato digital e impresión, frente y reverso.'
    },
    {
        id: 'card-02',
        name: 'Tarjeta Digital Interactiva (vCard)',
        category: 'business-cards',
        categoryLabel: 'Business Cards',
        price: 55,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80',
        description: 'Tarjeta de presentación digital compartible por link o QR, con tus redes y datos de contacto.'
    },
    {
        id: 'foto-01',
        name: 'Sesión de Fotos para Producto',
        category: 'fotos',
        categoryLabel: 'Fotografía',
        price: 120,
        image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&q=80',
        description: 'Sesión fotográfica de producto con edición profesional, ideal para catálogos y redes sociales.'
    },
    {
        id: 'foto-02',
        name: 'Edición y Retoque de Fotos (Pack 10)',
        category: 'fotos',
        categoryLabel: 'Fotografía',
        price: 60,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
        description: 'Retoque profesional de hasta 10 fotografías: color, luz, fondo y ajustes de composición.'
    }
];

// Metadatos de respaldo para fichas de producto.
PRODUCTS_FALLBACK.forEach(product => {
    if (product.details) return;
    product.details = {
        es: { includes: 'Entrega digital y coordinación por WhatsApp', time: 'Según alcance', format: 'Digital', revisions: 'Según producto', availability: 'Bajo solicitud' },
        en: { includes: 'Digital delivery and coordination via WhatsApp', time: 'According to scope', format: 'Digital', revisions: 'According to product', availability: 'On request' },
        fr: { includes: 'Livraison numérique et coordination via WhatsApp', time: 'Selon le périmètre', format: 'Numérique', revisions: 'Selon le produit', availability: 'Sur demande' }
    };
});

function storeLang() {
    return (typeof currentLang !== 'undefined' && ['es','en','fr'].includes(currentLang))
        ? currentLang
        : (localStorage.getItem('jp_lang') || 'es');
}

function storeText(key, fallback) {
    return typeof jpT === 'function' ? jpT(key, fallback) : fallback;
}

function categoryLabel(category) {
    const keys = {
        all: 'store.all', logos: 'store.logos', web: 'store.web', landing: 'store.landing',
        apps: 'store.apps', flyers: 'store.flyers', 'business-cards': 'store.business_cards', fotos: 'store.photo'
    };
    return storeText(keys[category] || '', category);
}

function localizedProduct(p) {
    const lang = storeLang();
    return {
        ...p,
        name: p[`name_${lang}`] || p.name_es || p.name_en || p.name_fr || p.name || 'Producto',
        description: p[`description_${lang}`] || p.description_es || p.description_en || p.description_fr || p.description || '',
        categoryLabel: categoryLabel(p.category)
    };
}

function productDetailText(p, key) {
    const lang = storeLang(); const d = p.details?.[lang] || p.details?.es || {};
    const labels = {
        es:{includes:'Incluye',time:'Tiempo estimado',format:'Formato',revisions:'Revisiones',availability:'Disponibilidad'},
        en:{includes:'Includes',time:'Estimated time',format:'Format',revisions:'Revisions',availability:'Availability'},
        fr:{includes:'Comprend',time:'Délai estimé',format:'Format',revisions:'Révisions',availability:'Disponibilité'}
    };
    return d[key] || '';
}
function openProductDetails(productId) {
    const raw = (window.PRODUCTS || PRODUCTS_FALLBACK).find(p => String(p.id) === String(productId));
    if (!raw) return;
    const p = localizedProduct(raw);
    document.getElementById('storeProductDetail')?.remove();
    const lang = storeLang();
    const labels = { es:{details:'Detalles del producto',add:'Agregar al carrito',close:'Cerrar',includes:'Incluye',time:'Tiempo estimado',format:'Formato',revisions:'Revisiones',availability:'Disponibilidad'}, en:{details:'Product details',add:'Add to cart',close:'Close',includes:'Includes',time:'Estimated time',format:'Format',revisions:'Revisions',availability:'Availability'}, fr:{details:'Détails du produit',add:'Ajouter au panier',close:'Fermer',includes:'Comprend',time:'Délai estimé',format:'Format',revisions:'Révisions',availability:'Disponibilité'} }[lang] || {details:'Product details',add:'Add to cart',close:'Close',includes:'Includes',time:'Estimated time',format:'Format',revisions:'Revisions',availability:'Availability'};
    const modal = document.createElement('div'); modal.id='storeProductDetail'; modal.className='store-detail-modal';
    const safeImage = escapeHTML(p.image || '');
    const rows = [['includes','includes'],['time','time'],['format','format'],['revisions','revisions'],['availability','availability']].map(([key,prop])=>productDetailText(raw,prop)?`<div class="store-detail-row"><strong>${labels[key]}</strong><span>${escapeHTML(productDetailText(raw,prop))}</span></div>`:'').join('');
    modal.innerHTML=`<div class="store-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="storeDetailTitle"><button type="button" class="store-detail-close" aria-label="${labels.close}"><i class="fas fa-xmark"></i></button><div class="store-detail-media">${safeImage?`<img src="${safeImage}" alt="${escapeHTML(p.name)}">`:''}</div><div class="store-detail-content"><span class="store-cat">${escapeHTML(p.categoryLabel)}</span><h2 id="storeDetailTitle">${escapeHTML(p.name)}</h2><p>${escapeHTML(p.description)}</p>${rows?`<div class="store-detail-meta">${rows}</div>`:''}<div class="store-detail-bottom"><strong>$${Number(p.price||0).toFixed(2)}</strong><button type="button" class="btn-add-cart" id="storeDetailAdd"><i class="fas fa-plus"></i> ${labels.add}</button></div></div></div>`;
    document.body.appendChild(modal); requestAnimationFrame(()=>modal.classList.add('is-visible'));
    const close=()=>{modal.classList.remove('is-visible');setTimeout(()=>modal.remove(),160)};
    modal.querySelector('.store-detail-close').onclick=close; modal.addEventListener('click',e=>{if(e.target===modal)close()});
    modal.querySelector('#storeDetailAdd').onclick=()=>{Cart.add({id:raw.id,name:p.name,price:Number(raw.price||0),image:raw.image,category:raw.category});close()};
    document.addEventListener('keydown',function onKey(e){if(e.key==='Escape'){close();document.removeEventListener('keydown',onKey)}});
}

let currentStoreFilter = 'all';
let currentStoreSearch = '';
function renderProducts(filter = 'all', search = currentStoreSearch) {
    const grid = document.getElementById('storeGrid');
    if (!grid) return;

    const catalog = window.PRODUCTS || PRODUCTS_FALLBACK;
    currentStoreFilter = filter; currentStoreSearch = String(search || '');
    const needle = currentStoreSearch.trim().toLowerCase();
    const filtered = catalog.filter(p => (filter === 'all' || p.category === filter) && (!needle || String(p.name_es||p.name||'').toLowerCase().includes(needle) || String(p.name_en||'').toLowerCase().includes(needle) || String(p.name_fr||'').toLowerCase().includes(needle) || String(p.description_es||p.description||'').toLowerCase().includes(needle)));

    grid.innerHTML = filtered.map(raw => {
        const p = localizedProduct(raw);
        return `
        <div class="store-card" data-aos="fade-up">
            <div class="store-thumb">
                <span class="store-cat">${escapeHTML(p.categoryLabel)}</span>
                <img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy" />
            </div>
            <div class="store-body">
                <h3>${escapeHTML(p.name)}</h3>
                <p>${escapeHTML(p.description)}</p>
                <div class="store-footer">
                    <div class="store-price">
                        ${p.oldPrice ? `<span>$${p.oldPrice.toFixed(2)}</span>` : ''}
                        $${p.price.toFixed(2)}
                    </div>
                    <div class="store-card-actions"><button type="button" class="btn-details" data-id="${escapeHTML(p.id)}">${escapeHTML(storeText('store.details','Ver detalles'))}</button><button class="btn-add-cart" data-id="${escapeHTML(p.id)}">
                        <i class="fas fa-plus"></i> ${escapeHTML(storeText('store.add','Agregar'))}
                    </button></div>
                </div>
            </div>
        </div>`;
    }).join('');

    if (typeof AOS !== 'undefined') AOS.refresh();

    grid.querySelectorAll('.btn-details').forEach(btn => btn.addEventListener('click', () => openProductDetails(btn.dataset.id)));

    grid.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = (window.PRODUCTS || PRODUCTS_FALLBACK).find(p => p.id === btn.dataset.id);
            if (!product) return;
            const localized = localizedProduct(product);
            Cart.add({
                id: product.id,
                name: localized.name,
                price: product.price,
                image: product.image,
                category: product.category
            });
            btn.classList.add('added');
            btn.innerHTML = '<i class="fas fa-check"></i> ' + escapeHTML(storeText('store.added','Agregado'));
            setTimeout(() => {
                btn.classList.remove('added');
                btn.innerHTML = '<i class="fas fa-plus"></i> ' + escapeHTML(storeText('store.add','Agregar'));
            }, 1400);
        });
    });
}

function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;',"\"":'&quot;'}[char]));
}

async function loadStoreProducts() {
    try { const cached=JSON.parse(localStorage.getItem('wilkyjams_v145_products')||'null'); if(Array.isArray(cached)&&cached.length) window.PRODUCTS=cached; } catch {}
    if (!window.portfolioSupabase) { window.PRODUCTS = window.PRODUCTS?.length ? window.PRODUCTS : PRODUCTS_FALLBACK; return; }
    const { data, error } = await portfolioSupabase.from('products').select('*').eq('active', true).order('sort_order').order('created_at', { ascending: false });
    if (error || !data?.length) { window.PRODUCTS = window.PRODUCTS?.length ? window.PRODUCTS : PRODUCTS_FALLBACK; return; }
    window.PRODUCTS = data.map(p => ({
        id: p.id, name_es: p.name_es || '', name_en: p.name_en || '', name_fr: p.name_fr || '',
        description_es: p.description_es || '', description_en: p.description_en || '', description_fr: p.description_fr || '',
        category: p.category || 'all', categoryLabel: p.category || 'all', details: p.details || {},
        price: Number(p.price || 0), oldPrice: p.old_price ? Number(p.old_price) : null, image: p.image_url || ''
    }));
    try { localStorage.setItem('wilkyjams_v145_products', JSON.stringify(window.PRODUCTS)); } catch {}
}

if (window.portfolioSupabase?.channel) { try { window.portfolioSupabase.channel('wilkyjams-public-products-live').on('postgres_changes',{event:'*',schema:'public',table:'products'},async()=>{await loadStoreProducts();renderProducts(currentStoreFilter,document.getElementById('storeSearch')?.value||'');}).subscribe(); } catch {} }

document.addEventListener('DOMContentLoaded', async () => {
    await loadStoreProducts();
    renderProducts('all');
    document.getElementById('storeSearch')?.addEventListener('input', e => renderProducts(currentStoreFilter, e.target.value));
    document.querySelectorAll('#filterTabs button').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('#filterTabs button').forEach(b => b.classList.remove('active'));
            tab.classList.add('active');
            renderProducts(tab.dataset.filter, document.getElementById('storeSearch')?.value || '');
        });
    });
});

window.addEventListener('jp-language-changed', () => { renderProducts(currentStoreFilter, document.getElementById('storeSearch')?.value || currentStoreSearch); });
window.openProductDetails = openProductDetails;
