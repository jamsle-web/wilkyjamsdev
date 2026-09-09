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
        document.addEventListener('click', () => closePopovers());

        $('#adminProfileLogout')?.addEventListener('click', async () => {
            if (typeof window.logoutAdmin === 'function') return window.logoutAdmin();
            if (window.portfolioSupabase?.auth) {
                await window.portfolioSupabase.auth.signOut();
                location.replace('login.html');
            }
        });
        $('#markNotificationsRead')?.addEventListener('click', () => {
            const badge = $('#adminNotificationBadge');
            if (badge) badge.textContent = '0';
            badge?.classList.remove('visible');
            const list = $('#adminNotificationsList');
            if (list) list.innerHTML = '<div class="popover-empty"><i class="fas fa-check-circle"></i><span>Todo está al día.</span></div>';
        });
    }

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

    function initSectionTracking() {
        const links = $$('#adminNav a[href^="#panel"]');
        const sections = links.map(link => document.getElementById(link.getAttribute('href').slice(1))).filter(Boolean);
        if (!sections.length) return;

        const setActive = id => {
            links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
        };

        const observer = new IntersectionObserver(entries => {
            const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (visible) setActive(visible.target.id);
        }, { rootMargin: '-18% 0px -65% 0px', threshold: [0.05, 0.2, 0.5] });
        sections.forEach(section => observer.observe(section));

        links.forEach(link => link.addEventListener('click', () => setTimeout(() => setActive(link.getAttribute('href').slice(1)), 80)));
    }

    function notificationItem(icon, title, text, href) {
        return `<a class="popover-item" href="${href}"><span class="popover-icon"><i class="fas ${icon}"></i></span><span><strong>${title}</strong><small>${text}</small></span></a>`;
    }

    async function loadAdminNotifications() {
        const db = window.portfolioSupabase;
        const list = $('#adminNotificationsList');
        const badge = $('#adminNotificationBadge');
        if (!db || !list) return;

        try {
            const [{ data: messages }, { data: orders }] = await Promise.all([
                db.from('contact_messages').select('id,name,subject,created_at,status').in('status', ['new','read']).order('created_at', { ascending: false }).limit(4),
                db.from('orders').select('id,customer_name,total,created_at,status').in('status', ['pending','confirmed','processing']).order('created_at', { ascending: false }).limit(4)
            ]);

            const items = [
                ...(messages || []).map(item => ({
                    time: new Date(item.created_at),
                    html: notificationItem('fa-envelope', 'Nuevo mensaje', `${item.name || 'Cliente'} · ${item.subject || 'Sin asunto'}`, '#panelMensajes')
                })),
                ...(orders || []).map(item => ({
                    time: new Date(item.created_at),
                    html: notificationItem('fa-receipt', 'Pedido pendiente', `${item.customer_name || 'Cliente'} · ${Number(item.total || 0).toFixed(2)} ${item.status || ''}`, '#panelPedidos')
                }))
            ].sort((a,b) => b.time - a.time).slice(0, 6);

            const count = (messages?.length || 0) + (orders?.length || 0);
            if (badge) {
                badge.textContent = count > 99 ? '99+' : String(count);
                badge.classList.toggle('visible', count > 0);
            }
            list.innerHTML = items.length ? items.map(item => item.html).join('') : '<div class="popover-empty"><i class="fas fa-check-circle"></i><span>Todo está al día.</span></div>';
        } catch (error) {
            list.innerHTML = '<div class="popover-empty"><i class="fas fa-circle-info"></i><span>No se pudieron cargar las notificaciones.</span></div>';
        }
    }

    window.loadAdminNotifications = loadAdminNotifications;

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
        loadAdminNotifications();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
