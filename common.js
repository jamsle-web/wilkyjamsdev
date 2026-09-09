/* ==========================================================================
   common.js — Lógica compartida en TODAS las páginas del sitio:
   - Menú hamburguesa
   - Navbar al hacer scroll
   - Persistencia de idioma (usa el objeto `translations` de script.js si existe)
   - Carrito de compras (localStorage) + drawer lateral
   - Acordeón de FAQ
   ========================================================================== */



/* ----- ANALÍTICA PRIVADA: VISITAS Y EVENTOS -----
   No recopila IP ni datos personales. Usa un identificador de sesión
   generado localmente y registra una visita por página cada 30 minutos. */
async function trackSiteEvent(eventType, metadata = {}) {
    const db = window.portfolioSupabase;
    if (!db) return;
    try {
        const storageKey = 'jp_site_session_id';
        let sessionId = sessionStorage.getItem(storageKey);
        if (!sessionId) {
            sessionId = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
            sessionStorage.setItem(storageKey, sessionId);
        }

        const page = `${location.pathname || '/'}${location.hash || ''}`.slice(0, 500);
        const dedupeKey = `jp_event_${eventType}_${location.pathname}`;
        const now = Date.now();
        const previous = Number(sessionStorage.getItem(dedupeKey) || 0);
        if (eventType === 'page_view' && now - previous < 30 * 60 * 1000) return;
        sessionStorage.setItem(dedupeKey, String(now));

        const safeMetadata = {
            language: document.documentElement.lang || 'es',
            referrer: document.referrer ? document.referrer.slice(0, 500) : null,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            ...metadata
        };

        const { error } = await db.from('site_events').insert({
            event_type: String(eventType).slice(0, 80),
            page,
            session_id: sessionId,
            user_agent: navigator.userAgent.slice(0, 500),
            metadata: safeMetadata
        });
        if (error) console.debug('Analytics event not recorded:', error.message);
    } catch (error) {
        console.debug('Analytics unavailable:', error?.message || error);
    }
}

window.trackSiteEvent = trackSiteEvent;

document.addEventListener('DOMContentLoaded', () => {
    trackSiteEvent('page_view');

    /* ----- MENÚ HAMBURGUESA ----- */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    /* ----- NAVBAR AL HACER SCROLL ----- */
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                nav.style.background = 'rgba(11, 13, 21, 0.95)';
                nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
            } else {
                nav.style.background = 'rgba(11, 13, 21, 0.75)';
                nav.style.boxShadow = 'none';
            }
        });
    }

    /* ----- IDIOMA PERSISTENTE ENTRE PÁGINAS -----
       Si script.js (con el objeto `translations`) está cargado en esta página,
       aplicamos el último idioma elegido por el usuario. Si no, solo dejamos
       los botones visuales sin romper nada. */
    const savedLang = localStorage.getItem('jp_lang') || 'es';
    document.querySelectorAll('.lang-selector button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === savedLang);
        btn.addEventListener('click', function () {
            localStorage.setItem('jp_lang', this.dataset.lang);
            if (typeof setLanguage === 'function') {
                setLanguage(this.dataset.lang);
            } else {
                document.querySelectorAll('.lang-selector button').forEach(b => {
                    b.classList.toggle('active', b === this);
                });
            }
        });
    });
    if (typeof setLanguage === 'function') {
        setLanguage(savedLang);
    }

    /* ----- FAQ ACORDEÓN ----- */
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.closest('.faq-item');
            const answer = item.querySelector('.faq-answer');
            const isOpen = item.classList.contains('open');

            document.querySelectorAll('.faq-item.open').forEach(openItem => {
                openItem.classList.remove('open');
                openItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    /* ----- CARRITO: RENDER INICIAL ----- */
    Cart.renderAll();
});

/* Botón de carrito en el nav: si el drawer existe en esta página, lo abre;
   si no, lleva a la tienda (el carrito persiste entre páginas). */
function handleCartClick() {
    const drawer = document.getElementById('cartDrawer');
    if (drawer) {
        Cart.openDrawer();
    } else {
        window.location.href = 'tienda.html';
    }
}

/* ==========================================================================
   CARRITO DE COMPRAS
   Guardado en localStorage bajo la clave "jp_cart".
   Estructura: [{ id, name, price, image, category, qty }]
   ========================================================================== */
const Cart = {
    KEY: 'jp_cart',

    get() {
        try {
            return JSON.parse(localStorage.getItem(this.KEY)) || [];
        } catch (e) {
            return [];
        }
    },

    save(items) {
        localStorage.setItem(this.KEY, JSON.stringify(items));
        this.renderAll();
    },

    add(product) {
        const items = this.get();
        const existing = items.find(i => i.id === product.id);
        if (existing) {
            existing.qty += 1;
        } else {
            items.push({ ...product, qty: 1 });
        }
        this.save(items);
        this.openDrawer();
    },

    updateQty(id, delta) {
        let items = this.get();
        const item = items.find(i => i.id === id);
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) {
            items = items.filter(i => i.id !== id);
        }
        this.save(items);
    },

    remove(id) {
        const items = this.get().filter(i => i.id !== id);
        this.save(items);
    },

    clear() {
        this.save([]);
    },

    total() {
        return this.get().reduce((sum, i) => sum + i.price * i.qty, 0);
    },

    count() {
        return this.get().reduce((sum, i) => sum + i.qty, 0);
    },

    openDrawer() {
        const drawer = document.getElementById('cartDrawer');
        const overlay = document.getElementById('cartOverlay');
        if (drawer && overlay) {
            drawer.classList.add('open');
            overlay.classList.add('open');
        }
    },

    closeDrawer() {
        const drawer = document.getElementById('cartDrawer');
        const overlay = document.getElementById('cartOverlay');
        if (drawer && overlay) {
            drawer.classList.remove('open');
            overlay.classList.remove('open');
        }
    },

    renderAll() {
        document.querySelectorAll('.cart-count').forEach(el => {
            const count = this.count();
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });

        const itemsWrap = document.getElementById('cartItemsWrap');
        const totalEl = document.getElementById('cartTotalValue');
        if (!itemsWrap) return;

        const escape = value => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
        const safeImage = value => {
            try { const u = new URL(String(value || ''), location.href); return ['http:','https:'].includes(u.protocol) ? u.href : ''; }
            catch { return ''; }
        };
        const t = (key, fallback) => typeof jpT === 'function' ? jpT(key, fallback) : fallback;
        const items = this.get().filter(item => item && item.id != null && Number.isFinite(Number(item.price)) && Number(item.qty) > 0);

        if (items.length === 0) {
            itemsWrap.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>${escape(t('cart.empty','Tu carrito está vacío.'))}<br>${escape(t('cart.empty_hint','Explora la tienda y agrega tus productos favoritos.'))}</p>
                </div>`;
        } else {
            itemsWrap.innerHTML = items.map(item => {
                const id = String(item.id);
                const image = safeImage(item.image);
                const name = String(item.name || 'Producto').slice(0, 200);
                const price = Number(item.price) || 0;
                const qty = Math.max(1, Number(item.qty) || 1);
                return `
                <div class="cart-line">
                    ${image ? `<img src="${escape(image)}" alt="${escape(name)}" loading="lazy" />` : ''}
                    <div class="cart-line-info">
                        <h4>${escape(name)}</h4>
                        <span>$${price.toFixed(2)} x ${qty}</span>
                        <div class="qty-controls">
                            <button type="button" class="cart-qty-btn" data-id="${escape(id)}" data-delta="-1" aria-label="${escape(typeof jpT === 'function' ? jpT('cart.decrease', 'Decrease quantity') : 'Decrease quantity')}"><i class="fas fa-minus"></i></button>
                            <span>${qty}</span>
                            <button type="button" class="cart-qty-btn" data-id="${escape(id)}" data-delta="1" aria-label="${escape(typeof jpT === 'function' ? jpT('cart.increase', 'Increase quantity') : 'Increase quantity')}"><i class="fas fa-plus"></i></button>
                        </div>
                    </div>
                    <button type="button" class="remove-line cart-remove-btn" data-id="${escape(id)}" aria-label="${escape(t('cart.item_remove','Eliminar'))}"><i class="fas fa-trash"></i></button>
                </div>`;
            }).join('');

            itemsWrap.querySelectorAll('.cart-qty-btn').forEach(btn => btn.addEventListener('click', () => this.updateQty(btn.dataset.id, Number(btn.dataset.delta))));
            itemsWrap.querySelectorAll('.cart-remove-btn').forEach(btn => btn.addEventListener('click', () => this.remove(btn.dataset.id)));
        }

        if (totalEl) totalEl.textContent = '$' + this.total().toFixed(2);
    },

    /* Genera un mensaje de pedido y abre WhatsApp — mientras se conecta
       una pasarela de pago real, este es el
       "checkout" funcional del sitio. */
    async checkoutViaWhatsApp() {
        const items = this.get();
        if (items.length === 0) return;

        const total = this.total();
        const orderItems = items.map(item => ({
            id: String(item.id),
            name: String(item.name).slice(0, 200),
            price: Number(item.price) || 0,
            qty: Math.max(1, Number(item.qty) || 1),
            image: String(item.image || '').slice(0, 1000)
        }));

        if (window.portfolioSupabase) {
            const { error } = await window.portfolioSupabase.from('orders').insert({
                items: orderItems, total, currency: 'USD', status: 'pending',
                notes: 'Checkout iniciado por WhatsApp.'
            });
            if (error) console.warn('No se pudo registrar el pedido:', error.message);
        }

        const lines = orderItems.map(item => `• ${item.name} (x${item.qty}) — $${(item.price * item.qty).toFixed(2)}`);
        const message = [
            'Hola Jamsle, quiero encargar estos productos digitales:', '', ...lines, '',
            `Total estimado: $${total.toFixed(2)}`, '', '¿Cómo continuamos con el pago?'
        ].join('\n');
        const configuredWhatsApp = document.querySelector('[data-site-setting="whatsapp"]')?.href?.match(/wa\.me\/(\d+)/)?.[1] || '18099995904';
        window.open(`https://wa.me/${configuredWhatsApp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    }
};

window.addEventListener('jp-language-changed', () => Cart.renderAll());


// ===== Admin owner access: hidden gesture + keyboard shortcut =====
// The public site does not expose an Admin link. The owner can open the
// Supabase login by clicking/tapping the JP monogram three times quickly.
(function initOwnerAccess() {
    const ADMIN_LOGIN = '/admin/login.html';
    const HOME = '/';
    const TAP_WINDOW = 850;
    let tapCount = 0;
    let tapTimer = null;

    function openAdminLogin(event) {
        if (event) event.preventDefault();
        window.location.assign(ADMIN_LOGIN);
    }

    function handleMonogramActivation(event) {
        // Keep the normal logo behavior on a single click/tap.
        tapCount += 1;
        clearTimeout(tapTimer);

        if (tapCount >= 3) {
            tapCount = 0;
            openAdminLogin(event);
            return;
        }

        tapTimer = setTimeout(() => {
            tapCount = 0;
        }, TAP_WINDOW);
    }

    function bindMonograms() {
        document.querySelectorAll('.logo').forEach((logo) => {
            if (logo.dataset.ownerAccessBound === 'true') return;
            logo.dataset.ownerAccessBound = 'true';
            logo.setAttribute('title', 'JP');
            logo.setAttribute('aria-label', 'Inicio');
            logo.addEventListener('click', handleMonogramActivation, true);
        });
    }

    function handleOwnerShortcut(event) {
        // Ctrl+J is intentionally supported for desktop. Some browsers reserve
        // this shortcut at the browser level, so Alt+Shift+J is also supported.
        const ctrlJ = event.ctrlKey && !event.altKey && !event.shiftKey && event.key.toLowerCase() === 'j';
        const fallback = event.altKey && event.shiftKey && event.key.toLowerCase() === 'j';
        if (!ctrlJ && !fallback) return;

        const target = event.target;
        const typing = target && (target.matches?.('input, textarea, select, [contenteditable="true"]'));
        if (typing) return;

        event.preventDefault();
        if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.location.assign(HOME);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindMonograms, { once: true });
    } else {
        bindMonograms();
    }
    document.addEventListener('keydown', handleOwnerShortcut);
})();

