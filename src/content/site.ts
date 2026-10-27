/**
 * Все данные компании — в одном месте.
 *
 * ⚠ ЗАМЕНИТЬ: всё, что помечено TODO(client), — заглушки до получения реальных данных.
 * Цифры «12 лет», «240+», «гарантия 5 лет» взяты из ТЗ: перед запуском сверить с фактом.
 */

export const site = {
  name: "ФАКТУРА",
  descriptor: "инженерные фасады",
  slogan: "Фасад начинается с расчёта",
  description:
    "Проектируем, производим и монтируем навесные фасады как инженерную систему: теплотехника, узлы, подконструкция и монтаж по проекту.",

  // TODO(client): {{DOMAIN}} — боевой домен без слэша в конце.
  url: "https://faktura-fasad.kz",

  // TODO(client): {{CITY}} — город в именительном и предложном падеже.
  city: "Алматы",
  cityIn: "в Алматы",
  // TODO(client): регионы выезда — используется в FAQ и в JSON-LD.
  regions: "Алматы и Алматинская область, выезд по Казахстану",

  // TODO(client): {{CONTACTS}}
  contacts: {
    phone: "+7 (700) 000-00-00",
    phoneHref: "tel:+77000000000",
    whatsapp: "https://wa.me/77000000000",
    telegram: "https://t.me/faktura_fasad",
    instagram: "https://instagram.com/faktura_fasad",
    email: "info@faktura-fasad.kz",
    address: "Алматы, ул. Примерная, 1",
    hours: "Пн–Пт 9:00–18:00",
  },

  // TODO(client): реквизиты для подвала и политики конфиденциальности.
  legal: {
    entity: "ТОО «ФАКТУРА»",
    bin: "БИН 000000000000",
  },

  // TODO(client): ссылка на карту офиса/производства (2ГИС или Яндекс, формат embed).
  mapEmbedUrl:
    "https://yandex.ru/map-widget/v1/?text=%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D1%8B&z=12",

  /** Ключевые цифры. TODO(client): сверить с фактом. */
  facts: {
    years: { value: "12", unit: "лет", label: "на рынке" },
    projects: { value: "240+", label: "объектов" },
    warrantyYears: 5,
  },
} as const;

/** Строка параметров под вордмарком героя. */
export const heroParams = [
  `${site.facts.years.value} ${site.facts.years.unit} ${site.facts.years.label}`,
  `${site.facts.projects.value} ${site.facts.projects.label}`,
  "своё производство",
  `гарантия ${site.facts.warrantyYears} лет`,
] as const;

export const hero = {
  image: { desktop: "/images/hero/home.jpg", mobile: "/images/hero/home-mobile.jpg" },
  stamp: ["ФАКТУРА", "инженерные фасады", site.city],
  subtitle:
    "Фасад начинается с расчёта, а не с облицовки. Проектируем и монтируем фасады как инженерную систему.",
  pill: "Расчёт · производство · монтаж",
  primary: "Запросить расчёт →",
  secondary: "Смотреть объекты",
  card: {
    title: "Обсудим ваш фасад",
    text: "Подберём материалы и посчитаем стоимость",
    link: "Получить расчёт ↗",
  },
} as const;

export const manifesto = {
  index: "01",
  lines: ["Обшить может каждый.", "*Рассчитать* — единицы."],
  text: "Большинство «фасадчиков» просто вешают облицовку на стену. Мы сначала считаем: теплопотери, точку росы, ветровую нагрузку, подконструкцию и узлы. Потому наш фасад не трещит, не мокнет изнутри и служит десятилетиями, а не до первой зимы.",
  signature: "Это разница между отделкой и инженерией.",
} as const;

export const trust = {
  eyebrow: "Компания",
  lines: ["Один подрядчик", "на *весь*", "фасадный цикл"],
  lead: "Проект, производство и монтаж — в одних руках. Нажмите на карточку, чтобы узнать подробнее.",
  years: {
    value: site.facts.years.value,
    unit: site.facts.years.unit,
    caption: "проектируем и монтируем фасады",
    href: "/about",
  },
  features: [
    {
      icon: "compass",
      title: "Собственный конструкторский отдел",
      href: "/production#calculate",
    },
    {
      icon: "person",
      title: "Персональный менеджер на объекте",
      href: "/about#advantages",
    },
  ],
  projects: {
    value: site.facts.projects.value,
    caption: "реализованных проектов",
    href: "/projects",
    image: "/images/home/trust.jpg",
    alt: "Павильон с тёмным карнизом и панорамным остеклением на закате",
  },
} as const;

export const process = {
  eyebrow: "Процесс",
  lines: ["От чертежа", "до *крепежа*"],
  items: [
    {
      icon: "blueprint",
      title: "Рабочий проект",
      text: "Узлы, раскладка панелей и спецификация — до начала работ.",
    },
    {
      icon: "factory",
      title: "Производство под размер",
      text: "Элементы делаем на своём производстве под геометрию объекта.",
    },
    {
      icon: "helmet",
      title: "Монтаж своей бригадой",
      text: "Ставим фасад по проекту, без субподряда, с приёмкой каждого этапа.",
    },
  ],
  image: "/images/home/process.jpg",
  alt: "Крупный план фасада из вертикальных ламелей под деревянной подшивкой",
} as const;

export const cta = {
  lines: ["Посчитаем", "*ваш* фасад"],
  subtitle: "Оставьте заявку — выедем на замер, сделаем расчёт и фикс-смету",
  button: "Запросить расчёт →",
  messengersNote: "WhatsApp / Telegram — для тех, кто не любит формы",
  after: [
    { term: "звонок", text: "Перезвоним и уточним задачу" },
    { term: "1–2 дня", text: "Выедем на замер, снимем геометрию" },
    { term: "3–5 дней", text: "Проект, расчёт и фикс-смета" },
  ],
} as const;
