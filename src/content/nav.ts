import { site } from "./site";

export type NavItem = { label: string; href: string };

/** Центр шапки. «Материалы» раскрывает мега-меню. */
export const mainNav: (NavItem & { mega?: boolean })[] = [
  { label: "Материалы", href: "/materials", mega: true },
  { label: "Объекты", href: "/projects" },
  { label: "Производство", href: "/production" },
  { label: "Контакты", href: "/contacts" },
];

/** Полноэкранное мобильное меню. */
export const mobileNav: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "Материалы", href: "/materials" },
  { label: "Объекты", href: "/projects" },
  { label: "Производство", href: "/production" },
  { label: "О компании", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Навигация",
    items: [
      { label: "Материалы", href: "/materials" },
      { label: "Объекты", href: "/projects" },
      { label: "Производство", href: "/production" },
      { label: "Контакты", href: "/contacts" },
    ],
  },
  {
    title: "Компания",
    items: [
      { label: "О компании", href: "/about" },
      { label: "Преимущества", href: "/about#advantages" },
      { label: "Регламент", href: "/about#process" },
      { label: "Документы", href: "/about#documents" },
    ],
  },
];

export const messengers = [
  { label: "WhatsApp", href: site.contacts.whatsapp, icon: "whatsapp" },
  { label: "Telegram", href: site.contacts.telegram, icon: "telegram" },
  { label: "Instagram", href: site.contacts.instagram, icon: "instagram" },
] as const;

export const megaMenu = {
  title: "Материалы",
  text: "Шесть систем облицовки — от бюджетной штукатурки до клинкера на 50+ лет. В карточке каждой — характеристики и объекты.",
  hubLabel: "Спецификация всех материалов →",
} as const;
