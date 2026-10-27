import { NextResponse, type NextRequest } from "next/server";
import { leadSchema, messengerLabels } from "@/lib/validation";

/* Простой in-memory rate-limit: 5 заявок на IP за 10 минут. На serverless живёт в рамках инстанса. */
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, list] of hits) if (list.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  return recent.length > LIMIT;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Слишком много заявок подряд, попробуйте через несколько минут" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос" }, { status: 400 });
  }

  // Honeypot заполнен — это бот. Отвечаем «успехом», ничего не отправляя.
  if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Проверьте поля формы" }, { status: 422 });
  }
  const lead = parsed.data;

  const text = [
    "<b>Новая заявка с сайта</b>",
    `Имя: ${escapeHtml(lead.name)}`,
    `Телефон: ${escapeHtml(lead.phone)}`,
    `Связь: ${messengerLabels[lead.messenger]}`,
    lead.comment ? `Комментарий: ${escapeHtml(lead.comment)}` : null,
    lead.source ? `Источник: ${escapeHtml(lead.source)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead] TELEGRAM_* не заданы, заявка не отправлена:\n" + text);
      return NextResponse.json({ ok: true });
    }
    console.error("[lead] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы");
    return NextResponse.json({ ok: false, error: "Форма временно недоступна" }, { status: 503 });
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Telegram ${res.status}`);
  } catch (e) {
    console.error("[lead] отправка в Telegram не удалась", e);
    return NextResponse.json({ ok: false, error: "Не удалось отправить заявку" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
