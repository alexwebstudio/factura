// Скачивает стоковые фото с Unsplash в assets-src/photos/stock/.
// Лицензия Unsplash: бесплатно для коммерческого использования, атрибуция не обязательна
// (https://unsplash.com/license). Нельзя продавать фото как есть и собирать из них
// конкурирующий фотосток. Перед запуском всё равно лучше заменить их своими снимками объектов.
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "assets-src", "photos", "stock");

/** имя файла → id фото на images.unsplash.com */
export const STOCK = {
  "mat-keramogranit": "1536501483244-925da0b87089", // панели с гранитной крошкой
  "mat-metallokassety": "1614620382606-33d4b9ab36f9", // гнутые металлические кассеты
  "mat-fibrocement": "1614620304095-c45c3eee2449", // крупные панели на видимом крепеже
  "mat-klinker": "1595853146610-3c9af7ca3287", // здание в клинкерном кирпиче
  "mat-shtukaturnyj": "1651146416457-fbb8ac1263f4", // гладкие светлые стены
  "mat-hpl": "1568056919288-ccf3ca926925", // фасад с древесными панелями
  "hero-materials": "1604275493080-0f16a366acd1", // деревянные ламели, крупно
  "hero-projects": "1614595737476-42487331b8a1", // здание с деревянными ставнями
  "hero-production": "1735494033576-9c882e80504c", // лазерная резка листа
  "hero-about": "1503387762-592deb58ef4e", // архитектор за чертежом
  "hero-contacts": "1515713519566-6f9bf3b4a07a", // деревянная подшивка, геометрия
  "prod-welding": "1730584476141-232435a40c32", // сварка в цеху
  "prod-coils": "1697698532634-ea59b636ccea", // рулоны стали
  "prod-factory": "1496247749665-49cf5b1022e9", // интерьер цеха
};

await mkdir(dir, { recursive: true });
const credits = ["# Стоковые фото (Unsplash License)", ""];
for (const [name, id] of Object.entries(STOCK)) {
  const url = `https://images.unsplash.com/photo-${id}?w=2400&q=85&fm=jpg`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: ${res.status}`);
  await writeFile(path.join(dir, `${name}.jpg`), Buffer.from(await res.arrayBuffer()));
  credits.push(`- ${name}.jpg — https://images.unsplash.com/photo-${id}`);
  console.log("✓", name);
}
await writeFile(path.join(dir, "SOURCES.md"), credits.join("\n") + "\n");
