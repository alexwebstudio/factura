import localFont from "next/font/local";

/**
 * Petale Thin — только Display от 38px (вордмарк, h1/h2, крупные цифры).
 * Подключён оригинальным OTF: условия авторов не разрешают конвертацию.
 */
export const petale = localFont({
  src: [
    { path: "../../public/fonts/Petale-Thin.otf", weight: "200", style: "normal" },
    { path: "../../public/fonts/Petale-Thin-Italic.otf", weight: "200", style: "italic" },
  ],
  variable: "--font-petale",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

/**
 * DachaPro — техподписи, eyebrow, мелкие капсы. Один вес.
 * Лицензия otlab.ru запрещает менять формат файла — поэтому OTF как есть.
 */
export const dacha = localFont({
  src: [{ path: "../../public/fonts/DachaPro-Regular.otf", weight: "400", style: "normal" }],
  variable: "--font-dacha",
  display: "swap",
  preload: false,
  fallback: ["Arial", "sans-serif"],
});

export const golos = localFont({
  src: [
    { path: "../../public/fonts/GolosText-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/GolosText-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-golos",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

export const jetbrains = localFont({
  src: [
    { path: "../../public/fonts/JetBrainsMono-400.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "Consolas", "monospace"],
});

export const fontVariables = [petale.variable, dacha.variable, golos.variable, jetbrains.variable].join(" ");
