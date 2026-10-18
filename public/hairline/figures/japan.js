const { Cam, clamp, disposer, facing, fit, mk, open, pointer, poly, prism, proj, put, register, rings, rrect, seg, solid, spring, stepS, unproj } = HL;

// A city railway model: sleepers, a real platform, overhead wire and a commuter electric train.
function mount({ stage, svg, read }, value) {
  const bag = disposer(), C = Cam(45, 0.5, 1.6);
  fit(C, [[0, 0, -4], [174, 120, -4], [174, 0, 82], [0, 120, 0]], 200, 166);
  const P = proj(C), front = facing(C), scene = mk('g', {}, svg);
  function block(parent, x0, y0, x1, y1, z0, z1, radius = 1.4) { const [ring, inner] = rings(x0, y0, x1, y1, radius, 0.6), el = solid(parent); put(el, prism(P, front, ring, inner, z0, z1)); return el; }
  block(scene, 0, 0, 174, 120, -4, 0, 8);
  const buildings = [[9, 7, 34, 31, 48], [51, 3, 27, 31, 70], [87, 9, 33, 30, 56], [130, 14, 32, 28, 39]];
  for (const [x, y, width, depth, height] of buildings) {
    const g = mk('g', {}, scene); block(g, x, y, x + width, y + depth, 0, height, 2);
    const windows = [];
    for (let z = 9; z < height - 7; z += 12) for (let u = x + 5; u < x + width - 5; u += 9) windows.push(poly(rrect(u, z, Math.min(u + 5.5, x + width - 4), z + 6.2, 0.55, 4).map(q => P(q.u, y + depth + 0.1, q.v))));
    for (let z = 9; z < height - 7; z += 12) for (let v = y + 5; v < y + depth - 5; v += 10) windows.push(poly(rrect(v, z, Math.min(v + 5.5, y + depth - 4), z + 6.2, 0.55, 4).map(q => P(x + width + 0.1, q.u, q.v))));
    mk('path', { d: windows.join(''), class: 'nf lo' }, g);
    block(g, x + 5, y + 6, x + width - 5, y + depth - 6, height, height + 3.3, 1.5);
    block(g, x + width - 13, y + 9, x + width - 5, y + 18, height + 3.3, height + 8, 1.3);
  }
  block(scene, 4, 48, 165, 70, 0, 6, 2.5);
  mk('path', { d: seg(P(8, 67, 6.1), P(160, 67, 6.1)), class: 'nf lo' }, scene);
  const pavers = [];
  for (let x = 12; x < 157; x += 12) { pavers.push(seg(P(x, 50, 6.1), P(x, 64, 6.1))); }
  mk('path', { d: pavers.join(''), class: 'nf lo' }, scene);
  for (const x of [18, 59, 103, 150]) block(scene, x, 53, x + 2.8, 56, 6, 33, 1.3);
  block(scene, 10, 48, 159, 63, 33, 36, 2.5);
  mk('path', { d: seg(P(16, 52, 36.2), P(152, 52, 36.2)), class: 'nf lo' }, scene);
  // Track bed, two rails and separate sleepers remain continuous beneath the vehicle.
  block(scene, 3, 75, 170, 111, 0, 1.5, 4);
  for (let x = 8; x < 168; x += 10) block(scene, x, 80, x + 3.2, 104, 1.5, 2.7, 0.8);
  for (const y of [85, 99]) { block(scene, 4, y - 0.8, 169, y + 0.8, 2.7, 4.2, 0.7); }
  // Overhead masts and catenary are behind the train, in a physically separate depth plane.
  for (const x of [14, 157]) { block(scene, x, 72, x + 2.4, 74.4, 0, 54, 1); mk('path', { d: seg(P(x + 1.2, 73.2, 53), P(x + 1.2, 93, 53)), class: 'nf' }, scene); }
  mk('path', { d: open(Array.from({ length: 49 }, (_, k) => { const x = 15 + k * 3; return P(x, 92, 52.8 - 2.2 * Math.sin(k / 48 * Math.PI)); })), class: 'nf lo' }, scene);
  const train = mk('g', { 'data-part': 'train' }, scene), under = solid(train), body = solid(train), roof = solid(train);
  const windows = mk('path', { class: 'nf' }, train), detail = mk('path', { class: 'nf lo' }, train), pantograph = mk('path', { class: 'nf' }, train);
  const wheels = [-19, 19].map(() => ({ tyre: mk('path', { class: 'sil' }, train), hub: mk('path', { class: 'nf lo' }, train) }));
  const rest = 80, position = spring(rest); let over = null, drawn = NaN;
  function draw() {
    if (drawn === position.x) return; drawn = position.x;
    const Q = (x, y, z) => P(position.x + x, 92 + y, z);
    for (const [el, x0, y0, x1, y1, z0, z1, radius] of [[under, -25, -6.8, 25, 6.8, 5, 10, 2], [body, -29, -8.5, 29, 8.5, 10, 34, 4], [roof, -26, -7.3, 26, 7.3, 34, 37, 3]]) {
      const [ring, inner] = rings(x0, y0, x1, y1, radius, 0.7); put(el, prism(Q, front, ring, inner, z0, z1));
    }
    const glass = [], marks = [];
    for (const [x0, x1] of [[-24, -16], [-4.5, 4.5], [16, 24]]) glass.push(poly(rrect(x0, 22, x1, 30.5, 1, 6).map(q => Q(q.u, 8.6, q.v))));
    for (const x of [-10, 10]) {
      glass.push(poly(rrect(x - 3.3, 12.5, x + 3.3, 31.5, 0.9, 6).map(q => Q(q.u, 8.6, q.v))));
      glass.push(poly(rrect(x - 2.3, 23, x + 2.3, 29.5, 0.5, 5).map(q => Q(q.u, 8.7, q.v))));
      marks.push(seg(Q(x, 8.7, 13), Q(x, 8.7, 22)));
    }
    glass.push(poly(rrect(-5.5, 22, 5.5, 30.5, 1.3, 7).map(q => Q(28.9, q.u, q.v)))); windows.setAttribute('d', glass.join(''));
    marks.push(seg(Q(-26, 8.7, 19), Q(26, 8.7, 19)), seg(Q(29.1, -6, 18), Q(29.1, 6, 18)), seg(Q(29.1, -4.5, 14), Q(29.1, -2.5, 14)), seg(Q(29.1, 2.5, 14), Q(29.1, 4.5, 14)));
    detail.setAttribute('d', marks.join('')); pantograph.setAttribute('d', open([Q(-7, -2, 37.2), Q(-1, -2, 43.5), Q(-7, -2, 50.9), Q(-13, -2, 43.5), Q(-7, -2, 37.2)]) + seg(Q(-10, -4, 50.9), Q(-4, 1, 50.9)));
    wheels.forEach((part, i) => { const x = i ? 19 : -19; for (const [el, radius, y] of [[part.tyre, 3.9, 8.9], [part.hub, 1.5, 9]]) el.setAttribute('d', poly(Array.from({ length: 36 }, (_, k) => { const a = k / 36 * Math.PI * 2; return Q(x + Math.cos(a) * radius, y, 6.7 + Math.sin(a) * radius); }))); });
    body.sil.classList.add('hi');
  }
  draw(); const B = register(stage, dt => { const moving = stepS(position, dt); draw(); return moving; }); bag.add(B.unregister);
  function retarget() { position.t = over ? clamp(rest + clamp((over[0] - rest) / 70, -1, 1) * value, 34, 140) : rest; read.textContent = over ? 'city rail' : 'rest'; B.wake(); }
  function move(point) { const q = unproj(C, point[0], point[1], 6); over = q[0] >= 0 && q[0] <= 174 && q[1] >= -8 && q[1] <= 120 ? q : null; retarget(); }
  const leave = () => { over = null; retarget(); };
  bag.add(pointer(stage, { move, leave })); bag.add(() => svg.replaceChildren()); read.textContent = 'rest';
  return { set(v) { value = v; retarget(); }, activate(point) { if (point) move(point); else leave(); }, destroy: bag.dispose };
}
hairline({ name: 'japan', means: 'A commuter electric train passes a city platform beneath its overhead wire, returning to the station when the pointer leaves.', rules: [1, 3, 4, 5, 6, 7, 8, 9], range: [25, 45, 65], mount });
