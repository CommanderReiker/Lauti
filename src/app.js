import { createPuzzles, cyclePicture, isVowel, pictures } from './puzzles.js';
import { illustration } from './art.js';
const $ = selector => document.querySelector(selector);
let puzzles = createPuzzles($('#words').value);
function render() {
  const solution = $('#solution').checked;
  const uppercase = $('#uppercase').checked;
  $('#sheet').classList.toggle('has-solution', solution);
  $('#puzzles').replaceChildren(...puzzles.map((puzzle, row) => {
    const section = document.createElement('section');
    section.className = 'puzzle';
    section.setAttribute('aria-label', `Rätsel ${row + 1}`);
    const heading = document.createElement('div');
    heading.className = 'puzzle-heading';
    heading.innerHTML = `<span class="puzzle-number">${row + 1}</span><span>Schau genau hin und höre den Anfang.</span><span class="word-length">${puzzle.cells.length} Buchstaben</span>`;
    const cells = document.createElement('div');
    cells.className = 'cells';
    cells.style.setProperty('--count', puzzle.cells.length);
    puzzle.cells.forEach((cell, index) => {
      const item = document.createElement('div');
      item.className = 'cell';
      const button = document.createElement('button');
      button.className = 'picture';
      button.type = 'button';
      const canChange = pictures[cell.letter.toLocaleLowerCase('de')].length > 1;
      button.disabled = !canChange;
      button.setAttribute('aria-label', `${cell.picture}${canChange ? ': Bild wechseln' : ': kein weiteres Motiv'}`);
      button.title = canChange ? `${cell.picture} · Tippen zum Wechseln` : cell.picture;
      button.innerHTML = illustration(cell.picture);
      button.addEventListener('click', () => {
        cyclePicture(cell); render();
        $('#status').textContent = `Bild gewechselt: ${cell.picture}.`;
        $('#puzzles').children[row].querySelectorAll('.picture')[index].focus();
      });
      const label = document.createElement('span');
      label.className = 'picture-name'; label.textContent = cell.picture;
      const box = document.createElement('div');
      box.className = `letter-box${isVowel(cell.letter) ? ' vowel' : ''}`;
      box.textContent = solution ? uppercase ? cell.letter.toLocaleUpperCase('de') : index === 0 ? cell.letter.toLocaleUpperCase('de') : cell.letter.toLocaleLowerCase('de') : '';
      box.setAttribute('aria-label', solution ? `Lösung: ${box.textContent}` : `Leeres Schreibfeld${isVowel(cell.letter) ? ' für einen Selbstlaut' : ''}`);
      item.append(button, label, box); cells.append(item);
    });
    section.append(heading, cells); return section;
  }));
}
function generate() {
  try {
    const next = createPuzzles($('#words').value);
    puzzles = next; $('#error').hidden = true; $('#words').removeAttribute('aria-invalid');
    render(); $('#status').textContent = `Lernblatt mit ${puzzles.length} Rätseln erstellt.`;
  } catch (error) {
    $('#error').textContent = error.message; $('#error').hidden = false;
    $('#words').setAttribute('aria-invalid', 'true'); $('#words').setAttribute('aria-describedby', 'error');
    $('#words').focus();
  }
}
$('#word-form').addEventListener('submit', event => { event.preventDefault(); generate(); });
$('#shuffle').addEventListener('click', () => {
  puzzles.forEach(puzzle => puzzle.cells.forEach(cyclePicture)); render();
  $('#status').textContent = 'Alle verfügbaren Alternativbilder wurden gewechselt.';
});
$('#solution').addEventListener('change', render);
$('#uppercase').addEventListener('change', render);
$('#print').addEventListener('click', () => window.print());
render();
