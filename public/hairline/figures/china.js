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
  // Bamboo behind the shutter opening gives the pierced lattice a visible depth reference.
  const bamboo = [];
  for (const [x, tip] of [[27, 30], [35, 34], [44, 27]]) {
    bamboo.push(open([[x, 10, 1], [x + 0.5, 10, 12], [x + 3, 10, 22], [x + 5, 10, tip]].map(point => P(...point))));
    for (const [du, z, side] of [[1, 13, -1], [3, 22, 1], [4, 25, -1]]) {
      bamboo.push(open([[x + du, 10, z], [x + du + side * 4, 10, z + 4], [x + du + side * 8, 10, z + 5]].map(point => P(...point))));
    }
  }
  mk('path', { d: bamboo.join(''), class: 'nf lo' }, scene);
  const wall = mk('g', {}, scene), wallRing = rrect(8, 0, 145, 47, 1.4, 8);
  const gate = Array.from({ length: 80 }, (_, k) => {
    const a = k / 80 * Math.PI * 2; return { u: 111 + Math.cos(a) * 18, v: 20.5 + Math.sin(a) * 18 };
  });
  const windowRing = rrect(30, 19, 66, 42, 2.2, 10);
  const wallLoop = (ring, y) => poly(ring.map(q => P(q.u, y, q.v)));
  for (const y of [21, 25]) {
    mk('path', { d: [wallRing, gate, windowRing].map(ring => wallLoop(ring, y)).join(''), 'fill-rule': 'evenodd', class: 'sil' }, wall);
  }
  mk('path', { d: poly([P(145, 21, 0), P(145, 25, 0), P(145, 25, 47), P(145, 21, 47)]), class: 'sil' }, wall);
  mk('path', { d: wallLoop(rrect(29, 18, 67, 43, 2.8, 10), 25.1)
    + poly(gate.map(q => P(111 + (q.u - 111) * 1.065, 25.1, 20.5 + (q.v - 20.5) * 1.065))), class: 'nf lo' }, wall);
  block(wall, 5, 19, 148, 27, 47, 50, 2);
  const capTiles = []; for (let x = 12; x < 145; x += 8) capTiles.push(seg(P(x, 20.2, 50.1), P(x, 25.7, 50.1))); mk('path', { d: capTiles.join(''), class: 'nf lo' }, wall);
  const perimeter = rrect(0, 20, 16, 41, 1, 6), apertures = [];
  for (const x of [1.25, 8.6]) {
    apertures.push(rrect(x, 21.4, x + 6.1, 26.1, 0.55, 4), rrect(x, 34.9, x + 6.1, 39.6, 0.55, 4));
    const diamond = [[x + 3.05, 26.9], [x + 6.1, 30.5], [x + 3.05, 34.1], [x, 30.5]];
    apertures.push(fillet(diamond, [0.45, 0.45, 0.45, 0.45], 4).map(([u, v]) => ({ u, v })));
  }
  // Punch the same openings in both faces, then connect the cut edges. Give
  // all reveal quads the same winding so their opaque areas form a union,
  // even when a rotating leaf passes edge-on and the openings disappear.
  function perforated(parent) {
    return { back: mk('path', { class: 'lo', 'fill-rule': 'evenodd' }, parent),
      edges: mk('path', { class: 'fo' }, parent), face: mk('path', { class: 'sil', 'fill-rule': 'evenodd' }, parent) };
  }
  function setFaces(part, loops, nearPoint, farPoint) {
    const sides = [], frontFace = [], backFace = [];
    for (const ring of loops) {
      const near = ring.map(nearPoint), far = ring.map(farPoint);
      frontFace.push(poly(near)); backFace.push(poly(far));
      for (let i = 0; i < ring.length; i++) {
        const j = (i + 1) % ring.length, quad = [near[i], near[j], far[j], far[i]];
        const cross = (near[j][0] - near[i][0]) * (far[i][1] - near[i][1])
          - (near[j][1] - near[i][1]) * (far[i][0] - near[i][0]);
        sides.push(poly(cross >= 0 ? quad : quad.reverse()));
      }
    }
    part.back.setAttribute('d', backFace.join('')); part.edges.setAttribute('d', sides.join(''));
    part.face.setAttribute('d', frontFace.join(''));
  }
  const leaves = [0, 1].map(i => {
    const g = mk('g', { 'data-part': 'shutter-' + i }, scene), rest = i ? 0.1 : 0.2;
    return { ...perforated(g), i, motion: tween(rest), drawn: NaN, rest };
  });
  const hit = windowRing.map(q => P(q.u, 25, q.v));
  // Perforated, weathered garden stones have rounded irregular outlines and genuinely open holes.
  for (const [cx, cy, width, height, lean] of [[84, 53, 24, 22, -0.08], [109, 48, 28, 34, 0.14], [130, 54, 19, 19, -0.20]]) {
    const outline = [[-0.5, 0], [-0.56, 0.19], [-0.33, 0.31], [-0.47, 0.49], [-0.24, 0.60],
      [-0.38, 0.78], [-0.14, 1], [0.14, 0.87], [0.06, 0.66], [0.39, 0.52], [0.27, 0.31], [0.52, 0.14], [0.42, 0]];
    const profile = fillet(outline.map(([u, z]) => [u + lean * z, z]).map(([u, z]) => [u * width, z * height]),
      outline.map(() => 1.8), 6);
    const face = (u, z, back) => back ? P(cx + 0.6 + u * 0.78, cy - 2.4, 1 + z * 0.91) : P(cx + u, cy + 2.8, 1 + z);
    const holes = [[-0.04, 0.48, 0.12, 0.095], [-0.12, 0.20, 0.095, 0.07]].map(([u, z, rx, rz]) =>
      Array.from({ length: 36 }, (_, i) => {
        const a = i / 36 * 2 * Math.PI, wear = 1 + 0.09 * Math.sin(3 * a);
        return [(u + lean * z + Math.cos(a) * rx * wear) * width, (z + Math.sin(a) * rz * wear) * height];
      }));
    setFaces(perforated(scene), [profile, ...holes], ([u, z]) => face(u, z, false), ([u, z]) => face(u, z, true));
  }
  // A roofed gallery joins the pavilion, with paired columns and shallow tile grooves.
  const gallery = mk('g', {}, scene); block(gallery, 2, 31, 25, 71, 0, 2.5, 2);
  for (const [x, y] of [[6, 35], [21, 35], [6, 64], [21, 64]]) block(gallery, x - 0.8, y - 0.8, x + 0.8, y + 0.8, 2.5, 27, 0.7);
  block(gallery, 0, 29, 27, 73, 27, 30, 2.2);
  const galleryTiles = []; for (let y = 35; y < 72; y += 7) galleryTiles.push(seg(P(2, y, 30.1), P(25, y, 30.1))); mk('path', { d: galleryTiles.join(''), class: 'nf lo' }, gallery);

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
  for (const [x, y] of [[56, 106], [64, 111], [73, 112]]) block(scene, x, y, x + 5.8, y + 4.4, 0, 2, 1.4);
  function draw(leaf, angle) {
    if (leaf.drawn === angle) return; leaf.drawn = angle;
    const sign = leaf.i ? -1 : 1, hinge = leaf.i ? 65 : 31;
    const c = Math.cos(angle), s = Math.sin(angle), near = c - sign * s >= 0 ? 0.55 : -0.55;
    const Q = (q, d) => P(hinge + sign * (q.u * c - d * s), 25.7 + q.u * s + d * c, q.v);
    setFaces(leaf, [perimeter, ...apertures], q => Q(q, near), q => Q(q, -near));
  }
  let active = -1;
  function highlight() { leaves.forEach(leaf => leaf.face.classList.toggle('hi', leaf.i === (active < 0 ? 0 : active))); }
  highlight();
  leaves.forEach(leaf => draw(leaf, leaf.rest)); const B = register(stage, (_dt, now) => { let moving = false; for (const leaf of leaves) { draw(leaf, tval(leaf.motion, now)); if (!tdone(leaf.motion, now)) moving = true; } return moving; }); bag.add(B.unregister);
  function retarget(next) {
    const previous = active; active = next; highlight();
    const now = performance.now(), origin = next < 0 ? Math.max(previous, 0) : next;
    leaves.forEach(leaf => tset(leaf.motion, next < 0 ? leaf.rest : clamp(value, 0.5, 1.2) / (1 + Math.abs(leaf.i - origin) * 0.2), now, Math.abs(leaf.i - origin) * 40));
    read.textContent = next < 0 ? 'rest' : 'lattice ' + (next + 1); B.wake();
  }
  function inside(point) { let on = false; for (let i = 0, j = hit.length - 1; i < hit.length; j = i++) { const [x, y] = hit[i], [a, b] = hit[j]; if ((y > point[1]) !== (b > point[1]) && point[0] < (a - x) * (point[1] - y) / (b - y) + x) on = !on; } return on; }
  const divider = P(48, 25, 30.5)[0];
  function pick(point) { return inside(point) ? (point[0] < divider ? 0 : 1) : -1; }
  function move(point) { const next = pick(point); if (next !== active) retarget(next); }
  const leave = () => { if (active !== -1) retarget(-1); };
  bag.add(pointer(stage, { move, leave })); bag.add(() => svg.replaceChildren()); read.textContent = 'rest';
  return { set(v) { value = v; retarget(active); }, activate(point) {
    const next = point ? pick(point) : -1;
    retarget(next === active ? -1 : next);
  }, destroy: bag.dispose };
}
hairline({ name: 'china', means: 'Hinged lattice shutters open onto a Jiangnan garden with a moon gate, rockery, pool and upturned tiled pavilion roof.', rules: [1, 2, 3, 4, 5, 6, 7, 8, 9], range: [0.5, 0.85, 1.2], mount });
