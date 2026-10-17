import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as K from './kit/iso-kit.mjs';
import * as G from './kit/lathe.mjs';
import * as A from './kit/audit.mjs';
import { followLift } from '../../src/lib/anatomy/model.mjs';
import { content } from '../../src/content/index.ts';
import { escapeHtml } from '../../src/content/html.ts';

// Original geometry, built with the unmodified MIT Anatomy kit. Geometry and the
// recorded audit shapes share the same builders; the browser receives paths only.
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = resolve(ROOT, 'public/anatomy');
mkdirSync(OUT, { recursive: true });
const width = 800;
const height = 640;
const LIFT = 8;
const P = K.fitProjection([
  ...K.boxCorners({ x: -142, y: -90, w: 284, d: 198 }, -12, 124),
], width, height, { pad: 62, azimuth: 45, elevation: 36 });
const modules = [
  { id: 'projects', href: '#projects', x: -119, y: -56, w: 72, d: 64 },
  { id: 'experience', href: '#experience', x: -41, y: -56, w: 76, d: 64 },
  { id: 'contact', href: '#contact', x: 41, y: -56, w: 78, d: 64 },
  { id: 'skills', href: '#skills', x: -119, y: 24, w: 72, d: 62 },
  { id: 'open-source', href: '#vllm-ascend-work', x: -41, y: 24, w: 76, d: 62 },
  { id: 'travel', href: '#travel', x: 41, y: 24, w: 78, d: 62 },
].map(module => ({
  ...module,
  label: content.explorer.destinations[module.id].label,
  object: content.explorer.destinations[module.id].object,
}));
const R = A.recorder(P);
let solids = 0;
const style = (tone = 'mid', inner = '') => ({ tone, inner, crease: 'faint' });
const line = (d, tone = 'lo', free) => K.lineSvg(d, { tone, free });
const at = point => K.iso(point, P);
const moveOf = piece => piece === 'stand' ? [0, 0, 0] : [0, 0, LIFT];
const round = value => Math.round(value * 1000) / 1000;
function put(piece, name, centre, paths, shape, { tone = 'mid', inner = '' } = {}) {
  solids++;
  const id = `${piece}.${name}`;
  shape.name = id;
  // Separate physical pieces remain separately recorded, including contacts.
  R.put({ name: id, piece, at: centre, move: moveOf(piece), svg: K.solidSvg(paths, style(tone, inner)), shapes: [R.solid(shape)] });
}
function slab(piece, name, plan, z, h, options = {}) {
  put(piece, name, [plan.x + plan.w / 2, plan.y + plan.d / 2, z + h / 2],
    K.slabOf(plan, z, h, P, 12, h >= 2 ? 0.7 : 0.2), A.slab(plan, z, h, {}, 12), options);
}
function cylinder(piece, name, x, y, r, z, h, options = {}) {
  put(piece, name, [x, y, z + h / 2], K.cylinder(x, y, r, z, h, P, 64, Math.min(0.45, h / 4)), A.cylinder(x, y, r, z, h), options);
}
function prism(piece, name, F, polygon, s0, s1, options = {}) {
  const points = polygon.map(([u, v]) => G.add3(F.o, G.add3(G.mul3(F.u, u), G.mul3(F.v, v))));
  const centre = G.add3(points.reduce((sum, p) => G.add3(sum, G.mul3(p, 1 / points.length)), [0, 0, 0]), G.mul3(F.a, (s0 + s1) / 2));
  put(piece, name, centre, G.prismOf(F, polygon, s0, s1, P), A.prism(F, polygon, s0, s1), options);
}
function disc(piece, name, F, s0, s1, radius, options = {}) {
  put(piece, name, G.add3(F.o, G.mul3(F.a, (s0 + s1) / 2)), G.disc(s0, s1, radius, F, P, { steps: 64, bevel: 0.3 }), A.disc(F, s0, s1, radius), options);
}
const rectangle = (x, y, w, d, r = 2) => ({ x, y, w, d, r });
const screws = (plan, z, inset = 4) => K.dotsSvg(K.corners(plan, inset).map(([x, y]) => at([x, y, z])), { size: 0.55, tone: 'mid' });
const inset = (plan, z, by = 3, tone = 'faint') => line(K.planOutline(K.insetPlan(plan, by), z, P, 12), tone);

// A continuous floor supports the walls, dividers, trays and feet. The case is
// constructed as a floor and four walls rather than a transparent solid box.
const base = rectangle(-132, -70, 264, 168, 8);
for (const [i, [x, y]] of K.corners(base, 15).entries()) cylinder('stand', `foot${i}`, x, y, 7, -11, 6, { tone: 'lo' });
slab('stand', 'floor', base, -5, 5, { tone: 'lo', inner: inset(base, 0) + screws(base, 0, 12) });
slab('stand', 'wall-back', rectangle(-126, -70, 252, 6, 0), 0, 19, { inner: line(K.sideSeam(rectangle(-126, -70, 252, 6, 0), 11, P, 12), 'faint') });
slab('stand', 'wall-front', rectangle(-126, 92, 252, 6, 0), 0, 19, { inner: line(K.sideSeam(rectangle(-126, 92, 252, 6, 0), 11, P, 12), 'faint') });
slab('stand', 'wall-left', rectangle(-132, -64, 6, 156, 0), 0, 19);
slab('stand', 'wall-right', rectangle(126, -64, 6, 156, 0), 0, 19);
for (const [i, x] of [-45, 37].entries()) slab('stand', `divider${i}`, rectangle(x, -64, 4, 156, 0), 0, 5.5, { tone: 'lo' });
slab('stand', 'divider-cross', rectangle(-126, 10, 81, 4, 0), 0, 5.5, { tone: 'lo' });
slab('stand', 'divider-cross-centre', rectangle(-41, 10, 78, 4, 0), 0, 5.5, { tone: 'lo' });
slab('stand', 'divider-cross-right', rectangle(41, 10, 85, 4, 0), 0, 5.5, { tone: 'lo' });

// Handle and catches sit on the exterior front face, with flush mounts.
for (const x of [-42, 34]) slab('stand', `handle-mount${x}`, rectangle(x, 98, 8, 4, 1), 5, 9);
slab('stand', 'handle', rectangle(-42, 102, 84, 5, 2), 7, 5, { tone: 'hi', inner: line(K.sideSeam(rectangle(-42, 102, 84, 5, 2), 9.5, P, 12), 'faint') });
for (const x of [-96, 86]) slab('stand', `catch${x}`, rectangle(x, 98, 10, 2.5, 1), 5, 9, { inner: line(K.planOutline(rectangle(x + 2, 99, 6, 1, 0.3), 14, P), 'lo') });

// Lid opens on two real pin hinges. Its inset liner and ribs live in the same
// vertical plane; no disconnected floating lid and no label artwork inside it.
const lidFrame = G.frameOf([0, -74, 22.2], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
const lid = K.roundedPlan(rectangle(-130, 0, 260, 96, 8), 12);
prism('stand', 'lid', lidFrame, lid, 0, 4, { tone: 'lo' });
const liner = K.roundedPlan(rectangle(-118, 10, 236, 75, 4), 12);
const lidPocket = (plan, tone) => line(K.pathOf(K.roundedPlan(plan, 12).map(([x, z]) => at([x, -69.3, 22.2 + z])), true), tone);
const lidPockets = [-110, -37, 36].map(x => {
  const pocket = rectangle(x, 18, 66, 58, 3);
  const seam = rectangle(x + 3, 21, 60, 52, 2);
  const points = K.corners(pocket, 4).map(([px, pz]) => at([px, -69.3, 22.2 + pz]));
  return lidPocket(pocket, 'lo') + lidPocket(seam, 'faint')
    + lidPocket(rectangle(x + 23, 15, 20, 8, 2), 'mid')
    + K.dotsSvg(points, { size: 0.5, tone: 'lo' });
}).join('');
prism('stand', 'lid-liner', lidFrame, liner, 4, 4.7, { tone: 'lo', inner: lidPockets });
for (const x of [-88, 76]) {
  const F = G.frameOf([x, -73.2, 19], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
  disc('stand', `hinge${x}`, F, 0, 12, 3.2, { tone: 'mid' });
  disc('stand', `hinge-cap-left${x}`, F, -1.2, 0, 3.2, { tone: 'hi' });
  disc('stand', `hinge-cap-right${x}`, F, 12, 13.2, 3.2, { tone: 'hi' });
}
// Braces are flat triangular stays anchored at the top edges of the side walls.
for (const x of [-126, 124]) {
  const F = G.frameOf([x, -60, 19], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
  prism('stand', `stay${x}`, F, [[0, 0], [-10, 0], [-10, 29], [-7, 26], [-7, 3], [0, 3]], 0, 2, { tone: 'lo' });
}

// Each insert runs between fixed upright guides. The guides stay still when the
// carriage rises; their face-to-face contacts remain readable in every pose.
for (const m of modules) {
  const tray = rectangle(m.x, m.y, m.w, m.d, 3);
  slab(m.id, 'tray', tray, 0, 3, { tone: 'lo', inner: inset(tray, 3, 2) + screws(tray, 3, 5) });
  for (const [i, x] of [m.x - 2, m.x + m.w].entries()) {
    const z = i === 0 && m.x > -119 ? 5.5 : 0;
    slab('stand', `${m.id}-guide${i}`, rectangle(x, m.y + m.d - 5, 2, 5, 0), z, 16 - z, { tone: 'lo' });
  }
}

// Projects: a compact model workstation, with four removable compute boards,
// contacts, cooling case, and a fan grille. Its parts are devices, not data boxes.
{
  const id = 'projects', x = -112, y = -50;
  const chassis = rectangle(x, y, 58, 48, 3);
  slab(id, 'workstation', chassis, 3, 7, { inner: screws(chassis, 10, 4) + inset(chassis, 10, 3) });
  for (let i = 0; i < 4; i++) {
    const board = rectangle(x + 6, y + 5 + i * 7, 34, 2.4, 0.5);
    slab(id, `compute-board${i}`, board, 12, 36, { tone: 'hi', inner: line(K.sideSeam(board, 39, P, 12), 'faint') });
    slab(id, `board-contact${i}`, rectangle(x + 10, y + 5 + i * 7, 24, 2.4, 0), 10, 2, { tone: 'lo' });
    const chip = rectangle(x + 14, y + 7.4 + i * 7, 17, 0.7, 0);
    slab(id, `accelerator${i}`, chip, 25, 12, { tone: 'mid', inner: line(K.sideSeam(chip, 31, P, 12), 'faint') });
  }
  slab(id, 'cooler', rectangle(x + 41, y + 4, 12, 37, 2), 10, 23, { inner: inset(rectangle(x + 41, y + 4, 12, 37, 2), 33, 2) });
  cylinder(id, 'fan-ring', x + 47, y + 16, 4.5, 33, 1.2, { tone: 'hi', inner: line(K.ring(x + 47, y + 16, 3.2, 34.2, P, 64), 'lo') });
}
// Skills: the tactile keyboard and its small terminal screen. Keys have real
// caps and thickness, and every key top is a closed inset, not a floating mark.
{
  const id = 'skills', x = -112, y = 30;
  const console = rectangle(x, y, 58, 48, 4);
  slab(id, 'terminal-case', console, 3, 8, { inner: inset(console, 11, 3) + screws(console, 11, 4) });
  slab(id, 'display-bezel', rectangle(x + 6, y + 5, 46, 16, 2), 11, 1.5, { tone: 'hi', inner: inset(rectangle(x + 6, y + 5, 46, 16, 2), 12.5, 2, 'lo') });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
    const cap = rectangle(x + 7 + c * 9, y + 24 + r * 6, 7, 4.2, 1);
    slab(id, `key${r}-${c}`, cap, 11, 2, { tone: 'hi', inner: inset(cap, 13, 0.8) });
  }
}
// Background: a bench optical instrument with an actual barrel, retaining
// rings, vertical supports and a focusing stage. Glass is an opaque inset.
{
  const id = 'experience', x = -33, y = -49;
  slab(id, 'optics-foot', rectangle(x, y, 60, 48, 4), 3, 5, { inner: screws(rectangle(x, y, 60, 48, 4), 8, 5) });
  for (const py of [y + 9, y + 32]) slab(id, `lens-support${py}`, rectangle(x + 26, py, 6, 7, 1), 8, 16.5);
  const F = G.frameOf([x + 29, y + 9, 34], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
  disc(id, 'lens-barrel', F, 0, 30, 9.5, { tone: 'hi', inner: line(G.arcOf(F, 6, 9.5, P), 'faint') + line(G.arcOf(F, 22, 9.5, P), 'faint') });
  disc(id, 'lens-retainer', F, 30, 32, 10.5, { tone: 'hi' });
  disc(id, 'lens-glass', F, 32, 32.4, 7.4, { tone: 'lo', inner: line(G.circleOf(F, 32.4, 6, P), 'faint') });
  slab(id, 'stage', rectangle(x + 6, y + 41, 48, 6, 1), 8, 3, { inner: inset(rectangle(x + 6, y + 41, 48, 6, 1), 11, 1) });
  cylinder(id, 'focus-neck', x + 53, y + 15, 2, 8, 3);
  cylinder(id, 'focus-knob', x + 53, y + 15, 4, 11, 3, { inner: line(K.knurl(x + 53, y + 15, 4, 11, 14, 28, P, 0), 'lo') });
}
// Open source: a workshop folio with a cover, ruled pages and two flush clips.
{
  const id = 'open-source', x = -32, y = 31;
  slab(id, 'folio-back', rectangle(x, y, 57, 46, 3), 3, 2.5);
  for (let i = 0; i < 4; i++) {
    const page = rectangle(x + 2, y + 2, 53, 42, 2);
    slab(id, `page${i}`, page, 5.5 + i * 1.2, 1.2, { tone: 'hi' });
  }
  const cover = rectangle(x + 2, y + 2, 53, 42, 2);
  slab(id, 'folio-cover', cover, 10.3, 1.8, { tone: 'hi', inner: inset(cover, 12.1, 3) + line(K.lineOnTop([x + 12, y + 13], [x + 43, y + 13], 12.1, P), 'lo', true) + line(K.lineOnTop([x + 12, y + 19], [x + 38, y + 19], 12.1, P), 'lo', true) });
  for (const cy of [y + 10, y + 30]) cylinder(id, `clip${cy}`, x + 6, cy, 2.3, 12.1, 1.3, { tone: 'hi', inner: line(K.ring(x + 6, cy, 1.2, 13.4, P, 32), 'lo') });
}
// Travel: three adjoining folded map panels and a knurled compass, resting on
// a field-map case. Printed contour marks are closed paths with no loose ends.
{
  const id = 'travel', x = 48, y = 30;
  slab(id, 'map-case', rectangle(x, y, 62, 49, 3), 3, 4, { inner: screws(rectangle(x, y, 62, 49, 3), 7, 4) });
  for (let i = 0; i < 3; i++) {
    const page = rectangle(x + 6 + i * 16, y + 6, 16, 36, 0);
    const z = 7;
    slab(id, `map-fold${i}`, page, z, 1.1, { tone: 'hi', inner: line(K.planOutline(rectangle(page.x + 3, page.y + 6, 10, 20, 4), 8.1, P, 16), 'faint') + line(K.planOutline(rectangle(page.x + 5, page.y + 10, 6, 12, 2), 8.1, P, 16), 'lo') });
  }
  cylinder(id, 'compass-base', x + 45, y + 29, 10, 8.1, 3, { tone: 'mid', inner: line(K.knurl(x + 45, y + 29, 10, 8.1, 11.1, 48, P, 0), 'lo') });
  cylinder(id, 'compass-bezel', x + 45, y + 29, 9, 11.1, 1.2, { tone: 'hi', inner: line(K.ring(x + 45, y + 29, 7.5, 12.3, P, 64), 'lo') });
  const needle = [[x + 45, y + 22], [x + 47, y + 29], [x + 45, y + 35], [x + 43, y + 29]];
  prism(id, 'compass-needle', G.frameOf([0, 0, 12.3], [0, 0, 1], [1, 0, 0], [0, 1, 0]), needle, 0, 0.45, { tone: 'hi' });
  cylinder(id, 'compass-hub', x + 45, y + 29, 1.5, 12.75, 0.65, { tone: 'hi' });
}
// Contact: the panel connects a small receiver and plugs through real sockets.
{
  const id = 'contact', x = 49, y = -49;
  const panel = rectangle(x, y, 60, 46, 4);
  slab(id, 'patch-panel', panel, 3, 24, { inner: inset(panel, 27, 3) + screws(panel, 27, 5) });
  slab(id, 'receiver-seat', rectangle(x + 9, y + 9, 42, 12, 3), 27, 2);
  slab(id, 'receiver', rectangle(x + 9, y + 9, 42, 12, 3), 29, 3, { tone: 'hi', inner: inset(rectangle(x + 9, y + 9, 42, 12, 3), 32, 2) });
  for (let i = 0; i < 3; i++) {
    cylinder(id, `socket${i}`, x + 14 + i * 15, y + 31, 4.1, 27, 1.2, { tone: 'hi', inner: line(K.ring(x + 14 + i * 15, y + 31, 2.6, 28.2, P, 48), 'lo') });
    cylinder(id, `socket-centre${i}`, x + 14 + i * 15, y + 31, 1.5, 28.2, 0.6, { tone: 'lo' });
  }
}

// Every handover between two modules is sampled at six intermediate positions;
// the cross product also covers rapid reversals and overlapping spring tails.
const states = [0];
for (const [firstIndex, first] of modules.entries()) for (const [secondIndex, second] of modules.entries()) {
  if (firstIndex >= secondIndex) continue;
  for (const a of [0, 0.2, 0.4, 0.6, 0.8, 1]) for (const b of [0, 0.2, 0.4, 0.6, 0.8, 1]) {
    states.push({ label: `${first.id}:${a}/${second.id}:${b}`, shares: { [first.id]: a, [second.id]: b } });
  }
}
// Replay the runtime's exact time model at 60fps, including fast takeover,
// six simultaneously decaying modules, rapid direction reversals and reset.
// The pose grid bounds any pair; these additional states check the actual paths.
const replay = [];
const shares = Object.fromEntries(modules.map(m => [m.id, m.id === 'projects' ? 1 : 0]));
const targets = [null, ...modules.map(m => m.id), ...modules.map(m => m.id).reverse(), null];
let replayFrame = 0;
function stepMotion(target) {
  for (const m of modules) shares[m.id] = followLift(shares[m.id], m.id === target ? 1 : 0, 1 / 60, false);
  replay.push({ label: `runtime-60fps:${++replayFrame}`, shares: { ...shares } });
}
for (const target of targets) for (let frame = 0; frame < 6; frame++) stepMotion(target);
while (Object.values(shares).some(value => value !== 0)) stepMotion(null);
states.push(...replay.filter((_, index) => index % 4 === 0));
A.settle(R, P, { states });
R.items.sort((a, b) => a.key - b.key);
const items = R.items.map(item => ({
  id: item.name, piece: item.piece, key: round(item.key),
  lift: round(G.dot3(item.move, G.viewOf(P))),
  offset: K.axisVector(P, item.move).map(round), svg: item.svg,
}));
const halo = `<path class="iso-halo" d="${K.haloOf(base, -11, 3, P)}"/>`;
const body = halo + items.map(item => `<g data-piece="${item.piece}" data-item="${item.id}">${item.svg}</g>`).join('');
const data = {
  version: 1, width, height, solids, body,
  items: items.map(item => ({ id: item.id, piece: item.piece, key: item.key, lift: item.lift, offset: item.offset })),
  modules: modules.map(m => {
    const [cx, cy] = at([m.x + m.w / 2, m.y + m.d / 2, m.id === 'projects' ? 30 : m.id === 'experience' ? 28 : m.id === 'contact' ? 22 : 12]);
    return { id: m.id, label: m.label, href: m.href, object: m.object, x: round(cx), y: round(cy), rx: 42, ry: 32 };
  }),
};
writeFileSync(resolve(OUT, 'explorer.json'), JSON.stringify(data));
// Navigation remains usable before or without the optional interactive asset.
// This small compile-time manifest comes from the exact projected geometry.
const hotspots = {
  width, height,
  modules: data.modules.map(({ id, x, y, rx, ry }) => ({ id, x, y, rx, ry })),
};
writeFileSync(resolve(ROOT, 'src/lib/anatomy/hotspots.ts'), `// Generated by scripts/anatomy/build.mjs from the projected module geometry.\nexport const explorerHotspots = ${JSON.stringify(hotspots, null, 2)} as const;\n`);
// Static previews use the exact resting art and the same four-tone renderer.
const themeCSS = readFileSync(resolve(ROOT, 'src/styles/anatomy.css'), 'utf8');
const siteCSS = readFileSync(resolve(ROOT, 'src/styles/globals.css'), 'utf8');
function siteThemeValue(theme, property) {
  let value;
  for (const [, selectors, declarations] of siteCSS.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const applies = theme === 'dark'
      ? /(?:^|[\s,])\.dark(?:[\s,]|$)|\[data-theme=['"]dark['"]\]/.test(selectors)
      : /:root|\[data-theme=['"]light['"]\]/.test(selectors) && !/\.dark/.test(selectors);
    if (!applies) continue;
    const declaration = declarations.match(new RegExp(`--${property}\\s*:\\s*([^;]+);`));
    if (declaration) value = declaration[1].trim();
  }
  if (!value) throw new Error(`Missing ${theme} theme token: --${property}`);
  return value;
}
for (const theme of ['light', 'dark']) {
  const css = K.ISO_CSS + themeCSS;
  const paper = siteThemeValue(theme, 'background');
  const accent = siteThemeValue(theme, 'accent');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" class="iso iso-svg anatomy-explorer-art" data-theme="${theme}" style="--background:${paper};--accent:${accent}" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${escapeHtml(content.explorer.previewIllustrationLabel)}"><style>${css}</style>${body}</svg>`;
  writeFileSync(resolve(OUT, `explorer-${theme}.svg`), svg);
  writeFileSync(resolve(OUT, `explorer-${theme}.html`), `<!doctype html><html lang="${escapeHtml(content.metadata.lang)}"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(content.explorer.previewTitle(theme))}</title><style>body{margin:0;background:${paper}}.iso-plate{max-width:800px;margin:32px auto}</style><body><main class="iso-plate">${svg}</main></body></html>`);
}
console.log(`Anatomy explorer: ${solids} actual solids, ${items.length} sorted items, ${states.length} depth states, ${replay.length} replayed 60fps frames.`);
const result = A.auditOrExit(R, P, { frames: [...states.slice(1), ...replay], apart: true });
if (result) writeFileSync(resolve(OUT, 'audit.json'), JSON.stringify({ solids, states: states.length, replayedFrames: replay.length, overlaps: R.settled.overlaps.pairs.length, orderRules: R.settled.solved.rules, passed: A.failures(result) === 0, report: A.report(result) }, null, 2));
