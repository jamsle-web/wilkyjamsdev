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
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
            host: location.host,
            source: document.referrer ? (() => { try { return new URL(document.referrer).host; } catch { return 'referrer'; } })() : 'direct',
            platform: navigator.platform || '',
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
try { if (!sessionStorage.getItem('jp_session_started')) { sessionStorage.setItem('jp_session_started','1'); trackSiteEvent('session_start'); } } catch {}
window.addEventListener('pagehide',()=>{ try { if(navigator.sendBeacon) { /* page_view data remains server-side; no PII is sent here */ } } catch {} });


/* ----- TRANSICIÓN GLOBAL ENTRE PÁGINAS + ACCESO PRIVADO ----- */
(() => {
    const REDUCED = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const isTyping = target => {
        const el = target?.closest?.('input, textarea, select, [contenteditable="true"]');
        return Boolean(el);
    };

    const ensureTransitionLayer = () => {
        if (document.getElementById('jpPageTransition')) return document.getElementById('jpPageTransition');
        const layer = document.createElement('div');
        layer.id = 'jpPageTransition';
        layer.setAttribute('aria-hidden', 'true');
        layer.innerHTML = '<div class="jp-transition-inner"><span class="jp-transition-mark">JP</span><span class="jp-transition-spinner"></span><span class="jp-transition-text" data-transition-text>Preparando…</span></div>';
        document.body.appendChild(layer);
        return layer;
    };

    const showTransition = (label) => {
        if (REDUCED) return;
        const layer = ensureTransitionLayer();
        const text = layer.querySelector('[data-transition-text]');
        if (text) text.textContent = label || 'Preparando…';
        layer.classList.add('is-visible');
    };

    const navigateWithTransition = (href, label, event) => {
        if (!href || href === '#' || href.startsWith('javascript:')) return false;
        if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('https://wa.me/')) return false;
        let url;
        try {
            url = new URL(href, location.href);
            if (url.origin !== location.origin || url.href === location.href) return false;
        } catch { return false; }
        if (REDUCED) return false;
        event?.preventDefault?.();
        const go = () => { showTransition(label); window.setTimeout(() => { location.href = url.href; }, 70); };
        if (typeof document.startViewTransition === 'function') {
            try {
                document.startViewTransition(() => { location.href = url.href; });
                return true;
            } catch { go(); return true; }
        }
        go();
        return true;
    };

    window.jpPageTransition = { show: showTransition };

    const initServicePlanLinks = () => {
        const number = () => {
            const href = document.querySelector('[data-site-setting="whatsapp"]')?.getAttribute('href') || '';
            return href.match(/wa\.me\/(\d+)/)?.[1] || '18099995904';
        };
        const names = {
            landing: { es:'Landing Page', en:'Landing Page', fr:'Landing Page' },
            full: { es:'Sitio Web Completo', en:'Complete Website', fr:'Site Web Complet' },
            brand: { es:'Marca + Marketing', en:'Brand + Marketing', fr:'Marque + Marketing' }
        };
        document.querySelectorAll('[data-service-plan]').forEach(link => {
            if (link.dataset.jpServiceBound === 'true') return;
            link.dataset.jpServiceBound = 'true';
            link.addEventListener('click', event => {
                const key = link.dataset.servicePlan;
                const language = localStorage.getItem('jp_lang') || document.documentElement.lang || 'es';
                const name = names[key]?.[language] || names[key]?.es || key;
                const messages = {
                    es:`Hola Jamsle, me interesa solicitar el plan "${name}". Me gustaría conocer disponibilidad, plazo y próximos pasos.`,
                    en:`Hi Jamsle, I’m interested in requesting the "${name}" plan. I’d like to know availability, timeline and next steps.`,
                    fr:`Bonjour Jamsle, je souhaite demander le forfait « ${name} ». J’aimerais connaître la disponibilité, le délai et les prochaines étapes.`
                };
                event.preventDefault();
                window.open(`https://wa.me/${number()}?text=${encodeURIComponent(messages[language] || messages.es)}`, '_blank', 'noopener');
            });
        });
    };

    const initNavigation = () => {
        document.querySelectorAll('a[href]').forEach(link => {
            if (link.dataset.jpTransitionBound === 'true') return;
            link.dataset.jpTransitionBound = 'true';
            link.addEventListener('click', event => {
                if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                if (isTyping(event.target) || link.target === '_blank' || link.hasAttribute('download')) return;
                const href = link.getAttribute('href');
                navigateWithTransition(href, link.dataset.transitionLabel || 'Preparando…', event);
            });
        });
    };

    const initOwnerAccess = () => {
        const targets = document.querySelectorAll('[data-jp-owner-access]');
        let pcSequence = '';
        let pcTimer = null;
        let mobilePressTimer = null;
        let mobilePressActive = false;
        let mobileTaps = 0;
        let mobileTapTimer = null;
        let armed = false;

        const openOwnerLogin = () => {
            armed = false;
            clearTimeout(pcTimer); clearTimeout(mobilePressTimer); clearTimeout(mobileTapTimer);
            pcSequence = ''; mobileTaps = 0; mobilePressActive = false;
            showTransition('Preparando acceso…');
            window.setTimeout(() => { location.href = 'admin/login.html'; }, REDUCED ? 0 : 180);
        };

        document.addEventListener('keydown', event => {
            if (isTyping(event.target)) return;
            if (event.key === 'Escape') { pcSequence=''; armed=false; return; }
            if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 'j') {
                event.preventDefault();
                pcSequence = 'J';
                window.clearTimeout(pcTimer);
                pcTimer = window.setTimeout(() => { pcSequence=''; }, 2200);
                return;
            }
            if (pcSequence === 'J' && event.key.toLowerCase() === 'p') {
                event.preventDefault();
                pcSequence = 'JP';
                return;
            }
            if (pcSequence === 'JP' && event.key === 'Enter') {
                event.preventDefault();
                openOwnerLogin();
            }
        });

        targets.forEach(target => {
            target.addEventListener('pointerdown', event => {
                if (event.pointerType === 'mouse') return;
                mobilePressActive = true;
                mobilePressTimer = window.setTimeout(() => {
                    if (!mobilePressActive) return;
                    armed = true;
                    target.classList.add('jp-access-armed');
                    mobileTaps = 0;
                    window.setTimeout(() => target.classList.remove('jp-access-armed'), 1200);
                }, 2000);
            }, { passive: true });
            const endPress = () => { mobilePressActive=false; clearTimeout(mobilePressTimer); };
            target.addEventListener('pointerup', endPress, { passive:true });
            target.addEventListener('pointercancel', endPress, { passive:true });
            target.addEventListener('pointerleave', endPress, { passive:true });
            target.addEventListener('click', event => {
                if (event.detail === 0) return;
                if (!armed) return;
                mobileTaps += 1;
                clearTimeout(mobileTapTimer);
                mobileTapTimer = window.setTimeout(() => { mobileTaps=0; armed=false; }, 850);
                if (mobileTaps >= 3) openOwnerLogin();
            });
        });
    };

    document.addEventListener('DOMContentLoaded', () => {
        ensureTransitionLayer();
        window.requestAnimationFrame(() => document.getElementById('jpPageTransition')?.classList.remove('is-visible'));
        initNavigation();
        initServicePlanLinks();
        initOwnerAccess();
    });
})();

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

    /* Genera el pedido y abre WhatsApp para coordinar el pago y la entrega. */
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
        const language = (localStorage.getItem('jp_lang') || document.documentElement.lang || 'es').slice(0,2);
        const messages = {
            es: ['Hola Jamsle, quiero encargar estos productos digitales:', '', ...lines, '', `Total estimado: $${total.toFixed(2)}`, '', '¿Cómo continuamos con el pago?'].join('\n'),
            en: ['Hi Jamsle, I would like to order these digital products:', '', ...lines, '', `Estimated total: $${total.toFixed(2)}`, '', 'How can we continue with payment?'].join('\n'),
            fr: ['Bonjour Jamsle, je souhaite commander ces produits numériques :', '', ...lines, '', `Total estimé : $${total.toFixed(2)}`, '', 'Comment pouvons-nous poursuivre le paiement ?'].join('\n')
        };
        const message = messages[language] || messages.es;
        const configuredWhatsApp = document.querySelector('[data-site-setting="whatsapp"]')?.href?.match(/wa\.me\/(\d+)/)?.[1] || '18099995904';
        window.open(`https://wa.me/${configuredWhatsApp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    }
};

window.addEventListener('jp-language-changed', () => Cart.renderAll());
