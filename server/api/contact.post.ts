const CHANNEL_DEFAULT = "D0BETM8FX0C";

function field(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function slackPlain(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const name = field(body?.name, 200);
  const email = field(body?.email, 200);
  const message = field(body?.message, 4000);

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name, email, and message are required.",
    });
  }

  const config = useRuntimeConfig();
  const token = config.slackBotToken;
  const channel = config.slackContactChannel || CHANNEL_DEFAULT;
  if (!token) {
    throw createError({ statusCode: 503, statusMessage: "Contact is not configured." });
  }

  const text = [
    "Contact form on jonaswolber.vercel.app",
    `Name: ${slackPlain(name)}`,
    `Email: ${slackPlain(email)}`,
    "",
    slackPlain(message),
  ].join("\n");

  const result = await $fetch<{ ok: boolean; error?: string }>("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: {
      channel,
      text,
      unfurl_links: false,
      unfurl_media: false,
    },
  }).catch(() => null);

  if (!result?.ok) {
    console.error("contact slack", result?.error ?? "request failed");
    throw createError({ statusCode: 502, statusMessage: "Could not deliver the message." });
  }

  return { ok: true };
});
