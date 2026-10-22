// Inicializar AOS (Animate On Scroll)
if (window.AOS && typeof window.AOS.init === 'function') {
    AOS.init({
        duration: 800,
        once: false,
        mirror: true
    });
}

/* ===== CMS content overrides (owner-editable without changing design) ===== */
window.applyContentOverrides = function () {
    const overrides = window.portfolioContentOverrides || {};
    const file = (location.pathname.split('/').pop() || 'index.html') || 'index.html';
    const lang = (typeof currentLang !== 'undefined' ? currentLang : (localStorage.getItem('jp_lang') || 'es'));
    const values = overrides?.[file]?.[lang] || {};
    Object.entries(values).forEach(([key, value]) => {
        document.querySelectorAll(`[data-i18n="${CSS.escape(key)}"]`).forEach(el => {
            el.innerHTML = String(value ?? '');
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
        "hero.greeting": "Diseño y Estrategia",
        "hero.name": "para tu Marca",
        "hero.description": "Soluciones digitales de alto impacto. Combino diseño, tecnología e IA para hacer crecer tu negocio.",
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
        "proj4.title": "Sabor Urbano · E-commerce conceptual",
        "proj4.desc": "Demo premium para cafetería de especialidad. Interfaz minimalista con efecto glass, carrito funcional, filtros por categoría y sistema de múltiples idiomas integrado.",
        "proj4.result": "Experiencia de usuario fluida y diseño de vanguardia",
        "proj5.title": "Aetheris · Landing page interactiva",
        "proj5.desc": "Experiencia web inmersiva para una marca de computación espacial. Interfaz con efecto glass, animaciones 3D fluidas con Three.js, scroll suave con Lenis y diseño futurista.",
        "proj5.result": "Interactividad 3D y experiencia de usuario de vanguardia",
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
        "hero.greeting": "Design and Strategy",
        "hero.name": "for your Brand",
        "hero.description": "High-impact digital solutions. I combine design, technology, and AI to grow your business.",
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
        "proj4.title": "Sabor Urbano · Conceptual e-commerce",
        "proj4.desc": "Premium demo for a specialty coffee shop. Minimalist interface with glass effect, functional cart, category filters and integrated multilingual system.",
        "proj4.result": "Smooth user experience and cutting-edge design",
        "proj5.title": "Aetheris · Interactive Landing Page",
        "proj5.desc": "Immersive web experience for a spatial computing brand. Glass-effect interface, fluid 3D animations with Three.js, smooth scrolling with Lenis and futuristic design.",
        "proj5.result": "3D interactivity and cutting-edge user experience",
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
        "hero.greeting": "Design et Stratégie",
        "hero.name": "pour votre Marque",
        "hero.description": "Solutions numériques à fort impact. Je combine design, technologie et IA pour faire croître votre entreprise.",
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
        "proj4.title": "Sabor Urbano · E-commerce conceptuel",
        "proj4.desc": "Démo premium pour un café de spécialité. Interface minimaliste avec effet verre, panier fonctionnel, filtres par catégorie et système multilingue intégré.",
        "proj4.result": "Expérience utilisateur fluide et design avant-gardiste",
        "proj5.title": "Aetheris · Landing page interactive",
        "proj5.desc": "Expérience web immersive pour une marque de informatique spatiale. Interface avec effet verre, animations 3D fluides avec Three.js, défilement fluide avec Lenis et design futuriste.",
        "proj5.result": "Interactivité 3D et expérience utilisateur de pointe",
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
    },
    pt: {
        "nav.home": "Início",
        "nav.about": "Sobre mim",
        "nav.skills": "Habilidades",
        "nav.services": "Serviços",
        "nav.store": "Loja",
        "nav.projects": "Projetos",
        "nav.testimonials": "Depoimentos",
        "nav.contact": "Fale comigo",
        "hero.subtitle": "Web Design · Marketing Digital",
        "hero.greeting": "Design e Estratégia",
        "hero.name": "para sua Marca",
        "hero.description": "Soluções digitais de alto impacto. Combino design, tecnologia e IA para fazer crescer o seu negócio.",
        "hero.btn_projects": "Ver projetos",
        "hero.btn_contact": "Vamos conversar",
        "hero.stat_years": "Anos de experiência",
        "hero.stat_projects": "Projetos realizados",
        "hero.stat_certs": "Certificações",
        "about.label": "Conheça-me",
        "about.title": "Design + Estratégia = Impacto",
        "about.subtitle": "Minha abordagem vai além do estético: construo experiências digitais que conectam e geram resultados.",
        "about.heading": "Apaixonado pela criação digital",
        "about.p1": "Sou um criador digital com experiência em design web (UI/UX), otimização SEO e marketing baseado em dados. Ajudo empresas e empreendedores a construir uma identidade digital forte, funcional e memorável.",
        "about.specialty_label": "Especialidade:",
        "about.specialty_text": "Landing pages otimizadas, CMS (WordPress/Webflow), pesquisa UX e edição com IA.",
        "about.lang_fr": "Francês",
        "about.lang_fr_level": "Nativo",
        "about.lang_ht": "Crioulo",
        "about.lang_ht_level": "Nativo",
        "about.lang_es": "Espanhol",
        "about.lang_es_level": "Fluente",
        "about.lang_en": "Inglês",
        "about.lang_en_level": "Intermediário-Avançado",
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
        "skills.label": "Experiência técnica",
        "skills.title": "Minhas ferramentas",
        "skills.subtitle": "Do design e desenvolvimento à estratégia digital e análise de dados.",
        "skill.responsive": "Design Responsivo",
        "skill.ux": "Pesquisa UX",
        "skill.landing": "Landing Pages",
        "skill.cms": "Gestão de CMS",
        "skill.ai": "IA & Edição",
        "projects.label": "Portfólio",
        "projects.title": "Projetos em destaque",
        "projects.subtitle": "Casos de sucesso onde o design e a estratégia digital fizeram a diferença.",
        "proj1.title": "Santo Sabor · Redesign de identidade",
        "proj1.desc": "Redesign de identidade digital para marca local. Experiência web moderna, funcional e visualmente impactante. Função: UI/UX Designer & Web Developer.",
        "proj1.result": "+40% de tempo de permanência · melhoria na conversão",
        "proj2.title": "StudyFlow AI · App educacional",
        "proj2.desc": "Aplicativo educacional impulsionado por IA para tornar o aprendizado mais organizado, intuitivo e personalizado. Arquitetura de informação, UI/UX e prototipagem.",
        "proj2.result": "Aprendizado personalizado com IA",
        "proj3.title": "Burger King · Redesign conceitual",
        "proj3.desc": "Redesign conceitual de interface web para o Burger King, focado em uma experiência moderna, visualmente atraente e centrada em produtos.",
        "proj3.result": "Experiência moderna e atraente",
        "proj4.title": "Sabor Urbano · E-commerce conceitual",
        "proj4.desc": "Demo premium para cafeteria de especialidade. Interface minimalista com efeito glass, carrinho funcional, filtros por categoria e sistema multilíngue integrado.",
        "proj4.result": "Experiência de usuário fluida e design de vanguarda",
        "proj5.title": "Aetheris · Landing page interativa",
        "proj5.desc": "Experiência web imersiva para uma marca de computação espacial. Interface com efeito glass, animações 3D fluidas com Three.js, scroll suave com Lenis e design futurista.",
        "proj5.result": "Interatividade 3D e experiência de usuário de vanguarda",
        "testimonials.label": "Depoimentos",
        "testimonials.title": "O que dizem meus clientes",
        "testimonials.subtitle": "Pessoas e empresas que confiaram em mim para impulsionar sua presença digital.",
        "testimonial1.text": "\"Jamsle transformou completamente nosso site. O design é impecável e nossas vendas online dispararam. Muito profissional e atento a cada detalhe.\"",
        "testimonial1.name": "María Gómez",
        "testimonial1.role": "Diretora da EcoGreen",
        "testimonial2.text": "\"Excelente trabalho no redesign do nosso spa. O novo site é moderno, rápido e aumentou significativamente as reservas. Altamente recomendado.\"",
        "testimonial2.name": "Carlos Pérez",
        "testimonial2.role": "Gerente do Bella Vista Spa",
        "testimonial3.text": "\"A estratégia de SEO da Jamsle levou nosso blog ao topo do Google. O tráfego orgânico cresceu mais de 120% em poucos meses. Um verdadeiro especialista.\"",
        "testimonial3.name": "Laura Díaz",
        "testimonial3.role": "Fundadora da TechLab RD",
        "certs.label": "Formação contínua",
        "certs.title": "Certificações",
        "contact.label": "Vamos conectar",
        "contact.title": "Vamos falar sobre o seu próximo projeto?",
        "contact.subtitle": "Estou a uma mensagem de distância. Conte-me a sua ideia e vamos torná-la realidade.",
        "contact.info_title": "Informações de contato",
        "contact.info_desc": "Você pode me escrever por qualquer um destes meios ou através das minhas redes profissionais.",
        "contact.form_name": "Nome completo",
        "contact.form_email": "E-mail",
        "contact.form_subject": "Assunto",
        "contact.form_message": "Conte-me sobre o seu projeto...",
        "contact.form_submit": "Enviar mensagem",
        "footer.tagline": "Design web & Marketing Digital"
    }
};

/* Traducciones extra (Se mantienen intactas) */
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

Object.assign(translations.pt, {
    "nav.contact_short": "Contato",
    "services.hero_label": "Serviços",
    "services.hero_title_prefix": "Soluções digitais sob medida para a sua ",
    "services.hero_title_highlight": "marca",
    "services.hero_title": "Soluções digitais sob medida para a sua marca",
    "services.hero_desc": "Design web, marketing digital e estratégia de marca em pacotes claros, ou feitos completamente sob medida para você.",
    "services.plans_label": "Planos",
    "services.plans_title": "Escolha o pacote ideal para você",
    "services.plans_desc": "Preços de referência em dólares (USD). Cada projeto é ajustado conforme escopo, prazos e conteúdo.",
    "services.request": "Solicitar",
    "services.popular": "Mais escolhido",
    "services.custom_prefix": "Precisa de algo diferente?",
    "services.custom_link": "Conte-me sobre seu projeto",
    "services.custom_suffix": "e montamos uma proposta sob medida.",
    "services.process_label": "Como trabalhamos",
    "services.process_title": "Da ideia ao lançamento",
    "services.process_desc": "Um processo simples e transparente, pensado para que você saiba sempre em qual etapa está seu projeto.",
    "services.cta_title": "Pronto para começar seu projeto?",
    "services.cta_desc": "Escreva para mim e conversemos sobre como levar sua marca ao próximo nível.",
    "services.view": "Ver serviços",
    "aboutpage.hero_label": "Minha história",
    "aboutpage.hero_title_prefix": "Por trás de cada design existe uma ",
    "aboutpage.hero_title_highlight": "história",
    "aboutpage.hero_title": "Por trás de cada design existe uma história",
    "aboutpage.hero_desc": "Sou Jamsle Porcena: designer web, especialista em marketing digital e, acima de tudo, alguém apaixonado por ajudar marcas a encontrar sua voz digital.",
    "aboutpage.bio_title": "Do Caribe ao mundo digital",
    "aboutpage.values_label": "Como trabalho",
    "aboutpage.values_title": "Os valores por trás de cada projeto",
    "aboutpage.timeline_label": "Trajetória",
    "aboutpage.timeline_title": "Meu caminho até hoje",
    "aboutpage.cta_title": "Vamos conectar?",
    "aboutpage.cta_desc": "Adoraria conhecer seu projeto e ver como posso ajudar a torná-lo realidade.",
    "contactpage.hero_label": "Vamos conectar",
    "contactpage.hero_title_prefix": "Vamos falar sobre o seu ",
    "contactpage.hero_title_highlight": "próximo projeto",
    "contactpage.hero_title": "Vamos falar sobre o seu próximo projeto",
    "contactpage.hero_desc": "Escolha o canal que preferir. Normalmente respondo em menos de 24 horas.",
    "contactpage.form_title": "Conte-me sobre seu projeto",
    "contactpage.form_desc": "Quanto mais detalhes você me der, mais rápido poderei preparar uma proposta ajustada ao que você precisa.",
    "contactpage.faq_label": "Perguntas frequentes",
    "contactpage.faq_title": "Antes de me escrever",
    "contactpage.modal_title": "Mensagem pronta para enviar!",
    "contactpage.close": "Fechar",
    "store.hero_label": "Loja digital",
    "store.hero_title_prefix": "Produtos digitais ",
    "store.hero_title_highlight": "prontos para usar",
    "store.hero_title": "Produtos digitais prontos para usar",
    "store.hero_desc": "Logos, sites, landing pages, apps, flyers, cartões de visita e sessões de fotos — tudo o que sua marca precisa, em um só lugar.",
    "store.all": "Todos",
    "store.logos": "Logos",
    "store.web": "Sites",
    "store.landing": "Landing Pages",
    "store.apps": "Apps",
    "store.flyers": "Flyers",
    "store.business_cards": "Cartões de visita",
    "store.photo": "Fotografia",
    "store.how_title": "Como funciona a compra?",
    "store.how_desc": "Adicione os produtos que precisa ao carrinho e finalize seu pedido pelo WhatsApp. Coordenamos o pagamento pelo canal acordado e entregamos o arquivo ou projeto após a confirmação.",
    "footer.description": "Design web, marketing digital e produtos digitais prontos para fazer crescer sua marca.",
    "footer.navigation": "Navegação",
    "footer.services": "Serviços",
    "footer.contact": "Contato",
    "footer.web_design": "Design web",
    "footer.digital_marketing": "Marketing digital",
    "footer.store": "Loja de produtos",
    "footer.whatsapp": "WhatsApp"
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

function jpT(key, fallback = key) {
    return (translations[currentLang] && translations[currentLang][key]) || (translations.es[key]) || fallback;
}

// ----- CAMBIO DE IDIOMA -----
let currentLang = 'es';

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
        if (value && value !== key) el.innerHTML = value;
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

// ----- SCROLL SUAVE PARA ENLACES INTERNOS -----
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
  },
  pt:{
    'privacy.html':{title:'Política de privacidade · Jamsle Porcena',desc:'Informações sobre os dados coletados e como são utilizados.'},
    'terms.html':{title:'Termos de uso · Jamsle Porcena',desc:'Condições gerais para o uso do site e contratação de serviços.'},
    'cookies.html':{title:'Política de cookies · Jamsle Porcena',desc:'Como este site utiliza armazenamento local e tecnologias similares.'},
    'help.html':{title:'Central de ajuda · Jamsle Porcena',desc:'Ajuda para encontrar serviços, projetos, loja e contato.'}
  }
};

window.applyLegalLanguage = function(){
 const file=location.pathname.split('/').pop(); const lang=(typeof currentLang!=='undefined'?currentLang:(localStorage.getItem('jp_lang')||'es'));
 if(!window.LEGAL_CONTENT[lang]?.[file]) return;
 const data=window.LEGAL_CONTENT[lang][file]; document.title=data.title; const meta=document.querySelector('meta[name="description"]'); if(meta)meta.content=data.desc;
 const nav={es:['Inicio','Sobre mí','Servicios','Tienda','Contacto'],en:['Home','About','Services','Store','Contact'],fr:['Accueil','À propos','Services','Boutique','Contact'],pt:['Início','Sobre mim','Serviços','Loja','Contato']};
 document.querySelectorAll('.nav-links a').forEach((a,i)=>{if(nav[lang]?.[i])a.textContent=nav[lang][i];});
 const footNav=lang==='fr'?['Accueil','À propos','Services','Boutique de produits','Confidentialité','Conditions','Cookies','Centre d’aide']:lang==='en'?['Home','About','Services','Store products','Privacy','Terms','Cookies','Help Center']:lang==='pt'?['Início','Sobre mim','Serviços','Loja de produtos','Privacidade','Termos','Cookies','Central de ajuda']:['Inicio','Sobre mí','Servicios','Tienda de productos','Privacidad','Términos','Cookies','Centro de ayuda'];
 document.querySelectorAll('footer ul a').forEach((a,i)=>{if(footNav[i])a.textContent=footNav[i];});
 const legal={
  es:{privacy:['Política de privacidad','Responsable del sitio: Jamsle Porcena','Contacto: porcenatjamsle07@gmail.com · +1 (809) 999-59-04','Datos que podemos recibir','Cuando envías un formulario podemos recibir tu nombre, correo, asunto, tipo de proyecto, presupuesto y mensaje. Cuando realizas un pedido podemos recibir los datos necesarios para gestionar la solicitud y los productos seleccionados.','Finalidad','Usamos estos datos para responder consultas, gestionar pedidos, prestar servicios, mejorar el sitio y mantener registros operativos.','Analítica','El sitio registra eventos técnicos de navegación mediante un identificador de sesión generado en el navegador. No se almacena la dirección IP en nuestra tabla de analítica.','Servicios externos','El sitio puede utilizar Supabase para almacenamiento y WhatsApp para comunicación cuando el visitante elige ese canal. Cada servicio procesa información conforme a sus propias políticas.','Conservación y derechos','Conservamos la información durante el tiempo razonablemente necesario para atender la relación o cumplir obligaciones aplicables. Puedes solicitar acceso, corrección o eliminación escribiendo al correo de contacto.'],
  terms:['Términos de uso','Uso del sitio','El contenido del sitio se ofrece para informar sobre servicios, proyectos y productos de Jamsle Porcena. No está permitido utilizarlo de forma fraudulenta o para vulnerar derechos de terceros.','Servicios','El alcance, precio, plazos, revisiones y entregables de cada proyecto se acuerdan con el cliente antes de iniciar el trabajo. Los textos de la web no sustituyen una propuesta o contrato específico.','Productos y pagos','Los productos de la tienda pueden solicitarse por WhatsApp para coordinar el pedido y el pago. Un pedido se considera confirmado cuando el pago o las condiciones acordadas hayan sido verificadas.','Propiedad intelectual','Los elementos del portafolio y los materiales propios del sitio no pueden copiarse, revenderse o reutilizarse sin autorización, salvo los recursos de terceros sujetos a sus respectivas licencias.','Contacto','Para dudas sobre un pedido o servicio, utiliza Contacto o el canal de WhatsApp indicado en el sitio.'],
  cookies:['Política de cookies','Este sitio prioriza tecnologías esenciales para que sus funciones trabajen correctamente.','Almacenamiento local','El carrito y la preferencia de idioma pueden guardarse en el almacenamiento local del navegador. Esto permite conservar el carrito y recordar el idioma entre páginas.','Cookies de terceros','Algunos recursos externos, como fuentes, iconos o contenido integrado, pueden aplicar sus propias tecnologías según su configuración. El sitio no utiliza estas tecnologías para crear perfiles publicitarios propios.','Preferencias','Puedes borrar el almacenamiento local y las cookies desde la configuración de tu navegador. Algunas funciones, como el carrito o el idioma guardado, podrían reiniciarse.'],
  help:['Centro de ayuda','¿Qué estás buscando?','Servicios','Consulta planes, precios y formas de solicitar un proyecto.','Tienda','Explora productos digitales, agrégalos al carrito y continúa por WhatsApp.','Contacto','Envía una consulta o inicia una conversación directa.','Navegación','Usa el menú del sitio para encontrar rápidamente cada sección.','Pedidos','El carrito permite preparar tu pedido y continuar por WhatsApp para coordinar el pago.','¿No encuentras algo?','Escríbeme y te ayudaré a encontrar la información correcta.']}
 };
 const arr=legal[lang]?.[file]; if(!arr) return;
 const main=document.querySelector('main .section-header'); if(!main) return;
 if(file==='privacy.html'||file==='terms.html'||file==='cookies.html'){main.innerHTML=arr.map((v,i)=>i===0?`<h1>${v}</h1>`:i%2===1?`<p>${v}</p>`:`<h2>${v}</h2>`).join('')+`<p><em>${lang==='fr'?'Cette page fournit des informations générales et ne remplace pas un avis juridique.':lang==='en'?'This page is general information and does not replace legal advice.':lang==='pt'?'Esta página fornece informações gerais e não substitui aconselhamento jurídico.':'Esta página es información general y no sustituye asesoramiento jurídico.'}</em></p>`;}
 else {main.innerHTML=`<h1>${arr[0]}</h1><p>${arr[1]}</p><div class="values-grid"><div class="value-card"><i class="fas fa-briefcase"></i><h3>${arr[2]}</h3><p>${arr[3]}</p><a class="btn-secondary" href="servicios.html">${lang==='fr'?'Voir les services':lang==='en'?'View services':lang==='pt'?'Ver serviços':'Ver servicios'}</a></div><div class="value-card"><i class="fas fa-store"></i><h3>${arr[4]}</h3><p>${arr[5]}</p><a class="btn-secondary" href="tienda.html">${lang==='fr'?'Ouvrir la boutique':lang==='en'?'Open store':lang==='pt'?'Abrir loja':'Abrir tienda'}</a></div><div class="value-card"><i class="fas fa-envelope"></i><h3>${arr[6]}</h3><p>${arr[7]}</p><a class="btn-secondary" href="contacto.html">${lang==='fr'?'Contacter':lang==='en'?'Contact':lang==='pt'?'Contatar':'Contactar'}</a></div><div class="value-card"><i class="fas fa-robot"></i><h3>${arr[8]}</h3><p>${arr[9]}</p></div></div><h2>${arr[10]}</h2><p>${arr[11]}</p><h2>${arr[12]}</h2><p>${arr[13]}</p>`;}
};

const _oldSetLanguage=setLanguage; setLanguage=function(lang){_oldSetLanguage(lang); window.applyLegalLanguage?.();};

Object.assign(translations.es,{"page.title.privacy":"Privacidad · Jamsle Porcena","page.title.terms":"Términos · Jamsle Porcena","page.title.cookies":"Cookies · Jamsle Porcena","page.title.help":"Centro de ayuda · Jamsle Porcena","page.description.privacy":"Política de privacidad de Jamsle Porcena.","page.description.terms":"Términos de uso de Jamsle Porcena.","page.description.cookies":"Política de cookies de Jamsle Porcena.","page.description.help":"Centro de ayuda de Jamsle Porcena."});
Object.assign(translations.en,{"page.title.privacy":"Privacy · Jamsle Porcena","page.title.terms":"Terms · Jamsle Porcena","page.title.cookies":"Cookies · Jamsle Porcena","page.title.help":"Help Center · Jamsle Porcena","page.description.privacy":"Jamsle Porcena privacy policy.","page.description.terms":"Jamsle Porcena terms of use.","page.description.cookies":"Jamsle Porcena cookie policy.","page.description.help":"Jamsle Porcena help center."});
Object.assign(translations.fr,{"page.title.privacy":"Confidentialité · Jamsle Porcena","page.title.terms":"Conditions · Jamsle Porcena","page.title.cookies":"Cookies · Jamsle Porcena","page.title.help":"Centre d’aide · Jamsle Porcena","page.description.privacy":"Politique de confidentialité de Jamsle Porcena.","page.description.terms":"Conditions d’utilisation de Jamsle Porcena.","page.description.cookies":"Politique relative aux cookies de Jamsle Porcena.","page.description.help":"Centre d’aide de Jamsle Porcena."});
Object.assign(translations.pt,{"page.title.privacy":"Privacidade · Jamsle Porcena","page.title.terms":"Termos · Jamsle Porcena","page.title.cookies":"Cookies · Jamsle Porcena","page.title.help":"Central de Ajuda · Jamsle Porcena","page.description.privacy":"Política de privacidade de Jamsle Porcena.","page.description.terms":"Termos de uso de Jamsle Porcena.","page.description.cookies":"Política de cookies de Jamsle Porcena.","page.description.help":"Central de ajuda de Jamsle Porcena."});
