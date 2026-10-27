// Нарезает временные фото из assets-src/photos в public/images под имена из src/content/*.ts.
//
// Правило: ни один фрагмент исходника не показывается на сайте дважды. У каждого слота своя
// область (rect в пикселях исходника), и скрипт падает, если области одного исходника пересекаются.
// Исключение — слоты одной группы (art direction героя: десктопный и мобильный кадр одного места).
//
// Когда придут реальные снимки — положите их поверх с теми же именами
// (hero 16:9, объекты 4:3, производство 3:2), скрипт больше не нужен.
import { mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = (name) => path.join(root, "assets-src", "photos", name);
const out = (rel) => path.join(root, "public", "images", rel);

const PHOTO = {
  pavilion: src("ref1.jpg"), // 644×470 — павильон с панорамным остеклением
  slats: src("ref2.jpg"), // 736×907 — дом с ламелями и светлыми панелями
  mountain: src("ref3.jpg"), // 736×920 — дом в горах, камень и бетон
  metal: src("ref4.jpg"), // 735×910 — тёмный металл + дерево
  wood: src("ref5.jpg"), // 736×1308 — вертикальные ламели, деталь
  pines: src("ref7.jpg"), // 736×736 — тёмный дом в соснах
  evening: src("ref8.jpg"), // 1376×768 — фасад с ламелями на закате (hero главной)
};

/** [файл, исходник, область {left, top, width, height}, итоговый размер [w, h], группа?] */
const jobs = [
  ["hero/home.jpg", PHOTO.evening, { left: 0, top: 0, width: 1376, height: 768 }, [1920, 1072], "hero"],
  ["hero/home-mobile.jpg", PHOTO.evening, { left: 560, top: 0, width: 614, height: 768 }, [1080, 1350], "hero"],

  ["home/trust.jpg", PHOTO.pavilion, { left: 0, top: 40, width: 644, height: 430 }, [1200, 800]],
  ["home/process.jpg", PHOTO.wood, { left: 0, top: 0, width: 736, height: 552 }, [1440, 1080]],

  ["projects/chastnyj-dom-almaty.jpg", PHOTO.slats, { left: 0, top: 355, width: 736, height: 552 }, [1440, 1080]],
  ["projects/biznes-centr-astana.jpg", PHOTO.metal, { left: 0, top: 0, width: 640, height: 480 }, [1440, 1080]],
  ["projects/kottedzh-almaty.jpg", PHOTO.mountain, { left: 0, top: 250, width: 736, height: 552 }, [1440, 1080]],
  ["projects/rekonstrukciya-almaty.jpg", PHOTO.pines, { left: 0, top: 92, width: 736, height: 552 }, [1440, 1080], "rekon"],

];

// Стоковые фото Unsplash (scripts/fetch-stock.mjs): каждое используется ровно в одном слоте,
// поэтому область — весь кадр, обрезка cover по центру (или по `position`).
const stock = (name) => path.join(root, "assets-src", "photos", "stock", `${name}.jpg`);
const stockJobs = [
  ["materials/keramogranit.jpg", "mat-keramogranit", [960, 1200]],
  ["materials/metallokassety.jpg", "mat-metallokassety", [960, 1200]],
  ["materials/fibrocement.jpg", "mat-fibrocement", [960, 1200]],
  ["materials/klinker-terrakota.jpg", "mat-klinker", [960, 1200]],
  ["materials/shtukaturnyj.jpg", "mat-shtukaturnyj", [960, 1200]],
  ["materials/hpl.jpg", "mat-hpl", [960, 1200]],
  ["hero/materials.jpg", "hero-materials", [1920, 1080]],
  ["hero/projects.jpg", "hero-projects", [1920, 1080], "north"],
  ["hero/production.jpg", "hero-production", [1920, 1080]],
  ["hero/about.jpg", "hero-about", [1920, 1080]],
  ["hero/contacts.jpg", "hero-contacts", [1920, 1080]],
  ["production/welding.jpg", "prod-welding", [1440, 960]],
  ["production/coils.jpg", "prod-coils", [1440, 960]],
  ["production/factory.jpg", "prod-factory", [1440, 960]],
];

const outputs = [...jobs.map((j) => j[0]), ...stockJobs.map((j) => j[0]), "projects/rekonstrukciya-almaty-before.jpg"];
const dupes = outputs.filter((o, i) => outputs.indexOf(o) !== i);
if (dupes.length) throw new Error(`Один файл назначен дважды: ${dupes.join(", ")}`);
const stockNames = stockJobs.map((j) => j[1]);
if (new Set(stockNames).size !== stockNames.length) throw new Error("Стоковое фото использовано дважды");

// ── Проверка: области одного исходника не пересекаются ──
const overlap = (a, b) =>
  a.left < b.left + b.width && b.left < a.left + a.width && a.top < b.top + b.height && b.top < a.top + a.height;
for (let i = 0; i < jobs.length; i++) {
  for (let j = i + 1; j < jobs.length; j++) {
    const [fa, sa, ra, , ga] = jobs[i];
    const [fb, sb, rb, , gb] = jobs[j];
    if (sa === sb && !(ga && ga === gb) && overlap(ra, rb)) {
      throw new Error(`Повтор фрагмента: ${fa} и ${fb} берут одну и ту же область исходника`);
    }
  }
}

// Старые нарезки удаляем, чтобы в public/images не осталось неиспользуемых файлов
for (const dir of ["hero", "home", "materials", "projects", "production"]) {
  await rm(out(dir), { recursive: true, force: true });
}

for (const [rel, file, region, [w, h]] of jobs) {
  const target = out(rel);
  await mkdir(path.dirname(target), { recursive: true });
  await sharp(file)
    .extract(region)
    .resize(w, h, { fit: "cover", kernel: "lanczos3" })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(target);
  console.log("✓", rel);
}

for (const [rel, name, [w, h], position = "centre"] of stockJobs) {
  const target = out(rel);
  await mkdir(path.dirname(target), { recursive: true });
  await sharp(stock(name))
    .resize(w, h, { fit: "cover", position, kernel: "lanczos3" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(target);
  console.log("✓", rel, "← stock", name);
}

// «До» для реконструкции — обесцвеченная копия того же кадра, только для демонстрации шторки.
await sharp(PHOTO.pines)
  .extract({ left: 0, top: 92, width: 736, height: 552 })
  .resize(1440, 1080)
  .grayscale()
  .modulate({ brightness: 0.78 })
  .blur(0.6)
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(out("projects/rekonstrukciya-almaty-before.jpg"));
console.log("✓ projects/rekonstrukciya-almaty-before.jpg");
