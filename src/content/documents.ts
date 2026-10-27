import { site } from "./site";

export const documentsSection = {
  eyebrow: "Гарантии",
  lines: ["Всё *на бумаге*", "до начала работ"],
  lead: "Документы, которые вы получаете на руки, — от сметы до гарантийного письма.",
  caption: "Сначала договор и смета — потом первый крепёж.",
} as const;

export const documents = [
  {
    icon: "contract",
    title: "Договор и фикс-смета",
    text: "Стоимость не меняется по ходу работ.",
  },
  {
    icon: "permit",
    title: "СРО и допуски",
    text: "Работаем легально, с допусками на работы.",
  },
  {
    icon: "folder",
    title: "Исполнительная документация",
    text: "Передаём после сдачи объекта.",
  },
  {
    icon: "warranty",
    title: "Гарантия",
    text: `На монтаж до ${site.facts.warrantyYears} лет, на материалы — по сертификату.`,
  },
] as const;
