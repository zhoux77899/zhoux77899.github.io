const { Cam, clamp, disposer, facing, fillet, fit, mk, open, pointer, poly, prism, proj, put, register, rings, rrect, seg, solid, tdone, tset, tval, tween } = HL;

// A Jiangnan garden model: a real opening in the wall, hinged lattice leaves, a pool and upturned tiled eaves.
function mount({ stage, svg, read }, value) {
  const bag = disposer(), C = Cam(45, 0.5, 1.72);
  fit(C, [[0, 0, -4], [152, 118, -4], [152, 0, 74], [0, 118, 0]], 200, 166);
  const P = proj(C), front = facing(C), scene = mk('g', {}, svg);
  function block(parent, x0, y0, x1, y1, z0, z1, radius = 1.3) { const [ring, inner] = rings(x0, y0, x1, y1, radius, 0.6), el = solid(parent); put(el, prism(P, front, ring, inner, z0, z1)); return el; }
  block(scene, 0, 0, 152, 118, -4, 0, 8);
  const [rim, rimIn] = rings(58, 58, 144, 110, 19, 1.1); put(solid(scene), prism(P, front, rim, rimIn, 0, 2.5));
  mk('path', { d: poly(rrect(62, 62, 140, 106, 15, 14).map(q => P(q.u, q.v, 2.6))), class: 'lo' }, scene);
  for (const [x, y, radius] of [[91, 85, 18], [113, 95, 10], [124, 75, 12]]) mk('path', { d: open(Array.from({ length: 33 }, (_, k) => { const a = (0.12 + k / 32 * 0.78) * Math.PI; return P(x + Math.cos(a) * radius, y + Math.sin(a) * radius * 0.6, 2.7); })), class: 'nf lo' }, scene);
  // Plants behind the wall remain visible only through its actual moon gate and window openings.
  const branch = [[98, 8, 0], [100, 9, 14], [104, 9, 25], [112, 10, 33]];
  mk('path', { d: open(branch.map(q => P(...q))) + open([[104, 9, 25], [95, 12, 30], [89, 12, 34]].map(q => P(...q))), class: 'nf lo' }, scene);
  for (const [x, y, z, r] of [[112, 10, 33, 10], [94, 11, 30, 8], [102, 9, 38, 11]]) {
    const ring = Array.from({ length: 48 }, (_, k) => { const a = k / 48 * Math.PI * 2; return P(x + Math.cos(a) * r, y + Math.sin(a) * r * 0.5, z + Math.sin(a) * r * 0.2); }); mk('path', { d: poly(ring), class: 'sil' }, scene);
  }
  const wall = mk('g', {}, scene), gate = Array.from({ length: 80 }, (_, k) => { const a = k / 80 * Math.PI * 2; return P(111 + Math.cos(a) * 18, 25.1, 20.5 + Math.sin(a) * 18); });
  const windowRing = rrect(30, 19, 66, 42, 2.2, 10), face = rrect(8, 0, 145, 47, 1.4, 8).map(q => P(q.u, 25, q.v));
  // Even-odd compound geometry cuts genuine holes; the near wall never paints over their openings.
  mk('path', { d: poly(face) + poly(gate) + poly(windowRing.map(q => P(q.u, 25, q.v))), 'fill-rule': 'evenodd', class: 'sil' }, wall);
  mk('path', { d: poly(rrect(29, 18, 67, 43, 2.8, 10).map(q => P(q.u, 25.2, q.v))) + poly(Array.from({ length: 80 }, (_, k) => { const a = k / 80 * Math.PI * 2; return P(111 + Math.cos(a) * 19, 25.2, 20.5 + Math.sin(a) * 19); })), class: 'nf lo' }, wall);
  block(wall, 5, 19, 148, 27, 47, 50, 2);
  const capTiles = []; for (let x = 12; x < 145; x += 8) capTiles.push(seg(P(x, 20.2, 50.1), P(x, 25.7, 50.1))); mk('path', { d: capTiles.join(''), class: 'nf lo' }, wall);
  const leaves = [0, 1].map(i => { const g = mk('g', { 'data-part': 'shutter-' + i }, scene); return { i, g, face: mk('path', { class: 'sil' }, g), lattice: mk('path', { class: 'nf lo' }, g), motion: tween(i ? 0.1 : 0.2), drawn: NaN, rest: i ? 0.1 : 0.2 }; });
  const hit = windowRing.map(q => P(q.u, 25, q.v));
  // Perforated, weathered garden stones have rounded irregular outlines and genuinely open holes.
  for (const [cx, cy, width, height] of [[84, 53, 24, 22], [109, 48, 28, 34], [130, 57, 18, 19]]) {
    const raw = [[-0.5, 0], [-0.58, 0.17], [-0.29, 0.33], [-0.48, 0.49], [-0.2, 0.6], [-0.35, 0.79], [-0.13, 1], [0.11, 0.9], [0.17, 0.75], [0.02, 0.63], [0.39, 0.53], [0.28, 0.32], [0.53, 0.15], [0.42, 0]];
    const profile = fillet(raw.map(([u, z]) => [cx + u * width, z * height + 1]), raw.map(() => 1.5), 8);
    const near = profile.map(([u, z]) => P(u, cy + 4, z)), far = profile.map(([u, z]) => P(u + 1.8, cy - 4, z));
    const holes = y => [[-0.03, 0.5, width * 0.095, height * 0.09], [-0.12, 0.19, width * 0.09, height * 0.07]].map(([u, z, rx, rz]) => poly(Array.from({ length: 40 }, (_, k) => { const a = k / 40 * Math.PI * 2; return P(cx + u * width + Math.cos(a) * rx, y, z * height + Math.sin(a) * rz); })));
    mk('path', { d: poly(far) + holes(cy - 4.1).join(''), 'fill-rule': 'evenodd', class: 'lo' }, scene);
    const sides = profile.map((_, i) => { const j = (i + 1) % profile.length; return poly([near[i], far[i], far[j], near[j]]); });
    mk('path', { d: sides.join(''), class: 'fo' }, scene);
    mk('path', { d: poly(near) + holes(cy + 4.1).join(''), 'fill-rule': 'evenodd', class: 'sil' }, scene);
    mk('path', { d: open(profile.slice(42, 74).map(([u, z]) => P(u - 0.7, cy + 4.2, z - 0.9))), class: 'nf lo' }, scene);
  }
  // A roofed gallery joins the pavilion, with paired columns and shallow tile grooves.
  const gallery = mk('g', {}, scene); block(gallery, 2, 31, 25, 71, 0, 2.5, 2);
  for (const [x, y] of [[6, 35], [21, 35], [6, 64], [21, 64]]) block(gallery, x - 0.8, y - 0.8, x + 0.8, y + 0.8, 2.5, 27, 0.7);
  block(gallery, 0, 29, 27, 73, 27, 30, 2.2);
  const galleryTiles = []; for (let y = 35; y < 72; y += 7) galleryTiles.push(seg(P(2, y, 30.1), P(25, y, 30.1))); mk('path', { d: galleryTiles.join(''), class: 'nf lo' }, gallery);
  for (const y of [45, 57, 67]) block(scene, 5, y, 23, y + 5.4, 0, 2.1, 1.2);
  const pavilion = mk('g', {}, scene); block(pavilion, 8, 67, 55, 109, 0, 4, 4); block(pavilion, 12, 71, 51, 105, 4, 6, 2);
  for (const [x, y] of [[16, 75], [46, 75], [16, 100], [46, 100]]) { block(pavilion, x - 1.1, y - 1.1, x + 1.1, y + 1.1, 6, 38, 1); block(pavilion, x - 2.3, y - 2.3, x + 2.3, y + 2.3, 6, 8.5, 1.2); }
  block(pavilion, 13, 72, 49, 76, 35, 38, 1.3); block(pavilion, 13, 99, 49, 103, 35, 38, 1.3);
  mk('path', { d: seg(P(16, 100, 17), P(46, 100, 17)) + seg(P(16, 100, 20), P(46, 100, 20)) + seg(P(46, 75, 17), P(46, 100, 17)), class: 'nf lo' }, pavilion);
  const roofZ = (x, y) => { const t = Math.abs(x - 31) / 26, end = Math.abs(y - 87.5) / 21.5; return 38 + 18 * (1 - clamp(t, 0, 1)) ** 1.5 + 5 * t ** 6 + 1.5 * end ** 6 * t ** 2; };
  for (const [x0, x1] of [[5, 31], [31, 57]]) {
    const raw = rrect(x0, 66, x1, 109, 1.1, 8), samples = raw.flatMap((q, i) => { const b = raw[(i + 1) % raw.length], n = Math.max(1, Math.ceil(Math.hypot(q.u - b.u, q.v - b.v) / 1.5)); return Array.from({ length: n }, (_, k) => P(q.u + (b.u - q.u) * k / n, q.v + (b.v - q.v) * k / n, roofZ(q.u + (b.u - q.u) * k / n, q.v + (b.v - q.v) * k / n))); });
    mk('path', { d: poly(samples.map(([x, y]) => [x, y + 2.8])), class: 'lo' }, pavilion); mk('path', { d: poly(samples), class: 'sil' }, pavilion);
    const tiles = [];
    for (const fraction of [0.2, 0.45, 0.7, 0.9]) { const x = x0 + (x1 - x0) * fraction; tiles.push(open(Array.from({ length: 32 }, (_, k) => { const y = 68 + k * 39 / 31; return P(x, y, roofZ(x, y) + 0.1); }))); }
    for (let y = 73; y < 107; y += 7) tiles.push(open(Array.from({ length: 32 }, (_, k) => { const x = x0 + 1 + k * (x1 - x0 - 2) / 31; return P(x, y, roofZ(x, y) + 0.1); })));
    mk('path', { d: tiles.join(''), class: 'nf lo' }, pavilion);
  }
  block(pavilion, 29.3, 65, 32.7, 110, 55.8, 58, 1.4);
  for (const x of [61, 70, 79]) block(scene, x, 104, x + 5.5, 112, 0, 2, 1.4);
  function draw(leaf, angle) {
    if (leaf.drawn === angle) return; leaf.drawn = angle;
    const hinge = leaf.i ? 65 : 31, sign = leaf.i ? -1 : 1, width = 16, Q = (u, z) => P(hinge + sign * u * Math.cos(angle), 25.3 + u * Math.sin(angle), z);
    const ring = rrect(0, 20, width, 41, 0.8, 6); leaf.face.setAttribute('d', poly(ring.map(q => Q(q.u, q.v))));
    const bars = [poly(rrect(1.1, 21.1, width - 1.1, 39.9, 0.5, 5).map(q => Q(q.u, q.v)))];
    for (const u of [4, 8, 12]) bars.push(seg(Q(u, 22), Q(u, 39)));
    for (const z of [25, 30.5, 36]) bars.push(seg(Q(1.5, z), Q(14.5, z)));
    // The diagonal weave is a feature of the lattice rather than a decorative grid on a plain block.
    for (const u of [4, 8, 12]) bars.push(open([[u - 2, 30.5], [u, 33.5], [u + 2, 30.5], [u, 27.5], [u - 2, 30.5]].map(([a, z]) => Q(a, z))));
    leaf.lattice.setAttribute('d', bars.join('')); leaf.face.classList.toggle('hi', leaf.i === (active < 0 ? 0 : active));
  }
  let active = -1;
  leaves.forEach(leaf => draw(leaf, leaf.rest)); const B = register(stage, (_dt, now) => { let moving = false; for (const leaf of leaves) { draw(leaf, tval(leaf.motion, now)); if (!tdone(leaf.motion, now)) moving = true; } return moving; }); bag.add(B.unregister);
  function retarget(next) { const previous = active; active = next; const now = performance.now(), origin = next < 0 ? Math.max(previous, 0) : next; leaves.forEach(leaf => tset(leaf.motion, next < 0 ? leaf.rest : clamp(value, 0.5, 1.2) / (1 + Math.abs(leaf.i - origin) * 0.2), now, Math.abs(leaf.i - origin) * 40)); read.textContent = next < 0 ? 'rest' : 'lattice ' + (next + 1); B.wake(); }
  function inside(point) { let on = false; for (let i = 0, j = hit.length - 1; i < hit.length; j = i++) { const [x, y] = hit[i], [a, b] = hit[j]; if ((y > point[1]) !== (b > point[1]) && point[0] < (a - x) * (point[1] - y) / (b - y) + x) on = !on; } return on; }
  const divider = P(48, 25, 30.5)[0];
  function move(point) { const next = inside(point) ? (point[0] < divider ? 0 : 1) : -1; if (next !== active) retarget(next); }
  const leave = () => retarget(-1);
  bag.add(pointer(stage, { move, leave })); bag.add(() => svg.replaceChildren()); read.textContent = 'rest';
  return { set(v) { value = v; retarget(active); }, activate(point) { if (point) move(point); else leave(); }, destroy: bag.dispose };
}
hairline({ name: 'china', means: 'Hinged lattice shutters open onto a Jiangnan garden with a moon gate, rockery, pool and upturned tiled pavilion roof.', rules: [1, 2, 3, 4, 5, 6, 7, 8, 9], range: [0.5, 0.85, 1.2], mount });
