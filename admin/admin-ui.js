/* ============================================================
   WILKYJAMS DEV ADMIN — UI / UX CONTROLLER
   Dashboard reference inspired, project-specific implementation.
   No public-site logic is touched here.
   ============================================================ */
(() => {
    'use strict';

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
    const storageKey = 'wilkyjams_admin_theme';

    function safeStorageGet(key) {
        try { return localStorage.getItem(key); } catch { return null; }
    }
    function safeStorageSet(key, value) {
        try { localStorage.setItem(key, value); } catch {}
    }

    function setTheme(theme) {
        const light = theme === 'light';
        document.body.classList.toggle('admin-light', light);
        const button = $('#adminThemeToggle');
        if (button) {
            button.innerHTML = `<i class="fas fa-${light ? 'sun' : 'moon'}"></i>`;
            button.setAttribute('aria-label', light ? 'Activar modo oscuro' : 'Activar modo claro');
            button.title = light ? 'Activar modo oscuro' : 'Activar modo claro';
        }
        safeStorageSet(storageKey, light ? 'light' : 'dark');
    }

    function initTheme() {
        const saved = safeStorageGet(storageKey);
        setTheme(saved === 'light' ? 'light' : 'dark');
        $('#adminThemeToggle')?.addEventListener('click', () => {
            setTheme(document.body.classList.contains('admin-light') ? 'dark' : 'light');
        });
    }

    function closePopovers(except = null) {
        $$('.admin-popover').forEach(menu => {
            if (menu !== except) menu.hidden = true;
        });
        $$('.admin-popover-wrap > button').forEach(btn => {
            if (!except || !btn.parentElement.contains(except)) btn.setAttribute('aria-expanded', 'false');
        });
    }

    function togglePopover(button, menu) {
        if (!button || !menu) return;
        const shouldOpen = menu.hidden;
        closePopovers(shouldOpen ? menu : null);
        menu.hidden = !shouldOpen;
        button.setAttribute('aria-expanded', String(shouldOpen));
    }

    function initPopovers() {
        const notificationButton = $('#adminNotificationsBtn');
        const notificationMenu = $('#adminNotificationMenu');
        const profileButton = $('#adminProfileBtn');
        const profileMenu = $('#adminProfileMenu');

        notificationButton?.addEventListener('click', event => {
            event.stopPropagation();
            togglePopover(notificationButton, notificationMenu);
        });
        profileButton?.addEventListener('click', event => {
            event.stopPropagation();
            togglePopover(profileButton, profileMenu);
        });
        notificationMenu?.addEventListener('click', event => event.stopPropagation());
        profileMenu?.addEventListener('click', event => event.stopPropagation());
        $('#adminProfileOpenEditor')?.addEventListener('click', () => {
            closePopovers();
            window.setAdminSection?.('panelPerfilAdmin');
        });
        document.addEventListener('click', () => closePopovers());

        $('#adminProfileLogout')?.addEventListener('click', async () => {
            if (typeof window.logoutAdmin === 'function') return window.logoutAdmin();
            if (window.portfolioSupabase?.auth) {
                await window.portfolioSupabase.auth.signOut();
                location.replace('login.html');
            }
        });
        $('#markNotificationsRead')?.addEventListener('click', () => {
            unreadNotificationCount = 0;
            safeStorageSet('wilkyjams_admin_notifications_seen', String(Date.now()));
            liveNotificationItems = [];
            renderNotifications();
        });
    }


    function jpConfirm(message, options = {}) {
        return new Promise(resolve => {
            const existing = document.getElementById('jpConfirmModal'); existing?.remove();
            const modal = document.createElement('div');
            modal.id = 'jpConfirmModal'; modal.className = 'jp-confirm-modal';
            const title = options.title || 'Confirmar acción';
            const confirmText = options.confirmText || 'Confirmar';
            const cancelText = options.cancelText || 'Cancelar';
            modal.innerHTML = `<div class="jp-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="jpConfirmTitle"><button class="jp-confirm-close" type="button" aria-label="Cerrar"><i class="fas fa-xmark"></i></button><div class="jp-confirm-icon"><i class="fas fa-circle-question"></i></div><h3 id="jpConfirmTitle">${String(title).replace(/[&<>]/g,'')}</h3><p>${String(message).replace(/[&<>]/g,'')}</p><div class="jp-confirm-actions"><button type="button" class="cms-btn cms-btn-secondary" data-cancel>${cancelText}</button><button type="button" class="cms-btn cms-btn-primary" data-confirm>${confirmText}</button></div></div>`;
            document.body.appendChild(modal);
            let settled = false;
            const finish = value => { if (settled) return; settled=true; modal.classList.remove('is-visible'); window.setTimeout(()=>modal.remove(),180); resolve(value); };
            modal.querySelector('[data-cancel]').onclick=()=>finish(false);
            modal.querySelector('[data-confirm]').onclick=()=>finish(true);
            modal.querySelector('.jp-confirm-close').onclick=()=>finish(false);
            modal.addEventListener('click',e=>{if(e.target===modal)finish(false)});
            document.addEventListener('keydown', function onKey(e){ if(!document.body.contains(modal)) { document.removeEventListener('keydown',onKey); return; } if(e.key==='Escape') { e.preventDefault(); finish(false); document.removeEventListener('keydown',onKey); } if(e.key==='Enter' && document.activeElement?.closest('.jp-confirm-dialog')) { e.preventDefault(); finish(true); document.removeEventListener('keydown',onKey); } });
            requestAnimationFrame(()=>modal.classList.add('is-visible'));
            modal.querySelector('[data-cancel]')?.focus();
        });
    }
    window.jpConfirm = jpConfirm;

    function adminSearchNotice(message, type = 'info') {
        if (typeof window.jpNotify === 'function') {
            window.jpNotify(message, type);
        }
    }

    function initGlobalSearch() {
        const input = $('#adminGlobalSearch');
        if (!input || input.dataset.initialized === 'true') return;
        input.dataset.initialized = 'true';

        const getText = element => (element?.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();

        const clearSearch = () => {
            input.value = '';
            $$('.admin-table tbody tr').forEach(row => { row.hidden = false; });
            $$('.admin-panel').forEach(panel => panel.classList.remove('search-match', 'search-focus'));
        };

        const filterResults = query => {
            const normalized = String(query || '').trim().toLowerCase();
            const rows = $$('.admin-table tbody tr');
            const panels = $$('.admin-panel');
            let rowMatches = 0;
            let panelMatches = 0;

            rows.forEach(row => {
                const match = !normalized || getText(row).includes(normalized);
                row.hidden = !match;
                if (match && normalized) rowMatches += 1;
            });

            panels.forEach(panel => {
                const panelText = getText(panel);
                const hasVisibleRow = $$('.admin-table tbody tr', panel).some(row => !row.hidden && getText(row).includes(normalized));
                const match = !normalized || panelText.includes(normalized) || hasVisibleRow;
                panel.classList.toggle('search-match', Boolean(normalized && match));
                if (normalized && match) panelMatches += 1;
            });

            return { normalized, rowMatches, panelMatches };
        };

        const executeSearch = () => {
            const { normalized } = filterResults(input.value);
            if (!normalized) {
                adminSearchNotice('Escribe algo para buscar en el panel.', 'info');
                input.focus();
                return;
            }

            const panels = $$('.admin-panel');
            const rows = $$('.admin-table tbody tr');
            const matchedRow = rows.find(row => !row.hidden && getText(row).includes(normalized));
            const matchedPanel = matchedRow?.closest('.admin-panel') || panels.find(panel => getText(panel).includes(normalized));

            if (!matchedPanel) {
                adminSearchNotice(`No se encontraron resultados para “${input.value.trim()}”.`, 'info');
                return;
            }

            panels.forEach(panel => panel.classList.remove('search-focus'));
            matchedPanel.classList.add('search-focus');
            matchedPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.setTimeout(() => matchedPanel.classList.remove('search-focus'), 1600);

            const title = matchedPanel.querySelector('.panel-title h3, h3, h2')?.textContent?.trim() || 'el panel';
            adminSearchNotice(`Resultado encontrado en ${title}.`, 'success');
        };

        input.addEventListener('input', () => filterResults(input.value));
        input.addEventListener('search', () => filterResults(input.value));
        input.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.keyCode === 13) {
                event.preventDefault();
                event.stopPropagation();
                executeSearch();
            } else if (event.key === 'Escape' || event.keyCode === 27) {
                event.preventDefault();
                clearSearch();
                input.blur();
            }
        });

        document.addEventListener('keydown', event => {
            const isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';
            if (!isShortcut) return;
            event.preventDefault();
            input.focus();
            input.select();
        });

        window.executeAdminSearch = executeSearch;
        window.clearAdminSearch = clearSearch;
    }

    function initSidebarCollapse() {
        const layout = $('.admin-layout');
        const sidebar = $('#adminSidebar');
        const button = $('#adminDesktopMenu');
        if (!layout || !sidebar || !button) return;

        const key = 'wilkyjams_admin_sidebar_collapsed';
        const apply = collapsed => {
            layout.classList.toggle('admin-sidebar-collapsed', collapsed);
            button.setAttribute('aria-pressed', String(collapsed));
            button.title = collapsed ? 'Expandir navegación' : 'Contraer navegación';
        };
        apply(safeStorageGet(key) === '1');
        button.addEventListener('click', () => {
            const collapsed = !layout.classList.contains('admin-sidebar-collapsed');
            apply(collapsed);
            safeStorageSet(key, collapsed ? '1' : '0');
        });
    }

    const adminSections = {
        summary: { title: 'Resumen general', target: null },
        panelAnalitica: { title: 'Analítica', target: 'panelAnalitica' },
        panelProductos: { title: 'Productos', target: 'panelProductos' },
        panelContenido: { title: 'Contenido', target: 'panelContenido' },
        panelConfiguracion: { title: 'Configuración', target: 'panelConfiguracion' },
        panelTestimonios: { title: 'Opiniones', target: 'panelTestimonios' },
        panelProyectos: { title: 'Proyectos', target: 'panelProyectos' },
        panelServicios: { title: 'Servicios', target: 'panelServicios' },
        panelPedidos: { title: 'Pedidos', target: 'panelPedidos' },
        panelMensajes: { title: 'Mensajes', target: 'panelMensajes' },
        panelPerfilAdmin: { title: 'Mi perfil de administrador', target: 'panelPerfilAdmin' }
    };

    function setAdminSection(section, updateHash = true) {
        const key = adminSections[section] ? section : 'summary';
        const panels = $$('.admin-panel');
        const stats = $('.stats-row');
        const target = adminSections[key].target;
        panels.forEach(panel => { panel.hidden = Boolean(target) && panel.id !== target; });
        if (stats) stats.hidden = Boolean(target);

        $$('#adminNav a[data-admin-section]').forEach(link => link.classList.toggle('active', link.dataset.adminSection === key));
        const title = $('.admin-topbar h1');
        if (title) title.textContent = adminSections[key].title;
        document.body.classList.toggle('admin-focused-section', Boolean(target));
        if (updateHash) {
            const hash = target ? `#${target}` : '#resumen';
            history.replaceState(null, '', `${location.pathname}${hash}`);
        }
        if (target) {
            const panel = document.getElementById(target);
            panel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function initSectionTracking() {
        const links = $$('#adminNav a[data-admin-section]');
        links.forEach(link => link.addEventListener('click', event => {
            if (link.dataset.adminSection === undefined) return;
            event.preventDefault();
            setAdminSection(link.dataset.adminSection);
            $('#adminSidebar')?.classList.remove('is-open');
            const toggle = $('.admin-menu-toggle');
            if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.innerHTML = '<i class="fas fa-bars"></i>'; }
        }));
        const hash = location.hash.replace(/^#/, '');
        setAdminSection(adminSections[hash] ? hash : 'summary', false);
        window.addEventListener('hashchange', () => {
            const next = location.hash.replace(/^#/, '');
            setAdminSection(adminSections[next] ? next : 'summary', false);
        });
        window.setAdminSection = setAdminSection;
        window.__adminSections = adminSections;
    }

    function initSoundNotifications() {
        const select = $('#adminSoundSelect');
        const volume = $('#adminSoundVolume');
        const enabled = $('#adminSoundEnabled');
        const test = $('#adminSoundTest');
        const status = $('#adminSoundStatus');
        if (!select || !volume || !enabled) return;
        const keys = { sound: 'wilkyjams_admin_sound', volume: 'wilkyjams_admin_sound_volume', enabled: 'wilkyjams_admin_sound_enabled' };
        select.value = safeStorageGet(keys.sound) || 'soft';
        volume.value = safeStorageGet(keys.volume) ?? '0.55';
        enabled.checked = safeStorageGet(keys.enabled) !== '0';

        let audioContext = null;
        const getAudioContext = () => {
            if (!audioContext) {
                const Ctx = window.AudioContext || window.webkitAudioContext;
                if (!Ctx) return null;
                audioContext = new Ctx();
            }
            if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
            return audioContext;
        };
        const tone = (ctx, frequency, start, duration, gain, type='sine') => {
            const oscillator = ctx.createOscillator();
            const amp = ctx.createGain();
            oscillator.type = type; oscillator.frequency.setValueAtTime(frequency, start);
            amp.gain.setValueAtTime(0.0001, start);
            amp.gain.exponentialRampToValueAtTime(Math.max(0.0001, gain), start + 0.012);
            amp.gain.exponentialRampToValueAtTime(0.0001, start + duration);
            oscillator.connect(amp); amp.connect(ctx.destination);
            oscillator.start(start); oscillator.stop(start + duration + 0.02);
        };
        const play = kind => {
            if (!enabled.checked) return false;
            const ctx = getAudioContext(); if (!ctx) return false;
            const now = ctx.currentTime + 0.01;
            const gain = Number(volume.value || 0.55) * 0.12;
            if (kind === 'bell') { tone(ctx, 880, now, .20, gain, 'sine'); tone(ctx, 1320, now + .08, .30, gain * .55, 'sine'); }
            else if (kind === 'digital') { tone(ctx, 740, now, .07, gain, 'square'); tone(ctx, 980, now + .08, .09, gain * .75, 'square'); }
            else if (kind === 'double') { tone(ctx, 620, now, .10, gain, 'sine'); tone(ctx, 820, now + .13, .12, gain, 'sine'); }
            else if (kind === 'pop') { tone(ctx, 420, now, .055, gain, 'triangle'); }
            else { tone(ctx, 720, now, .12, gain, 'sine'); }
            return true;
        };
        const persist = () => { safeStorageSet(keys.sound, select.value); safeStorageSet(keys.volume, volume.value); safeStorageSet(keys.enabled, enabled.checked ? '1' : '0'); };
        select.addEventListener('change', persist); volume.addEventListener('input', persist); enabled.addEventListener('change', persist);
        test?.addEventListener('click', () => { const ok = play(select.value); if (status) status.textContent = ok ? 'Sonido reproducido' : 'Activa el audio del navegador'; setTimeout(() => { if (status) status.textContent = 'Listo'; }, 1800); });
        document.addEventListener('pointerdown', () => getAudioContext(), { once: true, passive: true });
        window.playAdminNotificationSound = () => play(select.value);
    }

    function notificationItem(icon, title, text, href, extraClass='') {
        return `<a class="popover-item ${extraClass}" href="${href}"><span class="popover-icon"><i class="fas ${icon}"></i></span><span><strong>${title}</strong><small>${text}</small></span></a>`;
    }

    let liveNotificationItems = [];
    let unreadNotificationCount = 0;

    function pushLiveNotification(item, playSound = true) {
        liveNotificationItems = [item, ...liveNotificationItems].slice(0, 8);
        unreadNotificationCount += 1;
        renderNotifications();
        if (playSound) window.playAdminNotificationSound?.();
    }

    function renderNotifications(baseItems = []) {
        const list = $('#adminNotificationsList');
        const badge = $('#adminNotificationBadge');
        if (!list) return;
        const merged = [...liveNotificationItems, ...baseItems].slice(0, 10);
        list.innerHTML = merged.length ? merged.map(item => item.html || item).join('') : '<div class="popover-empty"><i class="fas fa-check-circle"></i><span>Todo está al día.</span></div>';
        if (badge) { badge.textContent = unreadNotificationCount > 99 ? '99+' : String(unreadNotificationCount); badge.classList.toggle('visible', unreadNotificationCount > 0); }
    }

    async function loadAdminNotifications() {
        const db = window.portfolioSupabase;
        if (!db) return;
        try {
            const lastSeen = Number(safeStorageGet('wilkyjams_admin_notifications_seen') || 0);
            const [{ data: messages }, { data: orders }, { data: visits }] = await Promise.all([
                db.from('contact_messages').select('id,name,subject,created_at,status').in('status', ['new','read']).order('created_at', { ascending: false }).limit(4),
                db.from('orders').select('id,customer_name,total,created_at,status').in('status', ['pending','confirmed','processing']).order('created_at', { ascending: false }).limit(4),
                db.from('site_events').select('id,page,created_at,session_id').eq('event_type','page_view').order('created_at', { ascending: false }).limit(6)
            ]);
            const base = [
                ...(messages || []).map(item => ({ time: new Date(item.created_at), html: notificationItem('fa-envelope','Nuevo mensaje',`${item.name || 'Cliente'} · ${item.subject || 'Sin asunto'}`,'#panelMensajes') })),
                ...(orders || []).map(item => ({ time: new Date(item.created_at), html: notificationItem('fa-receipt','Pedido pendiente',`${item.customer_name || 'Cliente'} · ${Number(item.total || 0).toFixed(2)} ${item.status || ''}`,'#panelPedidos') }))
            ].sort((a,b) => b.time-a.time);
            const newVisits = (visits || []).filter(v => new Date(v.created_at).getTime() > lastSeen);
            if (lastSeen && newVisits.length) unreadNotificationCount += newVisits.length;
            const visitItems = newVisits.slice(0, 4).map(v => ({ time:new Date(v.created_at), html:notificationItem('fa-eye','Nueva visita',`${v.page || '/'} · ${new Date(v.created_at).toLocaleTimeString('es-DO',{hour:'2-digit',minute:'2-digit'})}`,'#panelAnalitica') }));
            renderNotifications([...visitItems, ...base]);
        } catch {
            renderNotifications();
        }
    }

    window.loadAdminNotifications = loadAdminNotifications;

    function handleRealtimeSiteEvent(payload) {
        const row = payload?.new;
        if (!row || row.event_type !== 'page_view') return;
        const stamp = new Date(row.created_at || Date.now());
        const item = { time: stamp, html: notificationItem('fa-eye','Nueva visita',`${row.page || '/'} · ${stamp.toLocaleTimeString('es-DO',{hour:'2-digit',minute:'2-digit'})}`,'#panelAnalitica','is-new') };
        safeStorageSet('wilkyjams_admin_notifications_seen', String(stamp.getTime()));
        pushLiveNotification(item, true);
        window.loadAdminNotifications?.();
    }
    window.handleRealtimeSiteEvent = handleRealtimeSiteEvent;

    function handleRealtimeBusinessEvent(payload) {
        const row = payload?.new;
        if (!row) return;
        if (payload.table === 'contact_messages') {
            pushLiveNotification({ time:new Date(row.created_at || Date.now()), html:notificationItem('fa-envelope','Nuevo mensaje',`${row.name || 'Cliente'} · ${row.subject || 'Sin asunto'}`,'#panelMensajes','is-new') }, true);
        } else if (payload.table === 'orders') {
            pushLiveNotification({ time:new Date(row.created_at || Date.now()), html:notificationItem('fa-receipt','Nuevo pedido',`${row.customer_name || 'Cliente'} · ${Number(row.total || 0).toFixed(2)}`,'#panelPedidos','is-new') }, true);
        }
    }
    window.handleRealtimeBusinessEvent = handleRealtimeBusinessEvent;

    function initProfileEmail() {
        window.addEventListener('admin:user-ready', event => {
            const email = event.detail?.email;
            if (email) {
                const el = $('#adminProfileEmail');
                if (el) el.textContent = email;
            }
        });
    }

    function init() {
        initTheme();
        initPopovers();
        initGlobalSearch();
        initSidebarCollapse();
        initSectionTracking();
        initProfileEmail();
        initSoundNotifications();
        loadAdminNotifications();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
