/* ============================================================
   WILKYJAMS DEV ADMIN — UI / UX CONTROLLER
   Dashboard reference inspired, project-specific implementation.
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

    // ===== TEMA =====
    function setTheme(theme) {
        const light = theme === 'light';
        document.body.classList.toggle('admin-light', light);
        const button = $('#adminThemeToggle');
        if (button) {
            button.innerHTML = `<i class="fas fa-${light ? 'sun' : 'moon'}"></i>`;
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

    // ===== POPOVERS (Perfil y Notificaciones) =====
    function closePopovers(except = null) {
        $$('.admin-popover').forEach(menu => {
            if (menu !== except) menu.hidden = true;
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
        document.addEventListener('click', () => closePopovers());

        $('#adminProfileLogout')?.addEventListener('click', async () => {
            if (typeof window.logoutAdmin === 'function') return window.logoutAdmin();
            if (window.portfolioSupabase?.auth) {
                await window.portfolioSupabase.auth.signOut();
                location.replace('login.html');
            }
        });
    }

    // ===== BÚSQUEDA GLOBAL =====
    function initGlobalSearch() {
        const input = $('#adminGlobalSearch');
        if (!input) return;

        input.addEventListener('input', () => {
            const query = input.value.toLowerCase().trim();
            $$('.admin-table tbody tr').forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }

    // ===== NAVEGACIÓN LATERAL (LA MAGIA) =====
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
        panelPerfilAdmin: { title: 'Mi perfil', target: 'panelPerfilAdmin' }
    };

    function setAdminSection(section) {
        const key = adminSections[section] ? section : 'summary';
        const target = adminSections[key].target;

        // Ocultar todos los paneles
        $$('.admin-panel').forEach(panel => {
            panel.hidden = true;
        });

        // Mostrar solo el panel seleccionado
        if (target) {
            const panel = document.getElementById(target);
            if (panel) panel.hidden = false;
        }

        // Ocultar las tarjetas de resumen si estamos en otra sección
        const stats = $('.stats-row');
        if (stats) stats.hidden = Boolean(target);

        // Actualizar el título superior
        const titleEl = $('.admin-topbar h1');
        if (titleEl) titleEl.textContent = adminSections[key].title;

        // Actualizar clase activa en el menú
        $$('#adminNav a[data-admin-section]').forEach(link => {
            link.classList.toggle('active', link.dataset.adminSection === key);
        });
    }

    function initSectionTracking() {
        const links = $$('#adminNav a[data-admin-section]');
        links.forEach(link => link.addEventListener('click', event => {
            event.preventDefault();
            setAdminSection(link.dataset.adminSection);
        }));

        // Cargar sección inicial
        const hash = location.hash.replace(/^#/, '');
        setAdminSection(adminSections[hash] ? hash : 'summary');
        
        window.setAdminSection = setAdminSection;
    }

    // ===== SONIDOS DE NOTIFICACIÓN =====
    function initSoundNotifications() {
        // (Tu código de sonidos intacto, omitido aquí para brevedad, pero puedes dejarlo tal cual)
    }

    function init() {
        initTheme();
        initPopovers();
        initGlobalSearch();
        initSectionTracking();
        initSoundNotifications();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
