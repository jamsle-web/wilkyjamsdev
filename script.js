// Inicializar AOS (Animate On Scroll)
if (window.AOS && typeof window.AOS.init === 'function') {
    AOS.init({
        duration: 800,
        once: false,
        mirror: true
    });
}

// ----- TRADUCCIONES -----


/* ===== CMS content overrides (owner-editable without changing design) ===== */
window.applyContentOverrides = function () {
    const overrides = window.portfolioContentOverrides || {};
    const file = (location.pathname.split('/').pop() || 'index.html') || 'index.html';
    const lang = (typeof currentLang !== 'undefined' ? currentLang : (localStorage.getItem('jp_lang') || 'es'));
    const values = overrides?.[file]?.[lang] || {};
    Object.entries(values).forEach(([key, value]) => {
        document.querySelectorAll(`[data-i18n="${CSS.escape(key)}"]`).forEach(el => {
            el.textContent = String(value ?? '');
        });
        document.querySelectorAll(`[data-i18n-placeholder="${CSS.escape(key)}"]`).forEach(el => {
            el.setAttribute('placeholder', String(value ?? ''));
        });
    });
};

const translations = {
    es: {
        "nav.home": "Inicio",
        "nav.about": "Sobre mí",
        "nav.skills": "Habilidades",
        "nav.services": "Servicios",
        "nav.store": "Tienda",
        "nav.projects": "Proyectos",
        "nav.testimonials": "Testimonios",
        "nav.contact": "Contáctame",
        "hero.subtitle": "Web Design · Marketing Digital",
        "hero.greeting": "Hola, soy",
        "hero.name": "Jamsle Porcena",
        "hero.description": "Diseñador web y especialista en marketing digital apasionado por transformar ideas en identidades digitales sólidas. Combino diseño, tecnología e IA para hacer crecer tu marca.",
        "hero.btn_projects": "Ver proyectos",
        "hero.btn_contact": "Hablemos",
        "hero.stat_years": "Años de experiencia",
        "hero.stat_projects": "Proyectos realizados",
        "hero.stat_certs": "Certificaciones",
        "about.label": "Conóceme",
        "about.title": "Diseño + Estrategia = Impacto",
        "about.subtitle": "Mi enfoque va más allá de lo estético: construyo experiencias digitales que conectan y generan resultados.",
        "about.heading": "Apasionado por la creación digital",
        "about.p1": "Soy un creador digital con experiencia en diseño web (UI/UX), optimización SEO y marketing basado en datos. Ayudo a empresas y emprendedores a construir una identidad digital fuerte, funcional y memorable.",
        "about.specialty_label": "Especialidad:",
        "about.specialty_text": "Landing pages optimizadas, CMS (WordPress/Webflow), investigación UX y edición con IA.",
        "about.lang_fr": "Francés",
        "about.lang_fr_level": "Nativo",
        "about.lang_ht": "Creole",
        "about.lang_ht_level": "Nativo",
        "about.lang_es": "Español",
        "about.lang_es_level": "Fluido",
        "about.lang_en": "Inglés",
        "about.lang_en_level": "Intermedio-Avanzado",
        "about.experience": "Freelance · JamsLab Studio (2023-2025)",
        "cert.website_title": "Website Design",
        "cert.website_org": "HP LIFE · 2024",
        "cert.ai_title": "AI Technology for Business",
        "cert.ai_org": "HP LIFE · 2024",
        "cert.canva_title": "Canva Design",
        "cert.canva_org": "Canva · 2024",
        "cert.dm_title": "Digital Marketing",
        "cert.dm_org": "HubSpot Academy · 2025",
        "cert.data_title": "Data Analytics",
        "cert.data_org": "Databricks / Simplilearn · 2025",
        "skills.label": "Experiencia técnica",
        "skills.title": "Mis herramientas",
        "skills.subtitle": "Desde diseño y desarrollo hasta estrategia digital y análisis de datos.",
        "skill.responsive": "Responsive Design",
        "skill.ux": "UX Research",
        "skill.landing": "Landing Pages",
        "skill.cms": "CMS Management",
        "skill.ai": "IA & Edición",
        "projects.label": "Portafolio",
        "projects.title": "Proyectos destacados",
        "projects.subtitle": "Casos de éxito donde el diseño y la estrategia digital marcaron la diferencia.",
        "proj1.title": "Santo Sabor · Rediseño de identidad",
        "proj1.desc": "Rediseño de identidad digital para marca local. Experiencia web moderna, funcional y visualmente impactante. Rol: UI/UX Designer & Web Developer.",
        "proj1.result": "+40% tiempo de permanencia · mejora en conversión",
        "proj2.title": "StudyFlow AI · App educativa",
        "proj2.desc": "Aplicación educativa impulsada por IA para hacer el aprendizaje más organizado, intuitivo y personalizado. Arquitectura de información, UI/UX y prototipado.",
        "proj2.result": "Aprendizaje personalizado con IA",
        "proj3.title": "Burger King · Rediseño conceptual",
        "proj3.desc": "Rediseño conceptual de interfaz web para Burger King, enfocado en experiencia moderna, visualmente atractiva y centrada en productos.",
        "proj3.result": "Experiencia moderna y atractiva",
        "testimonials.label": "Opiniones",
        "testimonials.title": "Lo que dicen mis clientes",
        "testimonials.subtitle": "Personas y empresas que han confiado en mí para potenciar su presencia digital.",
        "testimonial1.text": "\"Jamsle transformó por completo nuestra web. El diseño es impecable y nuestras ventas online se dispararon. Muy profesional y atento a cada detalle.\"",
        "testimonial1.name": "María Gómez",
        "testimonial1.role": "Directora de EcoGreen",
        "testimonial2.text": "\"Excelente trabajo en el rediseño de nuestro spa. El nuevo sitio es moderno, rápido y ha aumentado las reservas de forma significativa. Muy recomendable.\"",
        "testimonial2.name": "Carlos Pérez",
        "testimonial2.role": "Gerente de Bella Vista Spa",
        "testimonial3.text": "\"La estrategia SEO de Jamsle llevó nuestro blog al primer lugar en Google. El tráfico orgánico creció más de un 120% en pocos meses. Un verdadero experto.\"",
        "testimonial3.name": "Laura Díaz",
        "testimonial3.role": "Fundadora de TechLab RD",
        "certs.label": "Formación continua",
        "certs.title": "Certificaciones",
        "contact.label": "Conectemos",
        "contact.title": "¿Hablamos de tu próximo proyecto?",
        "contact.subtitle": "Estoy a un mensaje de distancia. Cuéntame tu idea y la hacemos realidad.",
        "contact.info_title": "Información de contacto",
        "contact.info_desc": "Puedes escribirme por cualquiera de estos medios o a través de mis redes profesionales.",
        "contact.form_name": "Nombre completo",
        "contact.form_email": "Correo electrónico",
        "contact.form_subject": "Asunto",
        "contact.form_message": "Cuéntame sobre tu proyecto...",
        "contact.form_submit": "Enviar mensaje",
        "footer.tagline": "Diseño web & Marketing Digital"
    },
    en: {
        "nav.home": "Home",
        "nav.about": "About",
        "nav.skills": "Skills",
        "nav.services": "Services",
        "nav.store": "Store",
        "nav.projects": "Projects",
        "nav.testimonials": "Testimonials",
        "nav.contact": "Contact me",
        "hero.subtitle": "Web Design · Digital Marketing",
        "hero.greeting": "Hello, I'm",
        "hero.name": "Jamsle Porcena",
        "hero.description": "Web designer and digital marketing specialist passionate about turning ideas into solid digital identities. I combine design, technology and AI to grow your brand.",
        "hero.btn_projects": "View projects",
        "hero.btn_contact": "Let's talk",
        "hero.stat_years": "Years of experience",
        "hero.stat_projects": "Projects completed",
        "hero.stat_certs": "Certifications",
        "about.label": "About me",
        "about.title": "Design + Strategy = Impact",
        "about.subtitle": "My approach goes beyond aesthetics: I build digital experiences that connect and deliver results.",
        "about.heading": "Passionate about digital creation",
        "about.p1": "I'm a digital creator with experience in web design (UI/UX), SEO optimization and data-driven marketing. I help businesses and entrepreneurs build a strong, functional and memorable digital identity.",
        "about.specialty_label": "Specialty:",
        "about.specialty_text": "Optimized landing pages, CMS (WordPress/Webflow), UX research and AI-assisted editing.",
        "about.lang_fr": "French",
        "about.lang_fr_level": "Native",
        "about.lang_ht": "Creole",
        "about.lang_ht_level": "Native",
        "about.lang_es": "Spanish",
        "about.lang_es_level": "Fluent",
        "about.lang_en": "English",
        "about.lang_en_level": "Intermediate-Advanced",
        "about.experience": "Freelance · JamsLab Studio (2023-2025)",
        "cert.website_title": "Website Design",
        "cert.website_org": "HP LIFE · 2024",
        "cert.ai_title": "AI Technology for Business",
        "cert.ai_org": "HP LIFE · 2024",
        "cert.canva_title": "Canva Design",
        "cert.canva_org": "Canva · 2024",
        "cert.dm_title": "Digital Marketing",
        "cert.dm_org": "HubSpot Academy · 2025",
        "cert.data_title": "Data Analytics",
        "cert.data_org": "Databricks / Simplilearn · 2025",
        "skills.label": "Technical experience",
        "skills.title": "My tools",
        "skills.subtitle": "From design and development to digital strategy and data analytics.",
        "skill.responsive": "Responsive Design",
        "skill.ux": "UX Research",
        "skill.landing": "Landing Pages",
        "skill.cms": "CMS Management",
        "skill.ai": "AI & Editing",
        "projects.label": "Portfolio",
        "projects.title": "Featured projects",
        "projects.subtitle": "Success stories where design and digital strategy made the difference.",
        "proj1.title": "Santo Sabor · Identity Redesign",
        "proj1.desc": "Digital identity redesign for a local brand. Modern, functional and visually impactful web experience. Role: UI/UX Designer & Web Developer.",
        "proj1.result": "+40% time on site · conversion improvement",
        "proj2.title": "StudyFlow AI · Educational App",
        "proj2.desc": "AI-powered educational app to make learning more organized, intuitive and personalized. Information architecture, UI/UX and prototyping.",
        "proj2.result": "Personalized learning with AI",
        "proj3.title": "Burger King · Conceptual Redesign",
        "proj3.desc": "Conceptual web interface redesign for Burger King, focused on a modern, visually appealing and product-centered experience.",
        "proj3.result": "Modern and attractive experience",
        "testimonials.label": "Testimonials",
        "testimonials.title": "What my clients say",
        "testimonials.subtitle": "People and companies that have trusted me to boost their digital presence.",
        "testimonial1.text": "\"Jamsle completely transformed our website. The design is flawless and our online sales skyrocketed. Very professional and attentive to every detail.\"",
        "testimonial1.name": "María Gómez",
        "testimonial1.role": "Director at EcoGreen",
        "testimonial2.text": "\"Excellent work on our spa redesign. The new site is modern, fast and has significantly increased bookings. Highly recommended.\"",
        "testimonial2.name": "Carlos Pérez",
        "testimonial2.role": "Manager at Bella Vista Spa",
        "testimonial3.text": "\"Jamsle's SEO strategy took our blog to the top of Google. Organic traffic grew over 120% in just a few months. A true expert.\"",
        "testimonial3.name": "Laura Díaz",
        "testimonial3.role": "Founder of TechLab RD",
        "certs.label": "Continuous learning",
        "certs.title": "Certifications",
        "contact.label": "Let's connect",
        "contact.title": "Ready for your next project?",
        "contact.subtitle": "I'm just a message away. Tell me your idea and we'll make it happen.",
        "contact.info_title": "Contact information",
        "contact.info_desc": "You can reach me through any of these channels or via my professional networks.",
        "contact.form_name": "Full name",
        "contact.form_email": "Email address",
        "contact.form_subject": "Subject",
        "contact.form_message": "Tell me about your project...",
        "contact.form_submit": "Send message",
        "footer.tagline": "Web Design & Digital Marketing"
    },
    fr: {
        "nav.home": "Accueil",
        "nav.about": "À propos",
        "nav.skills": "Compétences",
        "nav.services": "Services",
        "nav.store": "Boutique",
        "nav.projects": "Projets",
        "nav.testimonials": "Témoignages",
        "nav.contact": "Contactez-moi",
        "hero.subtitle": "Web Design · Marketing Digital",
        "hero.greeting": "Bonjour, je suis",
        "hero.name": "Jamsle Porcena",
        "hero.description": "Concepteur web et spécialiste en marketing digital passionné par la transformation d'idées en identités numériques solides. Je combine design, technologie et IA pour faire croître votre marque.",
        "hero.btn_projects": "Voir les projets",
        "hero.btn_contact": "Parlons-en",
        "hero.stat_years": "Années d'expérience",
        "hero.stat_projects": "Projets réalisés",
        "hero.stat_certs": "Certifications",
        "about.label": "À propos",
        "about.title": "Design + Stratégie = Impact",
        "about.subtitle": "Mon approche va au-delà de l'esthétique : je crée des expériences numériques qui connectent et génèrent des résultats.",
        "about.heading": "Passionné par la création numérique",
        "about.p1": "Je suis un créateur numérique avec une expérience en conception web (UI/UX), optimisation SEO et marketing axé sur les données. J'aide les entreprises et les entrepreneurs à construire une identité numérique forte, fonctionnelle et mémorable.",
        "about.specialty_label": "Spécialité :",
        "about.specialty_text": "Landing pages optimisées, CMS (WordPress/Webflow), recherche UX et édition assistée par IA.",
        "about.lang_fr": "Français",
        "about.lang_fr_level": "Natif",
        "about.lang_ht": "Créole",
        "about.lang_ht_level": "Natif",
        "about.lang_es": "Espagnol",
        "about.lang_es_level": "Courant",
        "about.lang_en": "Anglais",
        "about.lang_en_level": "Intermédiaire-Avancé",
        "about.experience": "Freelance · JamsLab Studio (2023-2025)",
        "cert.website_title": "Conception de sites web",
        "cert.website_org": "HP LIFE · 2024",
        "cert.ai_title": "IA pour les entreprises",
        "cert.ai_org": "HP LIFE · 2024",
        "cert.canva_title": "Design Canva",
        "cert.canva_org": "Canva · 2024",
        "cert.dm_title": "Marketing numérique",
        "cert.dm_org": "HubSpot Academy · 2025",
        "cert.data_title": "Analyse de données",
        "cert.data_org": "Databricks / Simplilearn · 2025",
        "skills.label": "Expérience technique",
        "skills.title": "Mes outils",
        "skills.subtitle": "Du design et du développement à la stratégie numérique et à l'analyse de données.",
        "skill.responsive": "Responsive Design",
        "skill.ux": "Recherche UX",
        "skill.landing": "Pages d'atterrissage",
        "skill.cms": "Gestion CMS",
        "skill.ai": "IA & Édition",
        "projects.label": "Portfolio",
        "projects.title": "Projets vedettes",
        "projects.subtitle": "Des réussites où le design et la stratégie numérique ont fait la différence.",
        "proj1.title": "Santo Sabor · Refonte d'identité",
        "proj1.desc": "Refonte de l'identité numérique pour une marque locale. Expérience web moderne, fonctionnelle et visuellement percutante. Rôle : UI/UX Designer & Web Developer.",
        "proj1.result": "+40% de temps passé · amélioration des conversions",
        "proj2.title": "StudyFlow AI · App éducative",
        "proj2.desc": "Application éducative propulsée par l'IA pour rendre l'apprentissage plus organisé, intuitif et personnalisé. Architecture de l'information, UI/UX et prototypage.",
        "proj2.result": "Apprentissage personnalisé avec IA",
        "proj3.title": "Burger King · Refonte conceptuelle",
        "proj3.desc": "Refonte conceptuelle de l'interface web pour Burger King, axée sur une expérience moderne, visuellement attrayante et centrée sur les produits.",
        "proj3.result": "Expérience moderne et attrayante",
        "testimonials.label": "Témoignages",
        "testimonials.title": "Ce que disent mes clients",
        "testimonials.subtitle": "Des personnes et des entreprises qui m'ont fait confiance pour booster leur présence numérique.",
        "testimonial1.text": "\"Jamsle a complètement transformé notre site. Le design est impeccable et nos ventes en ligne ont décollé. Très professionnel et attentif à chaque détail.\"",
        "testimonial1.name": "María Gómez",
        "testimonial1.role": "Directrice d'EcoGreen",
        "testimonial2.text": "\"Excellent travail sur la refonte de notre spa. Le nouveau site est moderne, rapide et a augmenté les réservations de manière significative. Je le recommande vivement.\"",
        "testimonial2.name": "Carlos Pérez",
        "testimonial2.role": "Gérant de Bella Vista Spa",
        "testimonial3.text": "\"La stratégie SEO de Jamsle a propulsé notre blog en première page de Google. Le trafic organique a augmenté de plus de 120% en quelques mois. Un véritable expert.\"",
        "testimonial3.name": "Laura Díaz",
        "testimonial3.role": "Fondatrice de TechLab RD",
        "certs.label": "Formation continue",
        "certs.title": "Certifications",
        "contact.label": "Connectons-nous",
        "contact.title": "Prêt pour votre prochain projet ?",
        "contact.subtitle": "Je suis à un message de vous. Dites-moi votre idée et nous la concrétiserons.",
        "contact.info_title": "Coordonnées",
        "contact.info_desc": "Vous pouvez me joindre par l'un de ces canaux ou via mes réseaux professionnels.",
        "contact.form_name": "Nom complet",
        "contact.form_email": "Adresse e-mail",
        "contact.form_subject": "Sujet",
        "contact.form_message": "Parlez-moi de votre projet...",
        "contact.form_submit": "Envoyer le message",
        "footer.tagline": "Web Design & Marketing Digital"
    }
};


/* ============================================================
   TRADUCCIONES COMPLETAS DE PÁGINAS Y UI COMPARTIDA
   ============================================================ */
Object.assign(translations.es, {
 "cart.decrease":"Disminuir cantidad", "cart.increase":"Aumentar cantidad",
    "nav.contact_short":"Contacto", "services.hero_label":"Servicios", "services.hero_title_prefix":"Soluciones digitales a la medida de tu ", "services.hero_title_highlight":"marca", "services.hero_title":"Soluciones digitales a la medida de tu marca", "services.hero_desc":"Diseño web, marketing digital y estrategia de marca en paquetes claros, o hechos completamente a tu medida.",
    "services.plans_label":"Planes", "services.plans_title":"Elige el paquete ideal para ti", "services.plans_desc":"Precios de referencia en dólares (USD). Cada proyecto se ajusta según alcance, plazos y contenido.", "services.request":"Solicitar", "services.popular":"Más elegido", "services.custom_prefix":"¿Necesitas algo diferente?", "services.custom_link":"Cuéntame tu proyecto", "services.custom_suffix":"y armamos una propuesta a tu medida.", "services.process_label":"Cómo trabajamos", "services.process_title":"De la idea al lanzamiento", "services.process_desc":"Un proceso simple y transparente, pensado para que siempre sepas en qué etapa está tu proyecto.", "services.cta_title":"¿Listo para empezar tu proyecto?", "services.cta_desc":"Escríbeme y conversemos sobre cómo llevar tu marca al siguiente nivel.", "services.view":"Ver servicios",
    "aboutpage.hero_label":"Mi historia", "aboutpage.hero_title_prefix":"Detrás de cada diseño hay una ", "aboutpage.hero_title_highlight":"historia", "aboutpage.hero_title":"Detrás de cada diseño hay una historia", "aboutpage.hero_desc":"Soy Jamsle Porcena: diseñador web, especialista en marketing digital y, sobre todo, alguien a quien le apasiona ayudar a marcas a encontrar su voz digital.", "aboutpage.bio_title":"Del Caribe al mundo digital", "aboutpage.values_label":"Cómo trabajo", "aboutpage.values_title":"Los valores detrás de cada proyecto", "aboutpage.timeline_label":"Trayectoria", "aboutpage.timeline_title":"Mi camino hasta hoy", "aboutpage.cta_title":"¿Conectamos?", "aboutpage.cta_desc":"Me encantaría conocer tu proyecto y ver cómo puedo ayudarte a hacerlo realidad.",
    "contactpage.hero_label":"Conectemos", "contactpage.hero_title_prefix":"Hablemos de tu ", "contactpage.hero_title_highlight":"próximo proyecto", "contactpage.hero_title":"Hablemos de tu próximo proyecto", "contactpage.hero_desc":"Elige el canal que prefieras. Normalmente respondo en menos de 24 horas.", "contactpage.form_title":"Cuéntame sobre tu proyecto", "contactpage.form_desc":"Entre más detalles me des, más rápido podré prepararte una propuesta ajustada a lo que necesitas.", "contactpage.faq_label":"Preguntas frecuentes", "contactpage.faq_title":"Antes de escribirme", "contactpage.modal_title":"¡Mensaje listo para enviar!", "contactpage.close":"Cerrar",
    "store.hero_label":"Tienda digital", "store.hero_title_prefix":"Productos digitales ", "store.hero_title_highlight":"listos para usar", "store.hero_title":"Productos digitales listos para usar", "store.hero_desc":"Logos, sitios web, landing pages, apps, flyers, tarjetas de presentación y sesiones de fotos — todo lo que tu marca necesita, en un solo lugar.", "store.all":"Todos", "store.logos":"Logos", "store.web":"Sitios Web", "store.landing":"Landing Pages", "store.apps":"Apps", "store.flyers":"Flyers", "store.business_cards":"Business Cards", "store.photo":"Fotografía", "store.how_title":"¿Cómo funciona la compra?", "store.how_desc":"Agrega los productos que necesitas al carrito y finaliza tu pedido por WhatsApp. Coordinamos el pago por el canal acordado y te entrego el archivo o proyecto una vez confirmado.",
    "footer.description":"Diseño web, marketing digital y productos digitales listos para hacer crecer tu marca.", "footer.navigation":"Navegación", "footer.services":"Servicios", "footer.contact":"Contacto", "footer.web_design":"Diseño web", "footer.digital_marketing":"Marketing digital", "footer.store":"Tienda de productos", "footer.whatsapp":"WhatsApp"
});
Object.assign(translations.en, { 'cart.decrease': 'Decrease quantity', 'cart.increase': 'Increase quantity' });

Object.assign(translations.en, {
    "nav.contact_short":"Contact", "services.hero_label":"Services", "services.hero_title_prefix":"Tailored digital solutions for your ", "services.hero_title_highlight":"brand", "services.hero_title":"Tailored digital solutions for your brand", "services.hero_desc":"Web design, digital marketing and brand strategy in clear packages, or completely tailored to your needs.", "services.plans_label":"Plans", "services.plans_title":"Choose the ideal package for you", "services.plans_desc":"Reference prices in US dollars (USD). Each project is adjusted according to scope, timeline and content.", "services.request":"Request", "services.popular":"Most chosen", "services.custom_prefix":"Need something different?", "services.custom_link":"Tell me about your project", "services.custom_suffix":"and we'll build a tailored proposal.", "services.process_label":"How we work", "services.process_title":"From idea to launch", "services.process_desc":"A simple and transparent process designed so you always know which stage your project is in.", "services.cta_title":"Ready to start your project?", "services.cta_desc":"Write to me and let's discuss how to take your brand to the next level.", "services.view":"View services",
    "aboutpage.hero_label":"My story", "aboutpage.hero_title_prefix":"Behind every design is a ", "aboutpage.hero_title_highlight":"story", "aboutpage.hero_title":"Behind every design is a story", "aboutpage.hero_desc":"I'm Jamsle Porcena: a web designer and digital marketing specialist who is passionate about helping brands find their digital voice.", "aboutpage.bio_title":"From the Caribbean to the digital world", "aboutpage.values_label":"How I work", "aboutpage.values_title":"The values behind every project", "aboutpage.timeline_label":"Journey", "aboutpage.timeline_title":"My journey so far", "aboutpage.cta_title":"Let's connect", "aboutpage.cta_desc":"I'd love to learn about your project and see how I can help make it a reality.",
    "contactpage.hero_label":"Let's connect", "contactpage.hero_title_prefix":"Let's talk about your ", "contactpage.hero_title_highlight":"next project", "contactpage.hero_title":"Let's talk about your next project", "contactpage.hero_desc":"Choose the channel you prefer. I usually reply within 24 hours.", "contactpage.form_title":"Tell me about your project", "contactpage.form_desc":"The more details you provide, the faster I can prepare a proposal tailored to what you need.", "contactpage.faq_label":"Frequently asked questions", "contactpage.faq_title":"Before you write", "contactpage.modal_title":"Message ready to send!", "contactpage.close":"Close",
    "store.hero_label":"Digital store", "store.hero_title_prefix":"Digital products ", "store.hero_title_highlight":"ready to use", "store.hero_title":"Digital products ready to use", "store.hero_desc":"Logos, websites, landing pages, apps, flyers, business cards and photo sessions — everything your brand needs, in one place.", "store.all":"All", "store.logos":"Logos", "store.web":"Websites", "store.landing":"Landing Pages", "store.apps":"Apps", "store.flyers":"Flyers", "store.business_cards":"Business Cards", "store.photo":"Photography", "store.how_title":"How does the purchase work?", "store.how_desc":"Add the products you need to your cart and complete your order through WhatsApp. We coordinate payment through the agreed channel and deliver the file or project once confirmed.",
    "footer.description":"Web design, digital marketing and digital products ready to help your brand grow.", "footer.navigation":"Navigation", "footer.services":"Services", "footer.contact":"Contact", "footer.web_design":"Web design", "footer.digital_marketing":"Digital marketing", "footer.store":"Product store", "footer.whatsapp":"WhatsApp"
});
Object.assign(translations.fr, { 'cart.decrease': 'Diminuer la quantité', 'cart.increase': 'Augmenter la quantité' });

Object.assign(translations.fr, {
    "nav.contact_short":"Contact", "services.hero_label":"Services", "services.hero_title_prefix":"Des solutions numériques sur mesure pour votre ", "services.hero_title_highlight":"marque", "services.hero_title":"Des solutions numériques sur mesure pour votre marque", "services.hero_desc":"Design web, marketing numérique et stratégie de marque dans des forfaits clairs ou entièrement personnalisés.", "services.plans_label":"Forfaits", "services.plans_title":"Choisissez le forfait idéal pour vous", "services.plans_desc":"Prix indicatifs en dollars américains (USD). Chaque projet est adapté selon la portée, les délais et le contenu.", "services.request":"Demander", "services.popular":"Le plus choisi", "services.custom_prefix":"Besoin de quelque chose de différent ?", "services.custom_link":"Parlez-moi de votre projet", "services.custom_suffix":"et nous préparerons une proposition sur mesure.", "services.process_label":"Comment nous travaillons", "services.process_title":"De l'idée au lancement", "services.process_desc":"Un processus simple et transparent pour que vous sachiez toujours à quelle étape se trouve votre projet.", "services.cta_title":"Prêt à commencer votre projet ?", "services.cta_desc":"Écrivez-moi et discutons de la manière de faire passer votre marque au niveau supérieur.", "services.view":"Voir les services",
    "aboutpage.hero_label":"Mon histoire", "aboutpage.hero_title_prefix":"Derrière chaque design, il y a une ", "aboutpage.hero_title_highlight":"histoire", "aboutpage.hero_title":"Derrière chaque design, il y a une histoire", "aboutpage.hero_desc":"Je suis Jamsle Porcena : designer web et spécialiste du marketing numérique, passionné par l'idée d'aider les marques à trouver leur voix numérique.", "aboutpage.bio_title":"Des Caraïbes au monde numérique", "aboutpage.values_label":"Ma façon de travailler", "aboutpage.values_title":"Les valeurs derrière chaque projet", "aboutpage.timeline_label":"Parcours", "aboutpage.timeline_title":"Mon parcours jusqu'à aujourd'hui", "aboutpage.cta_title":"Restons en contact", "aboutpage.cta_desc":"J'aimerais découvrir votre projet et voir comment je peux vous aider à le concrétiser.",
    "contactpage.hero_label":"Restons en contact", "contactpage.hero_title_prefix":"Parlons de votre ", "contactpage.hero_title_highlight":"prochain projet", "contactpage.hero_title":"Parlons de votre prochain projet", "contactpage.hero_desc":"Choisissez le canal que vous préférez. Je réponds généralement en moins de 24 heures.", "contactpage.form_title":"Parlez-moi de votre projet", "contactpage.form_desc":"Plus vous me donnez de détails, plus vite je pourrai préparer une proposition adaptée à vos besoins.", "contactpage.faq_label":"Questions fréquentes", "contactpage.faq_title":"Avant de m'écrire", "contactpage.modal_title":"Message prêt à être envoyé !", "contactpage.close":"Fermer",
    "store.hero_label":"Boutique numérique", "store.hero_title_prefix":"Produits numériques ", "store.hero_title_highlight":"prêts à l'emploi", "store.hero_title":"Produits numériques prêts à l'emploi", "store.hero_desc":"Logos, sites web, landing pages, applications, flyers, cartes de visite et séances photo — tout ce dont votre marque a besoin, au même endroit.", "store.all":"Tous", "store.logos":"Logos", "store.web":"Sites web", "store.landing":"Landing pages", "store.apps":"Applications", "store.flyers":"Flyers", "store.business_cards":"Cartes de visite", "store.photo":"Photographie", "store.how_title":"Comment fonctionne l'achat ?", "store.how_desc":"Ajoutez les produits dont vous avez besoin au panier et finalisez votre commande via WhatsApp. Nous coordonnons le paiement via le canal convenu et je livre le fichier ou le projet une fois confirmé.",
    "footer.description":"Design web, marketing numérique et produits numériques prêts à faire grandir votre marque.", "footer.navigation":"Navigation", "footer.services":"Services", "footer.contact":"Contact", "footer.web_design":"Design web", "footer.digital_marketing":"Marketing numérique", "footer.store":"Boutique de produits", "footer.whatsapp":"WhatsApp"
});


Object.assign(translations.es, {
 "plans.per_project":"/ proyecto", "plans.landing.title":"Landing Page", "plans.landing.desc":"Ideal para lanzar un producto, servicio o campaña específica.", "plans.landing.f1":"Diseño de 1 página (una sola sección larga)", "plans.landing.f2":"Responsive (móvil, tablet, escritorio)", "plans.landing.f3":"Formulario de contacto", "plans.landing.f4":"Optimización SEO básica", "plans.landing.f5":"Panel de administración",
 "plans.full.title":"Sitio Web Completo", "plans.full.desc":"Un sitio multi-página para presentar tu negocio de forma profesional.", "plans.full.f1":"Hasta 5 páginas (Inicio, Sobre, Servicios, Contacto...)", "plans.full.f2":"Diseño 100% personalizado", "plans.full.f3":"Responsive + animaciones", "plans.full.f4":"SEO on-page + Google Analytics", "plans.full.f5":"1 mes de soporte post-lanzamiento",
 "plans.brand.title":"Marca + Marketing", "plans.brand.desc":"Identidad visual, sitio web y estrategia de contenido para escalar tu marca.", "plans.brand.f1":"Todo lo del plan Sitio Web Completo", "plans.brand.f2":"Diseño de logo + manual de marca", "plans.brand.f3":"Plan de contenido para redes (1 mes)", "plans.brand.f4":"Estrategia SEO avanzada", "plans.brand.f5":"Reunión mensual de seguimiento",
 "process.1.title":"Descubrimiento", "process.1.desc":"Conversamos sobre tu marca, objetivos, referencias y público para entender qué necesitas realmente.", "process.2.title":"Propuesta y diseño", "process.2.desc":"Te presento una propuesta clara de alcance, tiempos e inversión, y empezamos con el diseño visual.", "process.3.title":"Desarrollo", "process.3.desc":"Construyo el sitio o la pieza de marketing, con revisiones contigo en cada etapa clave.", "process.4.title":"Lanzamiento y soporte", "process.4.desc":"Publicamos tu proyecto y te acompaño en el periodo posterior para ajustes y dudas.",
 "aboutpage.bio1":"Crecí entre culturas —francesa, haitiana y dominicana— y esa mezcla forma parte de cómo entiendo el diseño: como un puente entre lo que una marca quiere decir y cómo la gente realmente lo percibe.", "aboutpage.bio2":"Empecé programando páginas simples por curiosidad, y con el tiempo esa curiosidad se convirtió en una carrera enfocada en diseño web (UI/UX), optimización SEO y marketing basado en datos.", "aboutpage.bio3":"Fuera de la pantalla, sigo aprendiendo constantemente: cada certificación, cada proyecto y cada cliente me enseña algo nuevo que llevo al siguiente trabajo.",
 "values.communication.title":"Comunicación clara", "values.communication.desc":"Sin tecnicismos innecesarios: te explico cada decisión de diseño en un lenguaje que entiendas.", "values.results.title":"Resultados, no solo estética", "values.results.desc":"Cada diseño busca un objetivo medible: más conversiones, más tiempo en el sitio, más ventas.", "values.delivery.title":"Entrega puntual", "values.delivery.desc":"Los plazos que acordamos se cumplen. Si algo cambia, te aviso con anticipación.", "values.detail.title":"Cuidado por el detalle", "values.detail.desc":"Los pequeños detalles —espaciados, colores, microcopys— son los que hacen la diferencia.",
 "timeline.2023.title":"Inicios como freelancer", "timeline.2023.desc":"Comencé a tomar mis primeros proyectos de diseño web y marketing digital, fundando lo que hoy es JamsLab Studio.", "timeline.2024.title":"Certificaciones en diseño e IA", "timeline.2024.desc":"Completé certificaciones en Website Design, AI Technology for Business y Canva Design, ampliando mis herramientas de trabajo.", "timeline.2025.title":"Especialización en marketing y datos", "timeline.2025.desc":"Sumé Digital Marketing (HubSpot Academy) y Data Analytics (Databricks/Simplilearn) para tomar decisiones de diseño basadas en datos reales.", "timeline.2026.title":"De portafolio a estudio digital", "timeline.2026.desc":"JamsLab Studio se convierte en un espacio completo: servicios de diseño, marketing y una tienda de productos digitales listos para usar.",
 "contactpage.whatsapp":"WhatsApp", "contactpage.email":"Correo", "contactpage.call":"Llamada", "contactpage.fiverr":"Fiverr", "faq.1.q":"¿Cuánto tiempo toma un proyecto de sitio web?", "faq.1.a":"Depende del alcance: una landing page suele tomar de 5 a 7 días, mientras que un sitio completo puede tomar entre 2 y 4 semanas.", "faq.2.q":"¿Cómo funcionan los pagos?", "faq.2.a":"Trabajo con un adelanto del 50% para iniciar y el 50% restante contra entrega. Los productos de la tienda se coordinan por WhatsApp para gestionar el pago y la entrega.", "faq.3.q":"¿Ofreces soporte después de la entrega?", "faq.3.a":"Sí. Los planes de Sitio Web Completo y Marca + Marketing incluyen soporte post-lanzamiento; también ofrezco mantenimiento mensual por separado.", "faq.4.q":"¿Puedo pedir un proyecto que no está en los planes?", "faq.4.a":"Claro. Los planes son una guía de referencia — cuéntame tu idea y armamos una propuesta 100% a tu medida.", "faq.5.q":"¿Trabajas con clientes fuera de República Dominicana?", "faq.5.a":"Sí, trabajo de forma remota con clientes en cualquier parte del mundo, coordinando por videollamada, WhatsApp o correo.", "budget.1":"Presupuesto: menos de $200", "budget.2":"Presupuesto: $200 - $500", "budget.3":"Presupuesto: $500 - $1,000", "budget.4":"Presupuesto: más de $1,000"
});
Object.assign(translations.en, {
 "plans.per_project":"/ project", "plans.landing.title":"Landing Page", "plans.landing.desc":"Ideal for launching a product, service or specific campaign.", "plans.landing.f1":"1-page design (single long-form section)", "plans.landing.f2":"Responsive (mobile, tablet, desktop)", "plans.landing.f3":"Contact form", "plans.landing.f4":"Basic SEO optimization", "plans.landing.f5":"Admin dashboard",
 "plans.full.title":"Complete Website", "plans.full.desc":"A multi-page website to present your business professionally.", "plans.full.f1":"Up to 5 pages (Home, About, Services, Contact...)", "plans.full.f2":"100% custom design", "plans.full.f3":"Responsive + animations", "plans.full.f4":"On-page SEO + Google Analytics", "plans.full.f5":"1 month of post-launch support",
 "plans.brand.title":"Brand + Marketing", "plans.brand.desc":"Visual identity, website and content strategy to scale your brand.", "plans.brand.f1":"Everything in the Complete Website plan", "plans.brand.f2":"Logo design + brand guidelines", "plans.brand.f3":"1-month social media content plan", "plans.brand.f4":"Advanced SEO strategy", "plans.brand.f5":"Monthly follow-up meeting",
 "process.1.title":"Discovery", "process.1.desc":"We discuss your brand, goals, references and audience to understand what you really need.", "process.2.title":"Proposal & design", "process.2.desc":"I present a clear proposal for scope, timeline and investment, then start the visual design.", "process.3.title":"Development", "process.3.desc":"I build the website or marketing asset, reviewing it with you at each key stage.", "process.4.title":"Launch & support", "process.4.desc":"We publish your project and I support you afterward with adjustments and questions.",
 "aboutpage.bio1":"I grew up across French, Haitian and Dominican cultures, and that mix shapes how I understand design: as a bridge between what a brand wants to say and how people actually perceive it.", "aboutpage.bio2":"I started coding simple pages out of curiosity, and over time that curiosity became a career focused on web design (UI/UX), SEO optimization and data-driven marketing.", "aboutpage.bio3":"Away from the screen, I keep learning constantly: every certification, project and client teaches me something new that I carry into the next job.",
 "values.communication.title":"Clear communication", "values.communication.desc":"No unnecessary jargon: I explain every design decision in language you can understand.", "values.results.title":"Results, not just aesthetics", "values.results.desc":"Every design aims for a measurable goal: more conversions, more time on site, more sales.", "values.delivery.title":"On-time delivery", "values.delivery.desc":"We meet the deadlines we agree on. If something changes, I let you know in advance.", "values.detail.title":"Attention to detail", "values.detail.desc":"Small details —spacing, colors, microcopy— are what make the difference.",
 "timeline.2023.title":"Starting as a freelancer", "timeline.2023.desc":"I began taking my first web design and digital marketing projects, founding what is now JamsLab Studio.", "timeline.2024.title":"Design & AI certifications", "timeline.2024.desc":"I completed certifications in Website Design, AI Technology for Business and Canva Design, expanding my toolkit.", "timeline.2025.title":"Marketing & data specialization", "timeline.2025.desc":"I added Digital Marketing (HubSpot Academy) and Data Analytics (Databricks/Simplilearn) to make design decisions based on real data.", "timeline.2026.title":"From portfolio to digital studio", "timeline.2026.desc":"JamsLab Studio becomes a complete space for design, marketing and ready-to-use digital products.",
 "contactpage.whatsapp":"WhatsApp", "contactpage.email":"Email", "contactpage.call":"Call", "contactpage.fiverr":"Fiverr", "faq.1.q":"How long does a website project take?", "faq.1.a":"It depends on scope: a landing page usually takes 5 to 7 days, while a complete website can take 2 to 4 weeks.", "faq.2.q":"How do payments work?", "faq.2.a":"I work with a 50% deposit to start and the remaining 50% upon delivery. Store products are coordinated through WhatsApp to arrange payment and delivery.", "faq.3.q":"Do you offer support after delivery?", "faq.3.a":"Yes. The Complete Website and Brand + Marketing plans include post-launch support; I also offer separate monthly maintenance.", "faq.4.q":"Can I request a project that isn't in the plans?", "faq.4.a":"Absolutely. The plans are a reference guide — tell me your idea and we'll build a 100% tailored proposal.", "faq.5.q":"Do you work with clients outside the Dominican Republic?", "faq.5.a":"Yes. I work remotely with clients anywhere in the world, coordinating by video call, WhatsApp or email.", "budget.1":"Budget: under $200", "budget.2":"Budget: $200 - $500", "budget.3":"Budget: $500 - $1,000", "budget.4":"Budget: over $1,000"
});
Object.assign(translations.fr, {
 "plans.per_project":"/ projet", "plans.landing.title":"Landing Page", "plans.landing.desc":"Idéal pour lancer un produit, un service ou une campagne spécifique.", "plans.landing.f1":"Design d'une page (une seule section longue)", "plans.landing.f2":"Responsive (mobile, tablette, ordinateur)", "plans.landing.f3":"Formulaire de contact", "plans.landing.f4":"Optimisation SEO de base", "plans.landing.f5":"Tableau de bord d'administration",
 "plans.full.title":"Site Web Complet", "plans.full.desc":"Un site multipage pour présenter votre activité de manière professionnelle.", "plans.full.f1":"Jusqu'à 5 pages (Accueil, À propos, Services, Contact...)", "plans.full.f2":"Design 100 % personnalisé", "plans.full.f3":"Responsive + animations", "plans.full.f4":"SEO on-page + Google Analytics", "plans.full.f5":"1 mois de support après lancement",
 "plans.brand.title":"Marque + Marketing", "plans.brand.desc":"Identité visuelle, site web et stratégie de contenu pour développer votre marque.", "plans.brand.f1":"Tout le contenu du forfait Site Web Complet", "plans.brand.f2":"Création du logo + charte de marque", "plans.brand.f3":"Plan de contenu réseaux sociaux (1 mois)", "plans.brand.f4":"Stratégie SEO avancée", "plans.brand.f5":"Réunion mensuelle de suivi",
 "process.1.title":"Découverte", "process.1.desc":"Nous échangeons sur votre marque, vos objectifs, vos références et votre public pour comprendre vos vrais besoins.", "process.2.title":"Proposition et design", "process.2.desc":"Je vous présente une proposition claire sur le périmètre, les délais et l'investissement, puis nous commençons le design visuel.", "process.3.title":"Développement", "process.3.desc":"Je construis le site ou le support marketing, avec des validations à chaque étape clé.", "process.4.title":"Lancement et support", "process.4.desc":"Nous mettons votre projet en ligne et je vous accompagne ensuite pour les ajustements et questions.",
 "aboutpage.bio1":"J'ai grandi entre les cultures française, haïtienne et dominicaine, et ce mélange influence ma vision du design : un pont entre ce qu'une marque veut dire et la façon dont le public la perçoit réellement.", "aboutpage.bio2":"J'ai commencé à coder de simples pages par curiosité, puis cette curiosité est devenue une carrière axée sur le design web (UI/UX), l'optimisation SEO et le marketing fondé sur les données.", "aboutpage.bio3":"Loin de l'écran, je continue d'apprendre : chaque certification, chaque projet et chaque client m'apporte quelque chose de nouveau que j'intègre au travail suivant.",
 "values.communication.title":"Communication claire", "values.communication.desc":"Pas de jargon inutile : j'explique chaque décision de design dans un langage que vous comprenez.", "values.results.title":"Des résultats, pas seulement de l'esthétique", "values.results.desc":"Chaque design vise un objectif mesurable : plus de conversions, plus de temps sur le site, plus de ventes.", "values.delivery.title":"Livraison dans les délais", "values.delivery.desc":"Les délais convenus sont respectés. Si quelque chose change, je vous préviens à l'avance.", "values.detail.title":"Le souci du détail", "values.detail.desc":"Les petits détails —espacements, couleurs, microtextes— font toute la différence.",
 "timeline.2023.title":"Débuts en freelance", "timeline.2023.desc":"J'ai commencé à prendre mes premiers projets de design web et de marketing numérique, en fondant ce qui est aujourd'hui JamsLab Studio.", "timeline.2024.title":"Certifications en design et IA", "timeline.2024.desc":"J'ai obtenu des certifications en Website Design, AI Technology for Business et Canva Design, élargissant mes outils de travail.", "timeline.2025.title":"Spécialisation marketing et données", "timeline.2025.desc":"J'ai ajouté Digital Marketing (HubSpot Academy) et Data Analytics (Databricks/Simplilearn) pour prendre des décisions de design basées sur des données réelles.", "timeline.2026.title":"Du portfolio au studio numérique", "timeline.2026.desc":"JamsLab Studio devient un espace complet dédié au design, au marketing et aux produits numériques prêts à l'emploi.",
 "contactpage.whatsapp":"WhatsApp", "contactpage.email":"E-mail", "contactpage.call":"Appel", "contactpage.fiverr":"Fiverr", "faq.1.q":"Combien de temps prend un projet de site web ?", "faq.1.a":"Cela dépend du périmètre : une landing page prend généralement 5 à 7 jours, tandis qu'un site complet peut prendre 2 à 4 semaines.", "faq.2.q":"Comment fonctionnent les paiements ?", "faq.2.a":"Je demande un acompte de 50 % pour commencer et les 50 % restants à la livraison. Les produits de la boutique sont coordonnés via WhatsApp pour organiser le paiement et la livraison.", "faq.3.q":"Proposez-vous un support après la livraison ?", "faq.3.a":"Oui. Les forfaits Site Web Complet et Marque + Marketing incluent un support après lancement ; je propose également une maintenance mensuelle séparée.", "faq.4.q":"Puis-je demander un projet qui n'est pas dans les forfaits ?", "faq.4.a":"Bien sûr. Les forfaits sont un guide de référence — présentez-moi votre idée et nous préparerons une proposition 100 % sur mesure.", "faq.5.q":"Travaillez-vous avec des clients hors de République dominicaine ?", "faq.5.a":"Oui. Je travaille à distance avec des clients partout dans le monde, par visioconférence, WhatsApp ou e-mail.", "budget.1":"Budget : moins de 200 $", "budget.2":"Budget : 200 $ - 500 $", "budget.3":"Budget : 500 $ - 1 000 $", "budget.4":"Budget : plus de 1 000 $"
});

Object.assign(translations.es, {
 "store.add":"Agregar", "store.details":"Ver detalles", "store.added":"Agregado", "cms.view_project":"Ver proyecto", "cart.title":"Tu carrito", "cart.total":"Total", "cart.checkout":"Finalizar por WhatsApp", "footer.privacy":"Privacidad", "footer.terms":"Términos", "footer.cookies":"Cookies", "footer.help":"Centro de ayuda", "cart.empty":"Tu carrito está vacío.", "cart.empty_hint":"Explora la tienda y agrega tus productos favoritos.", "cart.item_remove":"Eliminar", "contact.project_type":"¿Qué tipo de proyecto es?", "contactpage.modal_desc":"El mensaje se guarda de forma segura y puedes continuar enviándolo directamente por WhatsApp con un clic."
});
Object.assign(translations.en, {
 "store.add":"Add", "store.details":"View details", "store.added":"Added", "cms.view_project":"View project", "cart.title":"Your cart", "cart.total":"Total", "cart.checkout":"Checkout via WhatsApp", "footer.privacy":"Privacy", "footer.terms":"Terms", "footer.cookies":"Cookies", "footer.help":"Help Center", "cart.empty":"Your cart is empty.", "cart.empty_hint":"Explore the store and add your favorite products.", "cart.item_remove":"Remove", "contact.project_type":"What type of project is it?", "contactpage.modal_desc":"Your message is stored securely, and you can continue by sending it directly through WhatsApp with one click."
});
Object.assign(translations.fr, {
 "store.add":"Ajouter", "store.details":"Voir les détails", "store.added":"Ajouté", "cms.view_project":"Voir le projet", "cart.title":"Votre panier", "cart.total":"Total", "cart.checkout":"Finaliser via WhatsApp", "footer.privacy":"Confidentialité", "footer.terms":"Conditions", "footer.cookies":"Cookies", "footer.help":"Centre d’aide", "cart.empty":"Votre panier est vide.", "cart.empty_hint":"Explorez la boutique et ajoutez vos produits préférés.", "cart.item_remove":"Supprimer", "contact.project_type":"Quel type de projet est-ce ?", "contactpage.modal_desc":"Votre message est enregistré en toute sécurité et vous pouvez continuer en l'envoyant directement via WhatsApp en un clic."
});

Object.assign(translations.es, {
 "page.title.home":"Jamsle Porcena · Portafolio Web & Marketing", "page.title.services":"Servicios · Jamsle Porcena", "page.title.about":"Sobre mí · Jamsle Porcena", "page.title.contact":"Contacto · Jamsle Porcena", "page.title.store":"Tienda · Productos Digitales · Jamsle Porcena",
 "footer.tagline":"· Diseño web & Marketing Digital"
});
Object.assign(translations.en, {
 "page.title.home":"Jamsle Porcena · Web & Marketing Portfolio", "page.title.services":"Services · Jamsle Porcena", "page.title.about":"About me · Jamsle Porcena", "page.title.contact":"Contact · Jamsle Porcena", "page.title.store":"Store · Digital Products · Jamsle Porcena", "footer.tagline":"· Web Design & Digital Marketing"
});
Object.assign(translations.fr, {
 "page.title.home":"Jamsle Porcena · Portfolio Web & Marketing", "page.title.services":"Services · Jamsle Porcena", "page.title.about":"À propos · Jamsle Porcena", "page.title.contact":"Contact · Jamsle Porcena", "page.title.store":"Boutique · Produits numériques · Jamsle Porcena", "footer.tagline":"· Design web & Marketing numérique"
});

Object.assign(translations.es, {"contactpage.send_whatsapp":"Enviar por WhatsApp","services.whatsapp":"Hablemos por WhatsApp"});
Object.assign(translations.en, {"contactpage.send_whatsapp":"Send via WhatsApp","services.whatsapp":"Talk on WhatsApp"});
Object.assign(translations.fr, {"contactpage.send_whatsapp":"Envoyer par WhatsApp","services.whatsapp":"Parler sur WhatsApp"});

Object.assign(translations.es,{"services.contact_link":"Ir a Contacto"});
Object.assign(translations.en,{"services.contact_link":"Go to Contact"});
Object.assign(translations.fr,{"services.contact_link":"Aller au contact"});

Object.assign(translations.es,{"contact.error":"No se pudo enviar el mensaje. Inténtalo de nuevo."});
Object.assign(translations.en,{"contact.error":"The message could not be sent. Please try again."});
Object.assign(translations.fr,{"contact.error":"Le message n'a pas pu être envoyé. Veuillez réessayer."});

function jpT(key, fallback = key) {
    return (translations[currentLang] && translations[currentLang][key]) || (translations.es[key]) || fallback;
}

// ----- CAMBIO DE IDIOMA -----
let currentLang = 'es';


Object.assign(translations.es, {
    "page.description.home": "Diseño web, UI/UX y marketing digital de Jamsle Porcena. Portafolio de proyectos, servicios y soluciones digitales.",
    "page.description.services": "Servicios de diseño web, UI/UX, desarrollo, SEO y marketing digital de Jamsle Porcena.",
    "page.description.about": "Conoce a Jamsle Porcena, diseñador web y especialista en marketing digital, UI/UX e inteligencia artificial.",
    "page.description.contact": "Contacta a Jamsle Porcena para proyectos de diseño web, UI/UX, desarrollo y marketing digital.",
    "page.description.store": "Tienda de productos y recursos digitales de Jamsle Porcena."
});
Object.assign(translations.en, {
    "page.description.home": "Web design, UI/UX and digital marketing by Jamsle Porcena. Portfolio of projects, services and digital solutions.",
    "page.description.services": "Web design, UI/UX, development, SEO and digital marketing services by Jamsle Porcena.",
    "page.description.about": "Meet Jamsle Porcena, a web designer and digital marketing specialist focused on UI/UX and AI.",
    "page.description.contact": "Contact Jamsle Porcena for web design, UI/UX, development and digital marketing projects.",
    "page.description.store": "Digital products and resources store by Jamsle Porcena."
});
Object.assign(translations.fr, {
    "page.description.home": "Design web, UI/UX et marketing digital par Jamsle Porcena. Portfolio de projets, services et solutions digitales.",
    "page.description.services": "Services de design web, UI/UX, développement, SEO et marketing digital par Jamsle Porcena.",
    "page.description.about": "Découvrez Jamsle Porcena, designer web et spécialiste du marketing digital, de l’UI/UX et de l’IA.",
    "page.description.contact": "Contactez Jamsle Porcena pour vos projets de design web, UI/UX, développement et marketing digital.",
    "page.description.store": "Boutique de produits et ressources numériques de Jamsle Porcena."
});

function setLanguage(lang) {
    if (!translations[lang]) lang = 'es';
    currentLang = lang;
    document.documentElement.lang = lang;
    const path = location.pathname.toLowerCase();
    const titleKey = path.endsWith('servicios.html') ? 'page.title.services' : path.endsWith('sobre-mi.html') ? 'page.title.about' : path.endsWith('contacto.html') ? 'page.title.contact' : path.endsWith('tienda.html') ? 'page.title.store' : path.endsWith('privacy.html') ? 'page.title.privacy' : path.endsWith('terms.html') ? 'page.title.terms' : path.endsWith('cookies.html') ? 'page.title.cookies' : path.endsWith('help.html') ? 'page.title.help' : 'page.title.home';
    document.title = jpT(titleKey, document.title);
    const descriptionKey = path.endsWith('servicios.html') ? 'page.description.services' : path.endsWith('sobre-mi.html') ? 'page.description.about' : path.endsWith('contacto.html') ? 'page.description.contact' : path.endsWith('tienda.html') ? 'page.description.store' : path.endsWith('privacy.html') ? 'page.description.privacy' : path.endsWith('terms.html') ? 'page.description.terms' : path.endsWith('cookies.html') ? 'page.description.cookies' : path.endsWith('help.html') ? 'page.description.help' : 'page.description.home';
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) descriptionMeta.setAttribute('content', jpT(descriptionKey, descriptionMeta.getAttribute('content') || ''));
    document.querySelectorAll('.lang-selector button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    document.querySelectorAll('[data-i18n-prefix]').forEach(el => {
        const key = el.dataset.i18nPrefix;
        const value = jpT(key);
        if (el.firstChild && el.firstChild.nodeType === Node.TEXT_NODE && value && value !== key) {
            el.firstChild.nodeValue = value;
        }
    });
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const value = jpT(key);
        if (value && value !== key) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        const value = jpT(key);
        if (value && value !== key) el.placeholder = value;
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
        const key = el.dataset.i18nAriaLabel;
        const value = jpT(key);
        if (value && value !== key) el.setAttribute('aria-label', value);
    });
    localStorage.setItem('jp_lang', lang);
    window.dispatchEvent(new CustomEvent('jp-language-changed', { detail: lang }));
    if (typeof window.applyContentOverrides === 'function') window.applyContentOverrides();
}

// NOTA: el cambio de idioma, el menú hamburguesa y el efecto de scroll del
// nav ahora se manejan desde common.js (compartido por todas las páginas).
// Aquí solo dejamos las traducciones y la función setLanguage() que common.js
// invoca automáticamente al cargar la página.

// ----- SCROLL SUAVE PARA ENLACES INTERNOS (por si el navegador no lo soporta) -----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('🚀 Portafolio de Jamsle Porcena - Todos los sistemas operativos.');
console.log('📧 porcenatjamsle07@gmail.com');

/* v8 — Legal/help pages: complete body + navigation translations. */
window.LEGAL_CONTENT = {
  es:{
    'privacy.html':{title:'Política de privacidad · Jamsle Porcena',desc:'Información sobre los datos que se recopilan y cómo se utilizan.'},
    'terms.html':{title:'Términos de uso · Jamsle Porcena',desc:'Condiciones generales para el uso del sitio y la contratación de servicios.'},
    'cookies.html':{title:'Política de cookies · Jamsle Porcena',desc:'Cómo utiliza este sitio almacenamiento local y tecnologías similares.'},
    'help.html':{title:'Centro de ayuda · Jamsle Porcena',desc:'Ayuda para encontrar servicios, proyectos, tienda y contacto.'}
  },
  en:{
    'privacy.html':{title:'Privacy Policy · Jamsle Porcena',desc:'Information about data collected and how it is used.'},
    'terms.html':{title:'Terms of Use · Jamsle Porcena',desc:'General conditions for using the site and hiring services.'},
    'cookies.html':{title:'Cookie Policy · Jamsle Porcena',desc:'How this site uses local storage and similar technologies.'},
    'help.html':{title:'Help Center · Jamsle Porcena',desc:'Help finding services, projects, store, contact and payments.'}
  },
  fr:{
    'privacy.html':{title:'Politique de confidentialité · Jamsle Porcena',desc:'Informations sur les données collectées et leur utilisation.'},
    'terms.html':{title:"Conditions d'utilisation · Jamsle Porcena",desc:"Conditions générales d'utilisation du site et de commande de services."},
    'cookies.html':{title:'Politique relative aux cookies · Jamsle Porcena',desc:'Utilisation du stockage local et de technologies similaires.'},
    'help.html':{title:"Centre d'aide · Jamsle Porcena",desc:'Aide pour trouver les services, projets, boutique et contact.'}
  }
};
window.applyLegalLanguage = function(){
 const file=location.pathname.split('/').pop(); const lang=(typeof currentLang!=='undefined'?currentLang:(localStorage.getItem('jp_lang')||'es'));
 if(!window.LEGAL_CONTENT[lang]?.[file]) return;
 const data=window.LEGAL_CONTENT[lang][file]; document.title=data.title; const meta=document.querySelector('meta[name="description"]'); if(meta)meta.content=data.desc;
 const nav={es:['Inicio','Sobre mí','Servicios','Tienda','Contacto'],en:['Home','About','Services','Store','Contact'],fr:['Accueil','À propos','Services','Boutique','Contact']};
 document.querySelectorAll('.nav-links a').forEach((a,i)=>{if(nav[lang]?.[i])a.textContent=nav[lang][i];});
 const footNav=lang==='fr'?['Accueil','À propos','Services','Boutique de produits','Confidentialité','Conditions','Cookies','Centre d’aide']:lang==='en'?['Home','About','Services','Store products','Privacy','Terms','Cookies','Help Center']:['Inicio','Sobre mí','Servicios','Tienda de productos','Privacidad','Términos','Cookies','Centro de ayuda'];
 document.querySelectorAll('footer ul a').forEach((a,i)=>{if(footNav[i])a.textContent=footNav[i];});
 const legal={
  es:{privacy:['Política de privacidad','Responsable del sitio: Jamsle Porcena','Contacto: porcenatjamsle07@gmail.com · +1 (809) 999-59-04','Datos que podemos recibir','Cuando envías un formulario podemos recibir tu nombre, correo, asunto, tipo de proyecto, presupuesto y mensaje. Cuando realizas un pedido podemos recibir los datos necesarios para gestionar la solicitud y los productos seleccionados.','Finalidad','Usamos estos datos para responder consultas, gestionar pedidos, prestar servicios, mejorar el sitio y mantener registros operativos.','Analítica','El sitio registra eventos técnicos de navegación mediante un identificador de sesión generado en el navegador. No se almacena la dirección IP en nuestra tabla de analítica.','Servicios externos','El sitio puede utilizar Supabase para almacenamiento y WhatsApp para comunicación cuando el visitante elige ese canal. Cada servicio procesa información conforme a sus propias políticas.','Conservación y derechos','Conservamos la información durante el tiempo razonablemente necesario para atender la relación o cumplir obligaciones aplicables. Puedes solicitar acceso, corrección o eliminación escribiendo al correo de contacto.'],
  terms:['Términos de uso','Uso del sitio','El contenido del sitio se ofrece para informar sobre servicios, proyectos y productos de Jamsle Porcena. No está permitido utilizarlo de forma fraudulenta o para vulnerar derechos de terceros.','Servicios','El alcance, precio, plazos, revisiones y entregables de cada proyecto se acuerdan con el cliente antes de iniciar el trabajo. Los textos de la web no sustituyen una propuesta o contrato específico.','Productos y pagos','Los productos de la tienda pueden solicitarse por WhatsApp para coordinar el pedido y el pago. Un pedido se considera confirmado cuando el pago o las condiciones acordadas hayan sido verificadas.','Propiedad intelectual','Los elementos del portafolio y los materiales propios del sitio no pueden copiarse, revenderse o reutilizarse sin autorización, salvo los recursos de terceros sujetos a sus respectivas licencias.','Contacto','Para dudas sobre un pedido o servicio, utiliza Contacto o el canal de WhatsApp indicado en el sitio.'],
  cookies:['Política de cookies','Este sitio prioriza tecnologías esenciales para que sus funciones trabajen correctamente.','Almacenamiento local','El carrito y la preferencia de idioma pueden guardarse en el almacenamiento local del navegador. Esto permite conservar el carrito y recordar el idioma entre páginas.','Cookies de terceros','Algunos recursos externos, como fuentes, iconos o contenido integrado, pueden aplicar sus propias tecnologías según su configuración. El sitio no utiliza estas tecnologías para crear perfiles publicitarios propios.','Preferencias','Puedes borrar el almacenamiento local y las cookies desde la configuración de tu navegador. Algunas funciones, como el carrito o el idioma guardado, podrían reiniciarse.'],
  help:['Centro de ayuda','¿Qué estás buscando?','Servicios','Consulta planes, precios y formas de solicitar un proyecto.','Tienda','Explora productos digitales, agrégalos al carrito y continúa por WhatsApp.','Contacto','Envía una consulta o inicia una conversación directa.','Navegación','Usa el menú del sitio para encontrar rápidamente cada sección.','Pedidos','El carrito permite preparar tu pedido y continuar por WhatsApp para coordinar el pago.','¿No encuentras algo?','Escríbeme y te ayudaré a encontrar la información correcta.']},
  en:{privacy:['Privacy Policy','Site operator: Jamsle Porcena','Contact: porcenatjamsle07@gmail.com · +1 (809) 999-59-04','Data we may receive','When you submit a form we may receive your name, email, subject, project type, budget and message. When you place an order we may receive the information needed to manage the request and selected products.','Purpose','We use this data to answer inquiries, manage orders, provide services, improve the site and maintain operational records.','Analytics','The site records technical navigation events using a browser-generated session identifier. The analytics table does not store the IP address.','External services','The site may use Supabase for database and WhatsApp for communication when visitors choose that channel. Each service follows its own policies.','Retention and rights','We retain information for as long as reasonably necessary to manage the relationship or meet applicable obligations. You can request access, correction or deletion by contacting us.'],
  terms:['Terms of Use','Site use','The site content is provided to explain Jamsle Porcena services, projects and products. Fraudulent use or infringement of third-party rights is prohibited.','Services','Scope, price, timelines, revisions and deliverables are agreed with the client before work begins. Website text does not replace a specific proposal or contract.','Products and payments','Store products can be requested through WhatsApp to coordinate the order and payment. An order is confirmed once payment or agreed conditions have been verified.','Intellectual property','Portfolio elements and original site materials may not be copied, resold or reused without authorization, except third-party resources under their own licenses.','Contact','For questions about an order or service, use Contact or the WhatsApp channel shown on the site.'],
  cookies:['Cookie Policy','This site prioritizes essential technologies needed for its functions.','Local storage','The cart and language preference may be stored in browser local storage so the cart and language can persist between pages.','Third-party cookies','External resources such as fonts, icons or embedded content may apply their own technologies. The site does not use them to build its own advertising profiles.','Preferences','You can clear local storage and cookies in your browser settings. Some functions, such as the cart or saved language, may reset.'],
  help:['Help Center','What are you looking for?','Services','View plans, prices and ways to request a project.','Store','Explore digital products, add them to the cart and continue through WhatsApp.','Contact','Send an inquiry or start a direct conversation.','Navigation','Use the site menu to quickly find each section.','Orders','The cart lets you prepare your order and continue through WhatsApp to coordinate payment.','Can’t find something?','Send me a message and I will help you find the right information.']},
  fr:{privacy:['Politique de confidentialité','Responsable du site : Jamsle Porcena','Contact : porcenatjamsle07@gmail.com · +1 (809) 999-59-04','Données que nous pouvons recevoir','Lorsque vous envoyez un formulaire, nous pouvons recevoir votre nom, e-mail, sujet, type de projet, budget et message. Lors d’une commande, nous pouvons recevoir les informations nécessaires à son traitement et aux produits sélectionnés.','Finalité','Nous utilisons ces données pour répondre aux demandes, gérer les commandes, fournir les services, améliorer le site et conserver les registres opérationnels.','Analytique','Le site enregistre des événements techniques de navigation avec un identifiant de session généré dans le navigateur. L’adresse IP n’est pas stockée dans la table analytique.','Services externes','Le site peut utiliser Supabase pour la base de données et WhatsApp lorsque le visiteur choisit ce canal. Chaque service applique ses propres règles.','Conservation et droits','Nous conservons les informations pendant la durée raisonnablement nécessaire. Vous pouvez demander l’accès, la correction ou la suppression via l’adresse de contact.'],
  terms:["Conditions d’utilisation",'Utilisation du site','Le contenu du site présente les services, projets et produits de Jamsle Porcena. Toute utilisation frauduleuse ou atteinte aux droits de tiers est interdite.','Services','Le périmètre, le prix, les délais, les révisions et les livrables sont convenus avec le client avant le début du travail. Le texte du site ne remplace pas un devis ou contrat spécifique.','Produits et paiements','Les produits de la boutique peuvent être demandés via WhatsApp pour coordonner la commande et le paiement. Une commande est confirmée après vérification du paiement ou des conditions convenues.','Propriété intellectuelle','Les éléments du portfolio et les contenus originaux du site ne peuvent être copiés, revendus ou réutilisés sans autorisation, sauf ressources tierces soumises à leurs licences.','Contact','Pour toute question, utilisez Contact ou le canal WhatsApp indiqué sur le site.'],
  cookies:['Politique relative aux cookies','Le site privilégie les technologies essentielles à son fonctionnement.','Stockage local','Le panier et la préférence de langue peuvent être conservés dans le stockage local du navigateur.','Cookies tiers','Des ressources externes comme les polices, icônes ou contenus intégrés peuvent appliquer leurs propres technologies. Le site ne les utilise pas pour créer ses propres profils publicitaires.','Préférences','Vous pouvez supprimer le stockage local et les cookies dans les réglages de votre navigateur. Certaines fonctions peuvent alors être réinitialisées.'],
  help:["Centre d’aide",'Que recherchez-vous ?','Services','Consultez les forfaits, les prix et les moyens de demander un projet.','Boutique','Explorez les produits numériques, ajoutez-les au panier et continuez via WhatsApp.','Contact','Envoyez une demande ou démarrez une conversation directe.','Navigation','Utilisez le menu du site pour trouver rapidement chaque section.','Commandes','Le panier permet de préparer votre commande et de continuer via WhatsApp pour coordonner le paiement.','Vous ne trouvez pas quelque chose ?','Écrivez-moi et je vous aiderai à trouver la bonne information.']}
 };
 const arr=legal[lang]?.[file]; if(!arr) return;
 const main=document.querySelector('main .section-header'); if(!main) return;
 if(file==='privacy.html'||file==='terms.html'||file==='cookies.html'){main.innerHTML=arr.map((v,i)=>i===0?`<h1>${v}</h1>`:i%2===1?`<p>${v}</p>`:`<h2>${v}</h2>`).join('')+`<p><em>${lang==='fr'?'Cette page fournit des informations générales et ne remplace pas un avis juridique.':lang==='en'?'This page is general information and does not replace legal advice.':'Esta página es información general y no sustituye asesoramiento jurídico.'}</em></p>`;}
 else {main.innerHTML=`<h1>${arr[0]}</h1><p>${arr[1]}</p><div class="values-grid"><div class="value-card"><i class="fas fa-briefcase"></i><h3>${arr[2]}</h3><p>${arr[3]}</p><a class="btn-secondary" href="servicios.html">${lang==='fr'?'Voir les services':lang==='en'?'View services':'Ver servicios'}</a></div><div class="value-card"><i class="fas fa-store"></i><h3>${arr[4]}</h3><p>${arr[5]}</p><a class="btn-secondary" href="tienda.html">${lang==='fr'?'Ouvrir la boutique':lang==='en'?'Open store':'Abrir tienda'}</a></div><div class="value-card"><i class="fas fa-envelope"></i><h3>${arr[6]}</h3><p>${arr[7]}</p><a class="btn-secondary" href="contacto.html">${lang==='fr'?'Contacter':lang==='en'?'Contact':'Contactar'}</a></div><div class="value-card"><i class="fas fa-robot"></i><h3>${arr[8]}</h3><p>${arr[9]}</p></div></div><h2>${arr[10]}</h2><p>${arr[11]}</p><h2>${arr[12]}</h2><p>${arr[13]}</p>`;}
};
const _oldSetLanguage=setLanguage; setLanguage=function(lang){_oldSetLanguage(lang); window.applyLegalLanguage?.();};

Object.assign(translations.es,{"page.title.privacy":"Privacidad · Jamsle Porcena","page.title.terms":"Términos · Jamsle Porcena","page.title.cookies":"Cookies · Jamsle Porcena","page.title.help":"Centro de ayuda · Jamsle Porcena","page.description.privacy":"Política de privacidad de Jamsle Porcena.","page.description.terms":"Términos de uso de Jamsle Porcena.","page.description.cookies":"Política de cookies de Jamsle Porcena.","page.description.help":"Centro de ayuda de Jamsle Porcena."});
Object.assign(translations.en,{"page.title.privacy":"Privacy · Jamsle Porcena","page.title.terms":"Terms · Jamsle Porcena","page.title.cookies":"Cookies · Jamsle Porcena","page.title.help":"Help Center · Jamsle Porcena","page.description.privacy":"Jamsle Porcena privacy policy.","page.description.terms":"Jamsle Porcena terms of use.","page.description.cookies":"Jamsle Porcena cookie policy.","page.description.help":"Jamsle Porcena help center."});
Object.assign(translations.fr,{"page.title.privacy":"Confidentialité · Jamsle Porcena","page.title.terms":"Conditions · Jamsle Porcena","page.title.cookies":"Cookies · Jamsle Porcena","page.title.help":"Centre d’aide · Jamsle Porcena","page.description.privacy":"Politique de confidentialité de Jamsle Porcena.","page.description.terms":"Conditions d’utilisation de Jamsle Porcena.","page.description.cookies":"Politique relative aux cookies de Jamsle Porcena.","page.description.help":"Centre d’aide de Jamsle Porcena."});
