export default async function handler(req, res) {
  // Health check
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      service: "WilkyJamsDev Telegram Bot",
      status: "online",
      tokenConfigured: Boolean(process.env.telegram_bot_token),
    });
  }

  // Telegram only sends POST updates
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");

    return res.status(405).json({
      ok: false,
      error: "Method not allowed",
    });
  }

  try {
    const update = req.body;
    const message = update?.message;

    const chatId = message?.chat?.id;
    const text = message?.text?.trim();

    // Ignore non-text updates
    if (!chatId || !text) {
      return res.status(200).json({
        ok: true,
        ignored: true,
      });
    }

   const token = process.env.telegram_bot_token;

    if (!token) {
      console.error("TELEGRAM_BOT_TOKEN is missing");

      return res.status(500).json({
        ok: false,
        error: "Telegram bot token is not configured",
      });
    }

    let reply;

    if (text === "/start") {
      reply = `👋 ¡Hola!

Soy el asistente de WilkyJamsDev.

🤖 El sistema está conectado correctamente.

Puedes escribirme cualquier mensaje para probar la conexión.

🚀 WilkyJamsDev Digital Assistant`;
    } else if (text === "/services") {
      reply = `💻 Servicios WilkyJamsDev

• Desarrollo Web
• UI/UX Design
• Branding
• Diseño de Logos
• Marketing Digital
• Edición de imágenes
• Soluciones con IA

Escribe /quote para solicitar una cotización.`;
    } else if (text === "/help") {
      reply = `🤖 Comandos disponibles:

/start - Iniciar el asistente
/services - Ver servicios
/quote - Solicitar cotización
/projects - Ver proyectos
/contact - Contactar
/help - Ver ayuda`;
    } else {
      reply = `✅ Mensaje recibido.

Has escrito:

"${text}"

🤖 El bot de WilkyJamsDev está funcionando correctamente.

Próximamente podré ayudarte automáticamente con tu proyecto.`;
    }

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: reply,
        }),
      }
    );

    if (!telegramResponse.ok) {
      const error = await telegramResponse.text();

      console.error("Telegram API error:", error);

      return res.status(502).json({
        ok: false,
        error: "Telegram API request failed",
      });
    }

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
