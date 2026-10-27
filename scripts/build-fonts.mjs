// Собирает woff2 из OFL-исходников в assets-src/fonts → public/fonts.
// Golos Text и JetBrains Mono — вариативные TTF из github.com/google/fonts (OFL 1.1):
// пиним ось wght в статические начертания и оставляем латиницу + кириллицу + типографику.
//
// Petale и DachaPro сюда НЕ попадают: лицензия DachaPro (otlab.ru) запрещает менять формат
// файла и состав знаков, у Petale — «All rights reserved». Они лежат в public/fonts как есть.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import subsetFont from "subset-font";

const SRC = new URL("../assets-src/fonts/", import.meta.url);
const OUT = new URL("../public/fonts/", import.meta.url);

const RANGES = [
  [0x0020, 0x007e], // Basic Latin
  [0x00a0, 0x00ff], // Latin-1: « » ° ² × ·
  [0x0400, 0x04ff], // Кириллица, включая казахские ә ғ қ ң ө ұ ү һ і
  [0x2010, 0x2027], // тире, кавычки, многоточие
  [0x2030, 0x203a],
  [0x20b8, 0x20b8], // ₸
  [0x20bd, 0x20bd], // ₽
  [0x2116, 0x2116], // №
  [0x2190, 0x2199], // стрелки → ↗
  [0x2212, 0x2212], // минус
];

const text = RANGES.flatMap(([a, b]) =>
  Array.from({ length: b - a + 1 }, (_, i) => String.fromCodePoint(a + i)),
).join("");

const jobs = [
  { src: "GolosText-VF.ttf", out: "GolosText-400.woff2", wght: 400 },
  { src: "GolosText-VF.ttf", out: "GolosText-500.woff2", wght: 500 },
  { src: "JetBrainsMono-VF.ttf", out: "JetBrainsMono-400.woff2", wght: 400 },
];

await mkdir(OUT, { recursive: true });

for (const job of jobs) {
  const input = await readFile(new URL(job.src, SRC));
  const output = await subsetFont(input, text, {
    targetFormat: "woff2",
    variationAxes: { wght: job.wght },
  });
  await writeFile(new URL(job.out, OUT), output);
  console.log(`${job.out.padEnd(26)} ${(output.length / 1024).toFixed(1)} KB`);
}
