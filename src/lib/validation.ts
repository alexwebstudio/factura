import { z } from "zod";

export const MESSENGERS = ["call", "whatsapp", "telegram"] as const;

export const messengerLabels: Record<(typeof MESSENGERS)[number], string> = {
  call: "Звонок",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
};

/**
 * Маска телефона. По умолчанию — казахстанский формат +7 (XXX) XXX-XX-XX:
 * «8…» и «7…» без плюса считаем местным номером. Если номер начинается с «+»
 * и другой кодом страны — оставляем международный ввод: «+» и до 15 цифр.
 */
export function formatPhone(input: string) {
  const trimmed = input.trim();
  let digits = trimmed.replace(/\D/g, "");
  const international = trimmed.startsWith("+") && digits.length > 0 && !digits.startsWith("7");

  if (international) {
    digits = digits.slice(0, 15);
    return `+${digits.replace(/(\d{3})(?=\d)/g, "$1 ")}`.trim();
  }

  if (!digits) return trimmed.startsWith("+") ? "+" : "";
  if (digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  if (!digits.startsWith("7")) digits = `7${digits}`;
  digits = digits.slice(0, 11);

  const d = digits.slice(1);
  let out = "+7";
  if (d.length > 0) out += ` (${d.slice(0, 3)}`;
  if (d.length > 3) out += `) ${d.slice(3, 6)}`;
  if (d.length > 6) out += `-${d.slice(6, 8)}`;
  if (d.length > 8) out += `-${d.slice(8, 10)}`;
  return out;
}

export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (value.trim().startsWith("+") && !digits.startsWith("7")) {
    return digits.length >= 8 && digits.length <= 15;
  }
  return digits.length === 11;
}

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80, "Слишком длинное имя"),
  phone: z.string().trim().refine(isValidPhone, "Проверьте номер телефона"),
  comment: z.string().trim().max(1000, "До 1000 символов").optional().or(z.literal("")),
  messenger: z.enum(MESSENGERS),
  consent: z.boolean().refine((v) => v, "Нужно согласие на обработку данных"),
  /** Honeypot: люди это поле не видят и не заполняют. */
  website: z.string().max(0).optional().or(z.literal("")),
  source: z.string().max(120).optional(),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadData = z.output<typeof leadSchema>;
