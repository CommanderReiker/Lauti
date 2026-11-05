const path = d => `<path d="${d}"/>`;
const circle = (x,y,r,fill='none') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const rect = (x,y,w,h,fill='none',rx=3) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`;
const eye = (x,y) => circle(x,y,1.7,'#37483f');
const colors = {green:'#b7d6ab',yellow:'#f4d675',red:'#e6a08a',blue:'#acd0da'};
const {green:g,yellow:y,red:r,blue:b}=colors;
const apple = rect(47,17,5,12,g)+path('M50 21 Q65 10 68 20 Q62 29 51 26')+`<path d="M50 34 C22 18 15 49 27 68 Q37 82 50 74 Q65 82 75 63 C87 36 66 22 50 34Z" fill="${r}"/>`;
const duck = `<path d="M30 52 C12 35 16 68 35 73 Q72 88 78 55 L59 55 C73 44 65 25 52 29 Q35 32 43 49Z" fill="${y}"/>`+eye(55,38)+`<path d="M64 39 L79 45 L64 49Z" fill="${r}"/>`+path('M34 56 Q43 72 56 58 M15 83 H83');
const cat = `<path d="M27 45 L26 20 L44 33 Q51 28 60 33 L77 20 L75 46 Q87 78 51 80 Q15 78 27 45Z" fill="${y}"/>`+eye(39,50)+eye(62,50)+path('M47 59 L54 59 L50 63Z M50 63 Q42 71 39 64 M50 63 Q58 71 62 64 M31 60 L15 56 M31 66 L15 68 M70 60 L86 56 M70 66 L86 68');
const motifs = {
Apfel: apple, Äpfel:`<g transform="translate(-4 14) scale(.72)">${apple}</g><g transform="translate(36 1) scale(.6)">${apple}</g>`,
Ampel: rect(33,12,34,72,'#e5e9e2',9)+circle(50,26,8,r)+circle(50,48,8,y)+circle(50,70,8,g)+path('M50 84 V94'),
Ball: circle(50,50,32,b)+path('M20 40 Q49 52 77 28 M35 21 Q60 50 36 79 M22 66 Q52 52 78 67'),
Baum: rect(44,57,12,32,'#cda98c')+circle(32,43,19,g)+circle(65,42,21,g)+circle(48,27,22,g),
Clown: circle(50,52,27,'#fff3d8')+circle(23,43,12,r)+circle(78,43,12,r)+`<path d="M30 25 L49 5 L68 25Z" fill="${b}"/>`+eye(40,47)+eye(60,47)+circle(50,56,6,r)+path('M36 65 Q50 81 65 65'),
Dose: rect(26,27,48,50,b)+`<ellipse cx="50" cy="27" rx="24" ry="8" fill="#dce9ec"/>`+path('M27 68 Q50 80 74 68 M31 39 H69 M31 59 H69'),
Drache: `<path d="M49 10 L76 43 L50 76 L23 43Z" fill="${r}"/>`+path('M49 10 L50 76 M23 43 H76 M50 76 Q30 92 65 94')+path('M40 82 L34 76 L34 87Z M54 91 L60 84 L61 96Z'),
Ente: duck,
Esel: `<path d="M34 39 Q18 4 30 7 L45 33 L55 33 Q70 1 76 8 L68 43 Q81 76 54 83 Q23 83 29 57Z" fill="#c9c8ba"/>`+eye(41,51)+eye(61,51)+`<ellipse cx="50" cy="70" rx="17" ry="12" fill="#eee7d9"/>`+eye(44,70)+eye(57,70),
Fenster: rect(20,17,60,65,b)+rect(16,13,68,73,'none',1)+path('M50 18 V81 M21 48 H79 M11 86 H89'),
Fuchs: `<path d="M20 26 L24 8 L42 28 L59 28 L78 8 L82 29 L75 61 L50 84 L25 61Z" fill="#e7a16c"/><path d="M25 47 L49 70 L76 47 L71 66 L50 84 L29 66Z" fill="#fff5df"/>`+eye(35,43)+eye(65,43)+circle(50,71,4,'#37483f'),
Gabel: path('M35 15 V38 Q35 51 50 51 Q65 51 65 38 V15 M45 15 V40 M55 15 V40 M50 51 V88'),
Geschenk: rect(19,40,62,43,r)+rect(15,29,70,15,y)+rect(44,30,12,53,g)+path('M50 29 Q20 26 31 14 Q46 5 50 29 Q57 6 70 15 Q79 30 50 29'),
Haus: `<path d="M16 44 L50 14 L84 44Z" fill="${r}"/>`+rect(25,44,50,40,'#fff3d8')+rect(44,59,15,25,g)+rect(29,52,10,12,b),
Hut: `<path d="M29 59 L35 23 Q50 14 66 23 L73 59Z" fill="${g}"/>`+rect(29,49,44,10,y)+`<ellipse cx="50" cy="66" rx="38" ry="9" fill="${g}"/>`,
Igel: `<path d="M16 67 L13 49 L25 51 L24 33 L37 38 L43 20 L53 33 L66 24 L69 43 L80 39 L78 60 L91 69 Q68 84 27 77Z" fill="#c4aa87"/>`+eye(77,66)+circle(90,69,3,'#37483f')+path('M30 78 V83 M61 79 V84'),
Insel: `<ellipse cx="50" cy="75" rx="37" ry="11" fill="${b}"/><ellipse cx="50" cy="69" rx="26" ry="9" fill="${y}"/>`+path('M49 65 Q61 39 52 25')+`<path d="M52 26 Q29 9 21 33 Q38 24 52 26 Q78 6 84 34 Q66 23 52 26 Q36 36 35 48 Q53 39 52 26Z" fill="${g}"/>`,
Jacke: `<path d="M35 22 L23 27 L9 58 L23 65 L32 46 L30 84 H70 L68 46 L78 65 L91 58 L77 27 L65 22 L50 35Z" fill="${b}"/>`+path('M50 35 V84 M35 22 L43 42 L50 35 L57 42 L65 22 M35 62 H43 M58 62 H65'),
Katze: cat,
Krone: `<path d="M22 72 L15 29 L37 46 L50 20 L63 46 L85 29 L77 72Z" fill="${y}"/>`+path('M22 62 H78')+circle(50,53,4,r),
Lampe: `<path d="M34 16 H66 L80 51 H20Z" fill="${y}"/>`+path('M50 52 V82 M31 84 H69 M65 52 V65')+circle(65,68,3,r),
Leiter: path('M30 12 V89 M70 12 V89 M30 23 H70 M30 39 H70 M30 55 H70 M30 71 H70 M30 85 H70'),
Maus: `<path d="M27 72 Q8 81 12 55 Q15 41 25 48"/>`+`<ellipse cx="53" cy="58" rx="29" ry="21" fill="#cec9bf"/>`+circle(43,34,13,'#cec9bf')+circle(43,34,7,r)+eye(68,53)+circle(82,62,3,'#37483f')+path('M75 65 L90 72 M75 60 L92 57'),
Mond: `<path d="M65 15 C11 4 7 83 64 83 Q36 62 42 41 Q45 25 65 15Z" fill="${y}"/>`+path('M77 23 V35 M71 29 H83 M77 53 V65 M71 59 H83'),
Nase: path('M38 17 Q46 35 32 61 Q26 74 41 76 Q50 88 60 75 Q76 74 67 63 M36 72 Q41 67 46 73 M54 73 Q60 67 64 72'),
Nest: `<path d="M15 55 Q50 42 85 55 Q83 83 50 85 Q18 82 15 55Z" fill="#c7aa83"/>`+`<ellipse cx="40" cy="48" rx="10" ry="15" fill="#fff5dc"/><ellipse cx="60" cy="47" rx="10" ry="16" fill="#fff5dc"/>`+path('M19 61 L77 73 M25 75 L80 59 M29 81 L72 65'),
Orange: circle(50,55,29,'#efb568')+path('M50 25 V16')+`<path d="M50 22 Q62 5 75 17 Q66 31 50 22Z" fill="${g}"/>`+circle(35,49,1)+circle(42,62,1)+circle(31,60,1),
Ofen: rect(21,17,58,69,'#d1dbdb')+rect(29,42,42,35,'#fff5db')+circle(33,29,3)+circle(50,29,3)+circle(67,29,3)+path('M36 51 H64'),
Pilz: `<path d="M44 48 L37 84 H64 L57 48Z" fill="#f1e3c9"/><path d="M13 49 Q50 -12 87 49Z" fill="${r}"/>`+circle(40,32,5,'#fff8e8')+circle(60,37,6,'#fff8e8'),
Pinsel: `<path d="M43 45 L40 86 Q50 96 60 86 L57 45Z" fill="${y}"/>`+rect(41,37,18,13,'#c3d1d5')+`<path d="M41 37 Q32 23 53 8 Q49 23 59 37Z" fill="${b}"/>`,
Qualle: `<path d="M18 47 Q18 6 50 14 Q82 6 82 47Z" fill="${r}"/>`+path('M27 48 Q16 62 30 73 Q37 83 24 91 M43 48 Q30 68 45 83 M58 48 Q74 62 59 77 Q51 85 63 91 M74 48 Q87 65 75 80')+eye(39,34)+eye(61,34),
Ring: `<ellipse cx="50" cy="59" rx="23" ry="28" fill="${y}"/><ellipse cx="50" cy="59" rx="14" ry="19" fill="white"/><path d="M38 23 L45 12 H56 L64 23 L51 37Z" fill="${b}"/>`+path('M38 23 H64 L51 37 L45 12 M56 12 L51 37'),
Rakete: `<path d="M36 63 L23 78 L25 52 L37 43 M64 63 L77 78 L75 52 L63 43" fill="${r}"/><path d="M35 66 Q26 32 50 10 Q74 32 65 66Z" fill="${b}"/>`+circle(50,36,9,'white')+`<path d="M42 70 L50 91 L58 70Z" fill="${y}"/>`,
Sonne: circle(50,50,22,y)+path('M50 7 V18 M50 82 V93 M7 50 H18 M82 50 H93 M20 20 L28 28 M72 72 L80 80 M20 80 L28 72 M72 28 L80 20')+eye(43,47)+eye(57,47)+path('M42 56 Q50 63 58 56'),
Socke: `<path d="M47 15 H73 V61 Q75 74 61 82 L42 89 Q24 92 21 78 Q18 67 37 61 L47 56Z" fill="${r}"/>`+path('M47 27 H73 M26 66 Q42 69 40 88 M60 56 Q60 67 74 67'),
Tasse: `<path d="M22 35 H68 V68 Q67 83 45 83 Q23 83 22 68Z" fill="${b}"/>`+path('M69 43 Q91 37 87 56 Q84 69 69 64 M17 87 H79 M36 26 Q28 19 37 10 M53 26 Q44 19 53 10'),
Tiger: cat.replaceAll(y,'#efb568')+path('M43 30 L47 39 M53 30 L53 40 M62 31 L58 40 M24 47 L32 50 M22 57 L31 57 M76 47 L68 50 M78 57 L69 57'),
Uhr: circle(50,50,34,'#fff1cf')+path('M50 22 V28 M50 72 V78 M22 50 H28 M72 50 H78 M50 33 V50 L64 60')+circle(50,50,2,'#37483f'),
Vogel: `<path d="M19 34 Q37 37 40 46 Q49 23 65 31 Q80 41 70 58 Q52 81 32 62Z" fill="${b}"/>`+eye(64,39)+`<path d="M73 40 L87 46 L73 50Z" fill="${y}"/>`+path('M38 47 Q53 67 61 48 M43 70 V82 H36 M58 69 V82 H65'),
Wolke: `<path d="M22 72 C-1 66 9 37 27 42 C24 11 65 8 70 37 C95 29 105 71 78 72Z" fill="${b}"/>`,
Wurm: `<path d="M15 71 Q23 48 34 64 Q46 83 54 62 Q67 41 75 57 Q92 70 82 33" stroke="${g}" stroke-width="16" fill="none"/>`+eye(79,29)+path('M76 20 L70 13 M86 20 L90 13'),
Xylophon: [0,1,2,3,4].map((n)=>rect(16+n*14,25+n*5,12,57-n*6,[r,y,g,b,r][n])).join('')+path('M21 87 L75 14')+circle(77,12,6,y),
Yak: `<path d="M22 42 Q10 20 20 17 L33 35 M66 35 Q87 14 81 39" fill="#c5a380"/><path d="M20 41 L36 28 L65 32 L79 47 L74 78 L65 69 L57 85 L45 76 L34 85 L26 71 L19 77Z" fill="#bda78f"/>`+eye(37,48)+eye(61,48)+`<ellipse cx="50" cy="65" rx="17" ry="12" fill="#e7d5bc"/>`+eye(44,64)+eye(56,64),
Zelt: `<path d="M15 80 L49 17 L86 80Z" fill="${g}"/><path d="M35 80 L49 43 L64 80Z" fill="#fff3d8"/>`+path('M49 17 L64 80 M10 83 H91'),
Zitrone: `<path d="M17 53 Q20 25 48 28 Q65 24 77 41 L85 45 L80 54 Q76 80 46 77 Q24 78 20 62 L14 59Z" fill="${y}"/>`+path('M28 53 Q32 39 44 38'),
Öl: rect(34,31,32,54,y)+rect(41,19,18,13,g)+rect(41,12,18,8,g)+path('M34 54 H66')+`<path d="M50 42 Q36 57 50 60 Q63 58 50 42Z" fill="#b4bf78"/>`,
Überraschungsei: `<path d="M50 13 C25 13 12 83 50 85 C88 83 75 13 50 13Z" fill="#fff3d8"/><path d="M23 57 Q35 48 49 57 Q64 66 77 56 Q83 85 50 85 Q17 84 23 57Z" fill="${r}"/>`+path('M45 31 Q45 22 54 26 Q63 31 52 38 V42')+eye(52,48)
};
export function illustration(name) {
  if (!motifs[name]) throw new Error(`Fehlendes Motiv: ${name}`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="${name}"><g fill="none" stroke="#37483f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${motifs[name]}</g></svg>`;
}
