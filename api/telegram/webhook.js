const BOT_NAME = "WilkyJamsDev";
const WEBSITE_URL = "https://wilkyjamsdev.vercel.app/";
const SUPABASE_URL = process.env.supabase_url;
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.supabase_service_role_key;

export default async function handler(req, res) {
  // =========================================================
  // HEALTH CHECK
  // =========================================================

  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      service: "WilkyJamsDev Telegram Bot",
      status: "online",
      tokenConfigured: Boolean(process.env.telegram_bot_token),
    });
  }

  // =========================================================
  // ONLY POST IS ACCEPTED FROM TELEGRAM
  // =========================================================

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");

    return res.status(405).json({
      ok: false,
      error: "Method not allowed",
    });
  }

  try {
    const update = req.body;
    const token = process.env.telegram_bot_token;

    if (!token) {
      console.error("telegram_bot_token is missing");

      return res.status(500).json({
        ok: false,
        error: "Telegram bot token is not configured",
      });
    }

    // =======================================================
    // TELEGRAM HELPERS
    // =======================================================

    async function telegram(method, payload) {
      const response = await fetch(
        `https://api.telegram.org/bot${token}/${method}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.ok) {
        console.error("Telegram API error:", data);

        throw new Error(
          data?.description || "Telegram API request failed"
        );
      }

      return data;
    }

    async function sendMessage(chatId, text, options = {}) {
      return telegram("sendMessage", {
        chat_id: chatId,
        text,
        ...options,
      });
    }

    async function answerCallbackQuery(callbackQueryId) {
      return telegram("answerCallbackQuery", {
        callback_query_id: callbackQueryId,
      });
    }
async function saveQuoteRequest(data) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Supabase environment variables are missing");
    return null;
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/telegram_quote_requests`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Prefer": "return=representation",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.text();

  if (!response.ok) {
    console.error("Supabase save error:", result);
    return null;
  }

  try {
    return JSON.parse(result);
  } catch {
    return result;
  }
}
    async function saveQuoteSession(data) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Supabase environment variables are missing");
    return null;
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/telegram_quote_sessions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Prefer": "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.text();

  if (!response.ok) {
    console.error("Supabase session save error:", result);
    return null;
  }

  try {
    return JSON.parse(result);
  } catch {
    return result;
  }
}

async function getQuoteSession(chatId) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Supabase environment variables are missing");
    return null;
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/telegram_quote_sessions?telegram_chat_id=eq.${encodeURIComponent(chatId)}&limit=1`,
    {
      method: "GET",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );

  const result = await response.text();

  if (!response.ok) {
    console.error("Supabase session read error:", result);
    return null;
  }

  try {
    const data = JSON.parse(result);
    return data[0] || null;
  } catch {
    return null;
  }
}

async function deleteQuoteSession(chatId) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Supabase environment variables are missing");
    return false;
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/telegram_quote_sessions?telegram_chat_id=eq.${encodeURIComponent(chatId)}`,
    {
      method: "DELETE",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );

  if (!response.ok) {
    const result = await response.text();
    console.error("Supabase session delete error:", result);
    return false;
  }

  return true;
}
    // =======================================================
    // INLINE MENU
    // =======================================================

    const mainMenu = {
      inline_keyboard: [
        [
          {
            text: "💻 Servicios",
            callback_data: "services",
          },
          {
            text: "💰 Cotización",
            callback_data: "quote",
          },
        ],
        [
          {
            text: "🚀 Proyectos",
            callback_data: "projects",
          },
          {
            text: "📋 Mi solicitud",
            callback_data: "status",
          },
        ],
        [
          {
            text: "📞 Contactar",
            callback_data: "contact",
          },
        ],
      ],
    };

    // =======================================================
    // SERVICES MENU
    // =======================================================

    const servicesMenu = {
      inline_keyboard: [
        [
          {
            text: "🌐 Desarrollo Web",
            callback_data: "service_web",
          },
        ],
        [
          {
            text: "🎨 UI/UX Design",
            callback_data: "service_uiux",
          },
        ],
        [
          {
            text: "✨ Branding & Logos",
            callback_data: "service_branding",
          },
        ],
        [
          {
            text: "🤖 IA & Contenido Digital",
            callback_data: "service_ai",
          },
        ],
        [
          {
            text: "📸 Edición de Imágenes",
            callback_data: "service_images",
          },
        ],
        [
          {
            text: "⬅️ Menú principal",
            callback_data: "main",
          },
        ],
      ],
    };

    // =======================================================
    // CALLBACK QUERIES
    // =======================================================

    if (update?.callback_query) {
      const callback = update.callback_query;
      const callbackData = callback.data;
      const chatId = callback.message?.chat?.id;

      if (!chatId) {
        return res.status(200).json({
          ok: true,
          ignored: true,
        });
      }

      await answerCallbackQuery(callback.id);

      // -------------------------------
      // MAIN MENU
      // -------------------------------

      if (callbackData === "main") {
        await sendMessage(
          chatId,
          `🤖 ${BOT_NAME}

¡Hola! Soy el asistente digital de WilkyJamsDev.

Puedo ayudarte a conocer nuestros servicios, solicitar una cotización, consultar proyectos o contactar directamente.

¿Qué necesitas?`,
          {
            reply_markup: mainMenu,
          }
        );

        return res.status(200).json({
          ok: true,
          handled: "main",
        });
      }

      // -------------------------------
      // SERVICES
      // -------------------------------

      if (callbackData === "services") {
        await sendMessage(
          chatId,
          `💻 SERVICIOS WILKYJAMSDEV

Selecciona el servicio que quieres conocer:`,
          {
            reply_markup: servicesMenu,
          }
        );

        return res.status(200).json({
          ok: true,
          handled: "services",
        });
      }

      // -------------------------------
      // SERVICE DETAILS
      // -------------------------------

      const serviceMessages = {
        service_web: `🌐 DESARROLLO WEB

Creación de sitios web modernos, responsive y orientados a resultados.

Incluye según el proyecto:
• Diseño y desarrollo
• Responsive design
• SEO básico
• Formularios
• Integraciones
• Optimización
• Publicación y configuración

¿Quieres solicitar una cotización?`,

        service_uiux: `🎨 UI/UX DESIGN

Diseño de interfaces modernas y experiencias digitales centradas en el usuario.

Incluye:
• Wireframes
• Diseño visual
• Prototipos
• Diseño responsive
• Sistemas visuales
• Prototipado en Figma

¿Quieres solicitar una cotización?`,

        service_branding: `✨ BRANDING & LOGOS

Diseño de identidad visual para marcas y negocios.

Servicios:
• Diseño de logotipos
• Identidad visual
• Manual de marca
• Tarjetas y piezas digitales
• Adaptaciones para redes sociales

¿Quieres solicitar una cotización?`,

        service_ai: `🤖 IA & CONTENIDO DIGITAL

Uso de inteligencia artificial y herramientas digitales para crear contenido y soluciones visuales.

Incluye:
• Creación de contenido
• Visuales con IA
• Optimización de contenido
• Automatizaciones
• Soluciones digitales

¿Quieres solicitar una cotización?`,

        service_images: `📸 EDICIÓN Y RETOQUE DE IMÁGENES

Edición profesional de fotografías y materiales digitales.

Incluye:
• Retoque
• Eliminación de fondos
• Corrección visual
• Composición
• Preparación para redes sociales
• Material promocional

¿Quieres solicitar una cotización?`,
      };

      if (serviceMessages[callbackData]) {
        await sendMessage(chatId, serviceMessages[callbackData], {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "💰 Solicitar cotización",
                  callback_data: "quote",
                },
              ],
              [
                {
                  text: "⬅️ Ver servicios",
                  callback_data: "services",
                },
              ],
            ],
          },
        });

        return res.status(200).json({
          ok: true,
          handled: "service_detail",
        });
      }

      // -------------------------------
      // QUOTE
      // -------------------------------

      if (callbackData === "quote") {
      const user = callback.from || {};

await saveQuoteSession({
  telegram_chat_id: chatId,
  telegram_user_id: user.id || null,
  telegram_username: user.username || null,
  telegram_first_name: user.first_name || null,
  telegram_last_name: user.last_name || null,
  step: 1,
  service: null,
  project_description: null,
  budget: null,
  deadline: null,
  contact_info: null,
  updated_at: new Date().toISOString(),
});

await sendMessage(
  chatId,
  `💰 SOLICITUD DE COTIZACIÓN

Perfecto. Voy a ayudarte a preparar tu solicitud.

Paso 1 de 5

¿Qué servicio necesitas?

Ejemplos:
• Desarrollo Web
• Diseño de Logo
• UI/UX
• Branding
• Edición de imágenes
• Marketing Digital
• Soluciones con IA

✍️ Escribe el servicio que necesitas.`,
  {
    reply_markup: {
      force_reply: true,
      input_field_placeholder: "Escribe el servicio...",
    },
  }
);
        return res.status(200).json({
          ok: true,
          handled: "quote_start",
        });
      }

      // -------------------------------
      // PROJECTS
      // -------------------------------

      if (callbackData === "projects") {
        await sendMessage(
          chatId,
          `🚀 PROYECTOS WILKYJAMSDEV

Puedes conocer nuestros proyectos y trabajos realizados directamente desde el sitio web:

${WEBSITE_URL}

También puedes solicitar una cotización para tu propio proyecto.`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "🌐 Ver sitio web",
                    url: WEBSITE_URL,
                  },
                ],
                [
                  {
                    text: "💰 Solicitar cotización",
                    callback_data: "quote",
                  },
                ],
                [
                  {
                    text: "⬅️ Menú principal",
                    callback_data: "main",
                  },
                ],
              ],
            },
          }
        );

        return res.status(200).json({
          ok: true,
          handled: "projects",
        });
      }

      // -------------------------------
      // STATUS
      // -------------------------------

      if (callbackData === "status") {
        await sendMessage(
          chatId,
          `📋 ESTADO DE SOLICITUD

Todavía no tenemos un sistema de consulta de solicitudes conectado a tu CRM.

Esta función será conectada posteriormente con el sistema de clientes de WilkyJamsDev.

Si todavía no has enviado una solicitud, puedes comenzar ahora:`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "💰 Solicitar cotización",
                    callback_data: "quote",
                  },
                ],
                [
                  {
                    text: "⬅️ Menú principal",
                    callback_data: "main",
                  },
                ],
              ],
            },
          }
        );

        return res.status(200).json({
          ok: true,
          handled: "status",
        });
      }

      // -------------------------------
      // CONTACT
      // -------------------------------

      if (callbackData === "contact") {
        await sendMessage(
          chatId,
          `📞 CONTACTAR CON WILKYJAMSDEV

¿Tienes un proyecto o una pregunta?

Puedes visitar nuestro sitio:

${WEBSITE_URL}

También puedes iniciar una solicitud de cotización desde este bot.`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "🌐 Visitar WilkyJamsDev",
                    url: WEBSITE_URL,
                  },
                ],
                [
                  {
                    text: "💰 Solicitar cotización",
                    callback_data: "quote",
                  },
                ],
                [
                  {
                    text: "⬅️ Menú principal",
                    callback_data: "main",
                  },
                ],
              ],
            },
          }
        );

        return res.status(200).json({
          ok: true,
          handled: "contact",
        });
      }

      return res.status(200).json({
        ok: true,
        ignored: true,
      });
    }

    // =======================================================
    // NORMAL TELEGRAM MESSAGE
    // =======================================================

    const message = update?.message;

    const chatId = message?.chat?.id;
    const text = message?.text?.trim();

    if (!chatId || !text) {
      return res.status(200).json({
        ok: true,
        ignored: true,
      });
    }

    // =======================================================
    // COMMANDS
    // =======================================================

    if (text === "/start") {
      await sendMessage(
        chatId,
        `👋 ¡Hola!

Soy el asistente digital de ${BOT_NAME}.

🚀 Puedo ayudarte con servicios, proyectos y solicitudes de cotización.

Selecciona una opción:`,
        {
          reply_markup: mainMenu,
        }
      );

      return res.status(200).json({
        ok: true,
        handled: "start",
      });
    }

    if (text === "/services") {
      await sendMessage(
        chatId,
        `💻 SERVICIOS WILKYJAMSDEV

Selecciona un servicio para conocer más:`,
        {
          reply_markup: servicesMenu,
        }
      );

      return res.status(200).json({
        ok: true,
        handled: "services",
      });
    }

   if (text === "/quote") {
  const user = message.from || {};

  await saveQuoteSession({
    telegram_chat_id: chatId,
    telegram_user_id: user.id || null,
    telegram_username: user.username || null,
    telegram_first_name: user.first_name || null,
    telegram_last_name: user.last_name || null,
    step: 1,
    service: null,
    project_description: null,
    budget: null,
    deadline: null,
    contact_info: null,
    updated_at: new Date().toISOString(),
  });

  await sendMessage(
    chatId,
    `💰 SOLICITUD DE COTIZACIÓN

Vamos a preparar tu solicitud.

Paso 1 de 5

¿Qué servicio necesitas?

✍️ Escribe el servicio que necesitas.`,
    {
      reply_markup: {
        force_reply: true,
        input_field_placeholder: "Escribe el servicio...",
      },
    }
  );

  return res.status(200).json({
    ok: true,
    handled: "quote_start",
  });
}

    if (text === "/projects") {
      await sendMessage(
        chatId,
        `🚀 PROYECTOS WILKYJAMSDEV

Visita nuestro sitio para conocer los proyectos:

${WEBSITE_URL}`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "🌐 Ver proyectos",
                  url: WEBSITE_URL,
                },
              ],
              [
                {
                  text: "💰 Solicitar cotización",
                  callback_data: "quote",
                },
              ],
            ],
          },
        }
      );

      return res.status(200).json({
        ok: true,
        handled: "projects",
      });
    }

    if (text === "/contact") {
      await sendMessage(
        chatId,
        `📞 CONTACTAR CON WILKYJAMSDEV

Puedes visitar nuestro sitio:

${WEBSITE_URL}

O comenzar una solicitud de cotización directamente desde aquí.`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "🌐 Visitar sitio",
                  url: WEBSITE_URL,
                },
              ],
              [
                {
                  text: "💰 Solicitar cotización",
                  callback_data: "quote",
                },
              ],
            ],
          },
        }
      );

      return res.status(200).json({
        ok: true,
        handled: "contact",
      });
    }

    if (text === "/help") {
      await sendMessage(
        chatId,
        `🤖 AYUDA — WILKYJAMSDEV

Comandos disponibles:

/start — Menú principal
/services — Servicios
/quote — Solicitar cotización
/projects — Proyectos
/status — Estado de solicitud
/contact — Contactar
/help — Ayuda

También puedes utilizar los botones del menú principal.`
      );

      return res.status(200).json({
        ok: true,
        handled: "help",
      });
    }

    // =======================================================
    // QUOTE CONVERSATION
    // =======================================================
    //
    // We use Telegram ForceReply so the conversation can
    // continue without storing temporary state in memory.
    // =======================================================

    const repliedTo = message?.reply_to_message?.text || "";

    // STEP 2 — PROJECT DESCRIPTION

   if (repliedTo.includes("Paso 1 de 5")) {
  const session = await getQuoteSession(chatId);

  if (!session) {
    await sendMessage(
      chatId,
      `⚠️ No encontré una solicitud activa.

Escribe /quote para comenzar una nueva cotización.`
    );

    return res.status(200).json({
      ok: true,
      handled: "quote_session_missing",
    });
  }

  const service = text.trim();

  if (!service) {
    await sendMessage(
      chatId,
      `⚠️ Por favor, escribe el servicio que necesitas.

Ejemplo:
Desarrollo Web`
    );

    return res.status(200).json({
      ok: true,
      handled: "quote_step1_empty",
    });
  }

  await saveQuoteSession({
    telegram_chat_id: chatId,
    telegram_user_id: message.from?.id || session.telegram_user_id || null,
    telegram_username:
      message.from?.username || session.telegram_username || null,
    telegram_first_name:
      message.from?.first_name || session.telegram_first_name || null,
    telegram_last_name:
      message.from?.last_name || session.telegram_last_name || null,
    step: 2,
    service: service,
    project_description: null,
    budget: null,
    deadline: null,
    contact_info: null,
    updated_at: new Date().toISOString(),
  });

  await sendMessage(
    chatId,
    `✅ Servicio registrado: ${service}

Paso 2 de 5

Ahora cuéntame brevemente sobre tu proyecto.

¿Qué necesitas exactamente?
¿Qué quieres crear, mejorar o solucionar?

✍️ Escribe una descripción de tu proyecto.`,
    {
      reply_markup: {
        force_reply: true,
        input_field_placeholder: "Describe tu proyecto...",
      },
    }
  );

  return res.status(200).json({
    ok: true,
    handled: "quote_step1",
  });
}

    // STEP 3 — BUDGET

    if (repliedTo.includes("Paso 2 de 5")) {
      await sendMessage(
        chatId,
        `✅ Descripción recibida.

Paso 3 de 5

¿Cuál es tu presupuesto aproximado?

Puedes escribir, por ejemplo:

• US$100
• US$300–500
• US$500+
• Todavía no lo sé

✍️ Indica tu presupuesto aproximado.`,
        {
          reply_markup: {
            force_reply: true,
            input_field_placeholder: "Presupuesto aproximado...",
          },
        }
      );

      return res.status(200).json({
        ok: true,
        handled: "quote_step_3",
      });
    }

    // STEP 4 — DEADLINE

    if (repliedTo.includes("Paso 3 de 5")) {
      await sendMessage(
        chatId,
        `✅ Presupuesto recibido.

Paso 4 de 5

¿Cuándo necesitas tener listo el proyecto?

Ejemplos:

• Lo antes posible
• Esta semana
• En 2 semanas
• Este mes
• No tengo fecha definida

✍️ Indica tu plazo.`,
        {
          reply_markup: {
            force_reply: true,
            input_field_placeholder: "Plazo del proyecto...",
          },
        }
      );

      return res.status(200).json({
        ok: true,
        handled: "quote_step_4",
      });
    }

    // STEP 5 — CONTACT

    if (repliedTo.includes("Paso 4 de 5")) {
      await sendMessage(
        chatId,
        `✅ Plazo recibido.

Paso 5 de 5

¿Cómo podemos contactarte?

Puedes enviar:

• Nombre
• Email
• WhatsApp
• O varios datos juntos

Ejemplo:

Jamsle
jamsle@email.com
WhatsApp: +1 XXX XXX XXXX

✍️ Envía tus datos de contacto.`,
        {
          reply_markup: {
            force_reply: true,
            input_field_placeholder: "Tus datos de contacto...",
          },
        }
      );

      return res.status(200).json({
        ok: true,
        handled: "quote_step_5",
      });
    }

    // =======================================================
    // FINAL QUOTE MESSAGE
    // =======================================================

    if (repliedTo.includes("Paso 5 de 5")) {
      await sendMessage(
        chatId,
        `🎉 ¡Solicitud recibida!

Gracias por contactar con ${BOT_NAME}.

Hemos recibido tus datos y tu solicitud de proyecto.

📌 Próximamente conectaremos este proceso directamente con nuestro sistema CRM para registrar automáticamente tu solicitud y gestionar su estado.

🌐 ${WEBSITE_URL}

Mientras tanto, puedes continuar conversando con el asistente o visitar nuestro sitio web.

🚀 WilkyJamsDev`
      );

      return res.status(200).json({
        ok: true,
        handled: "quote_complete",
      });
    }

    // =======================================================
    // DEFAULT AI-READY RESPONSE
    // =======================================================

    await sendMessage(
      chatId,
      `👋 He recibido tu mensaje.

Soy el asistente de ${BOT_NAME}.

Puedo ayudarte con:

💻 Servicios
💰 Cotizaciones
🚀 Proyectos
📞 Contacto

Utiliza /start para abrir el menú principal.`
    );

    return res.status(200).json({
      ok: true,
      sent: true,
    });
  } catch (error) {
    console.error("Webhook error:", error);

    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
}
