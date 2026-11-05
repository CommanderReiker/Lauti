import test from 'node:test';
import assert from 'node:assert/strict';
import { parseWords, createPuzzles, cyclePicture, pictures, isVowel } from '../src/puzzles.js';
import { illustration } from '../src/art.js';
test('Fenster produces seven matching anlaut pictures and two vowel fields', () => {
  const [{ cells }] = createPuzzles('Fenster', () => 0);
  assert.deepEqual(cells.map(c => c.picture), ['Fenster','Ente','Nase','Sonne','Tasse','Ente','Ring']);
  assert.deepEqual(cells.map(c => isVowel(c.letter)), [false,true,false,false,false,true,false]);
});
test('alternate images cycle and single-choice images remain stable', () => {
  const [{cells}] = createPuzzles('Fq', () => 0);
  cyclePicture(cells[0]); assert.equal(cells[0].picture, 'Fuchs');
  cyclePicture(cells[0]); assert.equal(cells[0].picture, 'Fenster');
  cyclePicture(cells[1]); assert.equal(cells[1].picture, 'Qualle');
});
test('all curated pictures have SVGs and matching initial letters', () => {
  for (const [letter, names] of Object.entries(pictures)) for (const name of names) {
    assert.equal(name[0].toLocaleLowerCase('de'),letter);
    assert.match(illustration(name), /<svg.*viewBox="0 0 100 100"/);
  }
});
test('normalizes German umlauts and accepts four words', () => {
  assert.deepEqual(parseWords(' A\u0308pfel, Öl; Uhr\nEnte '), ['Äpfel','Öl','Uhr','Ente']);
  assert.ok(isVowel('Ü')); assert.equal(isVowel('Y'),false);
});
test('rejects unsupported characters, empty input and overflowing pages', () => {
  for (const text of ['', 'Straße','Hallo Welt','<img>','abcdefghijklmn','a,b,c,d,e','123']) assert.throws(() => parseWords(text));
});
