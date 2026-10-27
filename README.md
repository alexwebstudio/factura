# ФАКТУРА · инженерные фасады

Многостраничный сайт фасадной компании: Next.js 16 (App Router, Turbopack), TypeScript strict, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # продакшн-сборка
npm run typecheck  # tsc --noEmit
```

## Что заполнить перед запуском

### 1. Тексты и данные — `src/content/`

Все тексты, цифры и контакты лежат в `src/content/*.ts`. В компонентах ничего не захардкожено. Поиск по `TODO(client)` покажет каждое место, где нужны ваши данные.

| Файл | Что внутри |
|---|---|
| `site.ts` | **домен, город, часовой пояс, телефон/WhatsApp/Telegram/почта, адрес, реквизиты, ссылка на карту, ключевые цифры (12 лет, 240+, гарантия)**, тексты героя, манифеста, процесса, CTA |
| `materials.ts` | 6 материалов: применение, срок службы, `priceFrom` (сейчас `null` → «цена по расчёту»), описание, преимущества |
| `projects.ts` | объекты — **сейчас демо-данные**; `year: null` скрывает строку «Год», `mapUrl` включает кнопку «Смотреть на карте» |
| `calculate.ts`, `layers.ts`, `regulations.ts`, `documents.ts`, `faq.ts` | секции главной |
| `pages.ts` | hero и SEO внутренних страниц, производство (**список оборудования — заглушка**), «О компании», 404, «Спасибо» |
| `nav.ts` | меню, мега-меню, футер, мессенджеры |

Заголовки задаются массивом строк: каждая строка — отдельная строка каскада, `*слово*` — курсивный акцент Petale Thin Italic.

### 2. Переменные окружения

Скопируйте `.env.example` в `.env.local` и заполните:

- `TELEGRAM_BOT_TOKEN` — токен бота от @BotFather;
- `TELEGRAM_CHAT_ID` — чат, куда приходят заявки.

В режиме разработки без этих переменных заявка просто пишется в консоль сервера. В продакшне форма без них вернёт ошибку «Форма временно недоступна».

### 3. Фотографии — `public/images/`

Сейчас там лежат временные кадры. Их нарезает `npm run images` из двух источников:

- **`assets-src/photos/ref*.jpg`** — присланные референсы. Из них сделаны hero главной, «240+», «Процесс» и 4 объекта.
- **`assets-src/photos/stock/`** — стоковые фото Unsplash (`npm run stock` скачивает их заново, список и ссылки — в `SOURCES.md`). Из них сделаны материалы, hero внутренних страниц и галерея производства. Лицензия Unsplash разрешает коммерческое использование без атрибуции.

Правило: одна картинка — одно место. Скрипт падает, если два слота берут один и тот же фрагмент исходника или одно стоковое фото. Одна и та же картинка встречается на разных страницах, только если это карточка одного и того же материала или объекта (каталог → страница объекта).

Реальные снимки кладите **с теми же именами** поверх временных:

| Папка | Пропорция | Файлы |
|---|---|---|
| `hero/` | 16:9 | `home`, `materials`, `projects`, `production`, `about`, `contacts` |
| `hero/` | 4:5 | `home-mobile` — вертикальный кадр героя главной для телефонов |
| `home/` | 3:2 / 4:3 | `trust` — карточка «240+»; `process` — секция «Процесс» |
| `materials/` | 4:5 | `keramogranit`, `metallokassety`, `fibrocement`, `klinker-terrakota`, `shtukaturnyj`, `hpl` |
| `projects/` | 4:3 | по `slug` объекта; для реконструкции — ещё `…-before.jpg` для шторки «до/после» |
| `production/` | 3:2 | `welding`, `coils`, `factory` |

Новые объекты: добавьте запись в `projects.ts` и фото `public/images/projects/<slug>.jpg`.

### 4. Шрифты — `public/fonts/`

| Шрифт | Файлы | Роль |
|---|---|---|
| Petale Thin + Italic | `Petale-Thin.otf`, `Petale-Thin-Italic.otf` | Display: вордмарк, h1/h2, крупные цифры — **только от 38px** |
| DachaPro Regular | `DachaPro-Regular.otf` | eyebrow, подписи, капсы, логотип в шапке |
| Golos Text 400/500 | `GolosText-*.woff2` | весь текст и интерфейс |
| JetBrains Mono 400 | `JetBrainsMono-400.woff2` | числа, сроки, ТТХ (tabular-nums) |

Golos 600 и JetBrains Mono 500 в макете не используются, поэтому не подключены: каждое лишнее начертание — это лишний запрос на первом экране. Нужны — добавьте их в `scripts/build-fonts.mjs` и `src/lib/fonts.ts`.

- **Petale и DachaPro подключены оригинальными `.otf` без конвертации и сабсета.** В лицензии DachaPro (otlab.ru, `DachaPro-LICENSE.txt`) прямо запрещено «изменение формата файла» и «внесение изменений в состав знаков». У Petale в комплекте только строка «All rights reserved». Перед сдачей клиенту уточните у авторов условия коммерческого использования на сайте. Если разрешат конвертацию — положите `.woff2` и поменяйте пути в `src/lib/fonts.ts`.
- Golos Text и JetBrains Mono распространяются по OFL, исходники и лицензии лежат в `assets-src/fonts/`. `npm run fonts` собирает из вариативных TTF статичные `.woff2` (латиница + кириллица, включая казахские буквы, ₸, №, стрелки).
- Шрифт логотипа меняется в одном месте: `--font-logo` в `src/app/globals.css`.

### 5. Логотип

`src/components/ui/Logo.tsx` — временный знак (сложенная плоскость, 1px, `currentColor`) и вордмарк текстом. Финальный знак замените в `Mark`, фавикон — в `src/app/icon.svg`.

## Устройство

```
src/
  app/           страницы, api/lead, sitemap, robots, opengraph-image
  components/
    layout/      Header, MegaMenu, MobileMenu, Footer, SmoothScroll, Clocks
    home/        секции главной (Hero, Manifesto, WhatWeCalculate, FacadeSection, …)
    ui/          примитивы: Heading, Reveal, SectionCard, SpecTable, BeforeAfter, Modal, Accordion…
    forms/       LeadForm, LeadModal (глобальная модалка), LeadButton
    projects/    ProjectsExplorer (фильтр объектов)
  content/       все тексты и данные
  lib/           fonts, gsap, seo, validation, splitWords
  hooks/         useReveal, useCountUp, useLockBody, useScrolled, useMediaQuery
```

- **Прелоадер** (адаптация aw-flow «preloader-logo»): буквы ФАКТУРА поднимаются из-под маски, затем шторка уходит вверх. Показывается один раз за сессию, при reduced motion не показывается. Интро героя стоит на паузе, пока шторка на экране. Код — `components/layout/Preloader.tsx`, `lib/preloader.ts`.
- **Tilt-in карточек** (адаптация aw-flow «tilt-in»): элементу с `data-reveal="tilt"` внутри `<Reveal>` достаётся подъём из наклона rotateX 35° с перспективой 1200px.
- **Анимации.** Начальные состояния reveal задаёт CSS только при включённом JS (`html.js`) и без `prefers-reduced-motion`. GSAP везде делает `.to()` с `once: true`. При reduced motion Lenis не включается, анимации не играют.
- **Заголовки** рендерятся дважды: цельный `sr-only` h1/h2 для SEO и визуальная копия, разбитая на слова функцией `splitWords()`.
- **Шапка** светлеет или темнеет сама: поверх блока с `data-hero="dark"` текст светлый, иначе тёмный (CSS `:has`).
- **Формы**: zod + react-hook-form, маска телефона `+7 (XXX) XXX-XX-XX` с поддержкой международного ввода через `+`, honeypot, rate-limit 5 заявок на IP за 10 минут (in-memory).
- **SEO**: `generateMetadata` на каждой странице, canonical, OG/Twitter, JSON-LD (Organization, LocalBusiness, BreadcrumbList, FAQPage, CreativeWork), динамические sitemap и robots.

## Производительность

Lighthouse 12, продакшн-сборка (`next build && next start`), прогрев кэша картинок:

| Профиль | Performance | Accessibility | Best Practices | SEO | CLS |
|---|---|---|---|---|---|
| Десктоп, главная | 99 | 100 | — | — | 0 |
| Мобильный (4G-симуляция), главная / материалы / объект / контакты | 81–86 | 100 | 100 | 100 | 0 |

На мобильном LCP в симуляции 4.0–4.8с: цель ≥ 90 не достигнута. Главный вес первого экрана — шрифты Petale и DachaPro в OTF (~190 КБ), их лицензия не разрешает конвертацию и сабсет. Если авторы разрешат woff2 с сабсетом латиница+кириллица, это сэкономит примерно 150 КБ. Второй вариант — убрать DachaPro с первого экрана (логотип, подписи в героях).

Первый экран анимируется чистым CSS (`.anim-in`, `.anim-word`, `.anim-letter`), а не GSAP: так LCP не ждёт гидратацию. Fade при переходе между страницами играет только при клиентской навигации.

> Путь проекта содержит кириллицу (`ФАКТУРА`). Turbopack на Next 16.4 собирает его без проблем, но все пути **внутри** проекта — только латиница.
