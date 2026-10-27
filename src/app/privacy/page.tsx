import type { Metadata } from "next";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Heading } from "@/components/ui/Heading";
import { SectionCard } from "@/components/ui/SectionCard";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Политика конфиденциальности",
  description: `Как ${site.name} обрабатывает и защищает персональные данные, оставленные в формах сайта.`,
  path: "/privacy",
});

/** TODO(client): согласовать текст с юристом и вписать реквизиты в content/site.ts. */
const sections = [
  {
    title: "Общие положения",
    text: [
      `Политика определяет порядок обработки персональных данных пользователей сайта ${site.url.replace("https://", "")}. Оператор — ${site.legal.entity}, ${site.legal.bin}, ${site.contacts.address}.`,
      "Обработка ведётся в соответствии с Законом Республики Казахстан «О персональных данных и их защите». Отправляя форму на сайте, пользователь соглашается с этой политикой.",
    ],
  },
  {
    title: "Какие данные мы получаем",
    text: ["Имя, номер телефона, предпочтительный способ связи и комментарий, который пользователь указывает в форме заявки. Технические данные: IP-адрес и сведения о браузере — для защиты формы от автоматических отправок."],
  },
  {
    title: "Зачем мы их используем",
    text: ["Чтобы связаться с пользователем по его заявке, договориться о замере и подготовить расчёт. Данные не используются для рассылок и не передаются третьим лицам, кроме случаев, предусмотренных законом."],
  },
  {
    title: "Хранение и защита",
    text: [
      "Заявки передаются по защищённому соединению и хранятся не дольше, чем это нужно для работы по заявке и исполнения договора. Доступ к данным есть только у сотрудников, которые работают с заявками.",
    ],
  },
  {
    title: "Права пользователя",
    text: [
      `Пользователь может запросить сведения о своих данных, их изменение или удаление, а также отозвать согласие, написав на ${site.contacts.email}. Запрос рассматривается в сроки, установленные законодательством.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <SectionCard tone="surface" className="!pt-[calc(var(--header-h)+40px)]">
      <Breadcrumbs items={[{ name: "Политика конфиденциальности", path: "/privacy" }]} />
      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <Heading level="h1" lines={["Политика", "*конфиденциальности*"]} cascade instant />
        </div>
        <div className="flex flex-col gap-10 lg:col-span-7 lg:col-start-6">
          {sections.map((s, i) => (
            <section key={s.title} className="border-t border-line pt-6">
              <h2 className="t-h3 mb-4">
                <span className="t-mono mr-3 !text-[13px] text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              {s.text.map((t) => (
                <p key={t.slice(0, 20)} className="mt-3 leading-relaxed text-ink-muted">
                  {t}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
