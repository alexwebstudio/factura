export type WordToken = { text: string; italic: boolean };

/**
 * Разбирает строку заголовка на слова. `*слово*` — курсивный акцент (Petale Thin Italic).
 * «*в разрезе*» → [{text:"в", italic:true}, {text:"разрезе", italic:true}]
 */
export function splitWords(line: string): WordToken[] {
  const tokens: WordToken[] = [];
  line.split(/(\*[^*]+\*)/g).forEach((chunk) => {
    if (!chunk) return;
    const italic = chunk.startsWith("*") && chunk.endsWith("*");
    const text = italic ? chunk.slice(1, -1) : chunk;
    text
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => tokens.push({ text: word, italic }));
  });
  return tokens;
}

/** Строка без разметки — для sr-only заголовка, alt и метаданных. */
export function plainText(lines: readonly string[] | string) {
  const arr = typeof lines === "string" ? [lines] : lines;
  return arr.join(" ").replace(/\*/g, "").replace(/\s+/g, " ").trim();
}
