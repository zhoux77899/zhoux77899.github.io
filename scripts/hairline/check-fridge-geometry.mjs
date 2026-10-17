import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { Window } from 'happy-dom';

// Run the real figure and unchanged kernel against a DOM, without opening a browser.
const root = fileURLToPath(new URL('../../', import.meta.url));
const kernel = readFileSync(resolve(root, 'public/hairline/kernel.js'), 'utf8');
const source = readFileSync(resolve(root, 'public/hairline/figures/fridge.js'), 'utf8');
const marker = '  // Compare opaque silhouettes';
assert(source.includes(marker), 'The geometry probe must attach before the depth sorter.');
const instrumented = source.replace('=HL;', '=globalThis.__fridgeKernel;')
  .replace(marker, '  globalThis.__fridge={g,P,doorPoint,doorSpace,doorRing,doorWidth,hinge,handleRing,door,handle,nodes,trays};\n' + marker)
  .replace('if(order.length<nodes.length)', 'globalThis.__cycles+=Number(order.length<nodes.length);if(order.length<nodes.length)');
const window = new Window();
const document = window.document;
const stage = document.createElement('div');
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
document.body.append(stage);
stage.append(svg);
let now = 0, definition, tick;
const context = vm.createContext({ document, window, performance: { now: () => now }, console, setTimeout, clearTimeout,
  hairline: (value) => { definition = value; }, __cycles: 0 });
vm.runInContext(kernel, context);
context.__fridgeKernel = { ...context.HL, register: (_stage, callback) => { tick = callback; return { wake() {}, unregister() {} }; }, pointer: () => () => {} };
vm.runInContext(instrumented, context);
const read = { textContent: '' };
const controller = definition.mount({ stage, svg, read }, 33);
const { g, P, doorPoint, doorSpace, doorRing, doorWidth, hinge, handleRing, door, handle, nodes } = context.__fridge;
const close = (actual, expected, label) => assert(Math.abs(actual - expected) < 1e-8, label);
const samePoint = (actual, expected, label) => actual.forEach((value, index) => close(value, expected[index], label));
const order = () => [...g.children].map((group) => nodes.find((node) => node.group === group).id);
const restOrder = order();
const bounds = { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity };
const inspectFrame = () => {
  for (const node of nodes) for (const [x, y] of node.shape) {
    bounds.left = Math.min(bounds.left, x); bounds.top = Math.min(bounds.top, y);
    bounds.right = Math.max(bounds.right, x); bounds.bottom = Math.max(bounds.bottom, y);
  }
};

for (const angle of [0, Math.PI / 2, 165 * Math.PI / 180]) {
  for (const z of [7, 27, 106, 135]) samePoint(doorPoint(0, 0, z, angle), [...hinge, z], 'The hinge axis must stay fixed.');
}
samePoint(doorPoint(0, 0, 7, 0), [81, 60, 7], 'The closed right edge must meet the right-front hinge.');
samePoint(doorPoint(doorWidth, 0, 135, 0), [-5, 60, 135], 'The closed free edge must match the cabinet width and height.');
for (const u of [0, 4, doorWidth / 2, doorWidth]) for (const d of [-2, 0, 2, 7]) {
  samePoint(doorSpace(doorPoint(u, d, 72)), [u, d, 72], 'Door-local ray coordinates must invert the geometry.');
  if (u >= 4 && Math.abs(d) <= 2) assert(doorPoint(u, d, 72)[0] > 81, 'The open panel must clear the cabinet and shelves.');
}
close(Math.min(...doorRing.map((point) => point.v)), 7, 'Door bottom matches the cabinet opening.');
close(Math.max(...doorRing.map((point) => point.v)), 135, 'Door top matches the cabinet opening.');
assert(hinge[0] - 2.2 < 81 && hinge[1] - 2.2 < 59, 'Hinge knuckles must intersect the cabinet frame.');
assert(Math.min(...handleRing.map((point) => point.u)) > doorWidth * .8, 'The handle belongs to the free edge.');
close(door.hi[1] - door.lo[1], 4, 'The door must have four units of physical thickness.');
assert(handle.lo[1] >= 2 - 1e-8 && handle.hi[1] >= 7 - 1e-8, 'The handle must attach to and project from the outer face.');
assert(door.group.querySelectorAll('path').length >= 4, 'The door contains a prism silhouette, crease, and inner details.');
assert.equal(read.textContent, 'rest');
assert.equal(svg.querySelectorAll('.hi').length, 1, 'Rest has one highlighted shelf.');
assert(restOrder.indexOf(20) > restOrder.indexOf(16) && restOrder.indexOf(20) > restOrder.indexOf(17), 'The upper shelf must cover the middle eggs at rest.');

let samples = 0;
inspectFrame();
for (const intensity of [20, 33, 42]) for (let tray = 0; tray < 3; tray++) {
  controller.activate(null); now += 2000; tick(.016, now);
  controller.set(intensity);
  controller.activate(P(38, 54 + [7, 2, 0][tray], 21.2 + tray * 35));
  assert.equal(read.textContent, `tray ${tray + 1}`);
  assert.equal(svg.querySelectorAll('.hi').length, 1, 'Selection transfers the single highlight.');
  for (let time = 0; time <= 1200; time += 40) {
    now += 40; tick(.04, now); inspectFrame(); samples++;
    if (intensity === 42 && tray === 2 && time >= 700) assert(order().indexOf(21) > order().indexOf(5), 'An extracted bottle must pass in front of the cabinet frame.');
  }
}
controller.activate(null); now += 2000; tick(.016, now);
assert.deepEqual(order(), restOrder, 'All solids return to their resting depth order.');
assert.equal(context.__cycles, 0, 'The depth graph must stay acyclic.');
assert(bounds.left >= 6 && bounds.top >= 6 && bounds.right <= 394 && bounds.bottom <= 314,
  `Every tested pose must remain in the 400×320 frame: ${JSON.stringify(bounds)}`);
controller.destroy();
assert.equal(svg.childNodes.length, 0, 'Destroy removes the complete figure.');
const report = { hinge: [...hinge], openAngle: 165, doorWidth, doorHeight: 128, doorThickness: 4, handleAtFreeEdge: true,
  samples, sortCycles: context.__cycles, returnedToRest: true, svgCleared: true, bounds, restOrder,
  kernelSha256: createHash('sha256').update(kernel).digest('hex'), browserInspected: false };
if (process.argv[2]) {
  const destination = resolve(root, process.argv[2]);
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify(report, null, 2));
window.happyDOM.abort();
