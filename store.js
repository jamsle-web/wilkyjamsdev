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
        description: 'E-commerce simple con catálogo de productos, carrito y pasarela de pago integrada.'
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

function renderProducts(filter = 'all') {
    const grid = document.getElementById('storeGrid');
    if (!grid) return;

    const catalog = window.PRODUCTS || PRODUCTS_FALLBACK;
    const filtered = filter === 'all' ? catalog : catalog.filter(p => p.category === filter);

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
                    <button class="btn-add-cart" data-id="${escapeHTML(p.id)}">
                        <i class="fas fa-plus"></i> ${escapeHTML(storeText('store.add','Agregar'))}
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');

    if (typeof AOS !== 'undefined') AOS.refresh();

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
    if (!window.portfolioSupabase) { window.PRODUCTS = PRODUCTS_FALLBACK; return; }
    const { data, error } = await portfolioSupabase.from('products').select('*').eq('active', true).order('sort_order').order('created_at', { ascending: false });
    if (error || !data?.length) { window.PRODUCTS = PRODUCTS_FALLBACK; return; }
    window.PRODUCTS = data.map(p => ({
        id: p.id, name_es: p.name_es || '', name_en: p.name_en || '', name_fr: p.name_fr || '',
        description_es: p.description_es || '', description_en: p.description_en || '', description_fr: p.description_fr || '',
        category: p.category || 'all', categoryLabel: p.category || 'all',
        price: Number(p.price || 0), oldPrice: p.old_price ? Number(p.old_price) : null, image: p.image_url || ''
    }));
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadStoreProducts();
    renderProducts('all');
    document.querySelectorAll('#filterTabs button').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('#filterTabs button').forEach(b => b.classList.remove('active'));
            tab.classList.add('active');
            renderProducts(tab.dataset.filter);
        });
    });
});

window.addEventListener('jp-language-changed', () => { renderProducts(document.querySelector('#filterTabs button.active')?.dataset.filter || 'all'); });
