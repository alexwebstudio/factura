/**
 * Объекты.
 * ⚠ ДЕМО-ДАННЫЕ из ТЗ (раздел 15.6) — заменить реальными объектами.
 * TODO(client): year (null → строка «Год» не выводится), статусы, тексты, фото.
 */

export type ProjectType = "house" | "cottage" | "business" | "reconstruction";
export type ProjectStatus = "done" | "in-progress" | "concept";

export type Project = {
  slug: string;
  title: string;
  type: ProjectType;
  status: ProjectStatus;
  city: string;
  /** Площадь фасада, м² */
  area: number;
  subframe: string;
  materialSlug: string;
  materialLabel: string;
  year: number | null;
  image: string;
  /** Только для реконструкций: фото «до» для шторки. */
  beforeImage?: string;
  /** Ссылка «Смотреть на карте». TODO(client): точные координаты. */
  mapUrl?: string;
  summary: string;
  about: string[];
  done: string[];
};

export const projectTypes: Record<ProjectType, { label: string; plural: string }> = {
  house: { label: "Частный дом", plural: "Частные дома" },
  cottage: { label: "Коттедж", plural: "Коттеджи" },
  business: { label: "Бизнес-центр", plural: "Бизнес-центры" },
  reconstruction: { label: "Реконструкция", plural: "Реконструкции" },
};

/** Честная легенда статусов — выводится под сеткой объектов. */
export const projectStatuses: Record<ProjectStatus, { label: string; note: string }> = {
  done: { label: "Реализованный объект", note: "фасад смонтирован и сдан" },
  "in-progress": { label: "В работе", note: "идёт производство или монтаж" },
  concept: { label: "Проект", note: "рабочий проект и расчёт без монтажа" },
};

export const projectsSection = {
  eyebrow: "Объекты",
  lines: ["*Реализованные*", "объекты"],
  lead: "Листайте карточки — у каждого объекта есть паспорт с площадью, системой и материалом.",
  hubLink: "Все объекты →",
} as const;

export const projects: Project[] = [
  {
    slug: "chastnyj-dom-almaty",
    title: "Частный дом в Алматы",
    type: "house",
    status: "done",
    city: "Алматы",
    area: 320,
    subframe: "вентфасад",
    materialSlug: "fibrocement",
    materialLabel: "фиброцемент",
    year: null,
    image: "/images/projects/chastnyj-dom-almaty.jpg",
    summary: "Тёплый контур и фактура бетона для двухуровневого дома.",
    about: [
      "Задача — утеплить дом под алматинскую зиму и получить спокойный фасад с фактурой бетона без мокрых процессов и лишней нагрузки на стены.",
      "Решение — вентилируемый фасад с фиброцементными панелями. Толщину утеплителя подобрали теплотехническим расчётом, точку росы вывели за пределы несущей стены, раскладку панелей согласовали с окнами ещё в проекте.",
    ],
    done: [
      "Замер и съёмка геометрии фасада",
      "Теплотехнический расчёт и расчёт точки росы",
      "Рабочий проект с узлами окон, цоколя и парапета",
      "Раскладка панелей от проёмов, без подрезки на объекте",
      "Монтаж подсистемы, утеплителя и облицовки своей бригадой",
      "Исполнительная документация и гарантия",
    ],
  },
  {
    slug: "biznes-centr-astana",
    title: "Бизнес-центр в Астане",
    type: "business",
    status: "done",
    city: "Астана",
    area: 1200,
    subframe: "алюминиевая подсистема",
    materialSlug: "metallokassety",
    materialLabel: "металлокассеты",
    year: null,
    image: "/images/projects/biznes-centr-astana.jpg",
    summary: "Строгая геометрия кассет под ветровую нагрузку столицы.",
    about: [
      "Задача — строгий деловой фасад с ровными швами на здании с высокой ветровой нагрузкой и жёсткими требованиями к горючести материалов.",
      "Решение — металлокассеты на алюминиевой подсистеме. Крепёж рассчитали под этажность и ветровой район, кассеты изготовили под размер каждого участка, узлы примыканий к витражам проработали отдельными чертежами.",
    ],
    done: [
      "Расчёт ветровой нагрузки и шага кронштейнов",
      "Подбор материалов по классу горючести",
      "Раскладка кассет с привязкой к витражам",
      "Изготовление кассет на своём производстве",
      "Монтаж с поэтапной приёмкой узлов",
      "Передача исполнительной документации",
    ],
  },
  {
    slug: "kottedzh-almaty",
    title: "Коттедж в Алматы",
    type: "cottage",
    status: "done",
    city: "Алматы",
    area: 450,
    subframe: "оцинкованная подсистема",
    materialSlug: "klinker-terrakota",
    materialLabel: "клинкер",
    year: null,
    image: "/images/projects/kottedzh-almaty.jpg",
    summary: "Кирпичный характер без кладки на вентилируемой системе.",
    about: [
      "Задача — облик клинкерного кирпича на коттедже сложной формы, без увеличения нагрузки на фундамент и без мокрых работ.",
      "Решение — клинкерная облицовка на оцинкованной подсистеме. Отдельно проработали углы, откосы и примыкания к кровле, чтобы рисунок кладки читался непрерывно по всему фасаду.",
    ],
    done: [
      "Замер и обмерный чертёж фасадов",
      "Теплотехника и расчёт подсистемы под вес облицовки",
      "Узлы углов, откосов и примыканий к кровле",
      "Подготовка элементов под размер",
      "Монтаж облицовки своей бригадой",
      "Сдача с проверкой узлов и гарантией",
    ],
  },
  {
    slug: "rekonstrukciya-almaty",
    title: "Реконструкция фасада в Алматы",
    type: "reconstruction",
    status: "in-progress",
    city: "Алматы",
    area: 280,
    subframe: "вентфасад",
    materialSlug: "keramogranit",
    materialLabel: "керамогранит",
    year: null,
    image: "/images/projects/rekonstrukciya-almaty.jpg",
    beforeImage: "/images/projects/rekonstrukciya-almaty-before.jpg",
    summary: "Новый тепловой контур и облицовка поверх старой стены.",
    about: [
      "Задача — вернуть зданию тепловой контур и современный облик: старая отделка разрушалась, стены промерзали, на внутренних углах появлялась плесень.",
      "Решение — вентилируемый фасад с керамогранитом поверх существующей стены. Обследовали основание, подобрали анкеры под его прочность, пересчитали утепление и вынесли точку росы из стены.",
    ],
    done: [
      "Обследование основания и демонтаж старой отделки",
      "Подбор анкеров под фактическую прочность стены",
      "Теплотехнический расчёт и вынос точки росы",
      "Новые узлы окон и цоколя",
      "Монтаж вентфасада с керамогранитом",
      "Исполнительная документация по завершении",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return {
    prev: projects[(i - 1 + n) % n]!,
    next: projects[(i + 1) % n]!,
  };
}

export function formatArea(area: number) {
  return `${new Intl.NumberFormat("ru-RU").format(area)} м²`;
}

export function projectAlt(p: Project) {
  return `Фасад объекта «${p.title}», ${p.materialLabel}`;
}
