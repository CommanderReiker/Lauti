// Bewusst kuratierte Motive: keine automatisch geladenen Bilder oder Fremddienste.
export const pictures = {
  a: ['Apfel', 'Ampel'], b: ['Ball', 'Baum'], c: ['Clown'], d: ['Dose', 'Drache'],
  e: ['Ente', 'Esel'], f: ['Fenster', 'Fuchs'], g: ['Gabel', 'Geschenk'],
  h: ['Haus', 'Hut'], i: ['Igel', 'Insel'], j: ['Jacke'], k: ['Katze', 'Krone'],
  l: ['Lampe', 'Leiter'], m: ['Maus', 'Mond'], n: ['Nase', 'Nest'],
  o: ['Orange', 'Ofen'], p: ['Pilz', 'Pinsel'], q: ['Qualle'], r: ['Ring', 'Rakete'],
  s: ['Sonne', 'Socke'], t: ['Tasse', 'Tiger'], u: ['Uhr'], v: ['Vogel'],
  w: ['Wolke', 'Wurm'], x: ['Xylophon'], y: ['Yak'], z: ['Zelt', 'Zitrone'],
  ä: ['Äpfel'], ö: ['Öl'], ü: ['Überraschungsei']
};
export const isVowel = letter => /^[aeiouäöü]$/iu.test(letter);
export function parseWords(text) {
  const words = text.normalize('NFC').split(/[,;\n]+/u).map(w => w.trim()).filter(Boolean);
  if (!words.length) throw new Error('Trage mindestens ein Wort ein.');
  if (words.length > 4) throw new Error('Auf ein Blatt passen höchstens vier Wörter.');
  for (const word of words) {
    if ([...word].length > 12) throw new Error(`„${word}“ ist zu lang. Bitte höchstens 12 Buchstaben verwenden.`);
    for (const letter of word) {
      if (!pictures[letter.toLocaleLowerCase('de')]) throw new Error(`Für „${letter}“ gibt es noch kein Anlautbild. Nutze Wörter ohne Leerzeichen, Bindestriche oder ß.`);
    }
  }
  return words;
}
export function createPuzzles(text, random = Math.random) {
  return parseWords(text).map(word => ({ word, cells: [...word].map(letter => {
    const choices = pictures[letter.toLocaleLowerCase('de')];
    return { letter, picture: choices[Math.floor(random() * choices.length)] };
  }) }));
}
export function cyclePicture(cell) {
  const choices = pictures[cell.letter.toLocaleLowerCase('de')];
  cell.picture = choices[(choices.indexOf(cell.picture) + 1) % choices.length];
}
