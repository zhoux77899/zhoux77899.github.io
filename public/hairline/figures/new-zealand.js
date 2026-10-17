const { Cam, clamp, disposer, facing, fit, hull, mk, open, pointer, poly, prism, proj, put, register, rings, rrect, run, seg, solid, spring, stepS, unproj } = HL;

// A coastal-road diorama: the vehicle stays on the road, rather than exploding into layers.
function mount({ stage, svg, read }, value) {
  const bag = disposer(), C = Cam(45, 0.5, 1.65);
  fit(C, [[0, 0, -5], [166, 124, -5], [166, 0, 65], [0, 124, 0]], 200, 166);
  const P = proj(C), front = facing(C), scene = mk('g', {}, svg);
  const block = (parent, x0, y0, x1, y1, z0, z1, radius = 2) => {
    const [ring, inner] = rings(x0, y0, x1, y1, radius, 0.7);
    const el = solid(parent); put(el, prism(P, front, ring, inner, z0, z1)); return el;
  };
  block(scene, 0, 0, 166, 124, -5, 0, 9);
  const coast = x => 104 + 4.5 * Math.sin(x * 0.034 + 0.3);
  const sea = [[3, 121], [163, 121], ...Array.from({ length: 65 }, (_, k) => { const x = 163 - k * 2.5; return [x, coast(x)]; })];
  mk('path', { d: poly(sea.map(([x, y]) => P(x, y, 0.2))), class: 'lo' }, scene);
  for (const [x, y, width] of [[28, 115, 20], [71, 118, 28], [126, 113, 21]]) {
    mk('path', { d: open(Array.from({ length: 25 }, (_, k) => P(x + k * width / 24, y + Math.sin(k / 24 * Math.PI) * 0.6, 0.3))), class: 'nf lo' }, scene);
  }
  // Continuous opaque ridge surfaces carry quiet topographic contours rather than stacked terraces.
  for (const [cx, cy, rx, ry, height, phase] of [[33, 27, 29, 23, 42, 0.2], [77, 31, 35, 28, 63, 1.5], [126, 34, 32, 26, 49, 2.2]]) {
    const sections = [];
    for (let level = 0; level < 9; level++) {
      const scale = 1 - level * 0.116, z = level / 8 * height;
      const ring = Array.from({ length: 72 }, (_, k) => {
        const a = k / 72 * Math.PI * 2, mod = 1 + 0.08 * Math.sin(a * 3 + phase) + 0.05 * Math.cos(a * 5);
        return { u: cx + Math.sin(level * 0.3 + phase) * 2 + rx * scale * mod * Math.cos(a), v: cy - level * 0.35 + ry * scale * mod * Math.sin(a), nu: Math.cos(a), nv: Math.sin(a) };
      });
      sections.push({ ring, z });
    }
    mk('path', { d: poly(hull(sections.flatMap(({ ring, z }) => ring.map(q => P(q.u, q.v, z))))), class: 'sil' }, scene);
    const creases = sections.filter((_, i) => i === 1 || i === 3 || i === 5 || i === 7).map(({ ring, z }) => open(run(ring, front).map(q => P(q.u, q.v, z))));
    mk('path', { d: creases.join(''), class: 'nf lo' }, scene);
  }
  const roadY = x => 80 + 7 * Math.sin(x * 0.038 + 0.1), sample = (offset, z) => Array.from({ length: 81 }, (_, k) => { const x = 6 + k * 1.925; return P(x, roadY(x) + offset, z); });
  const road = [...sample(-10, 1.3), ...sample(10, 1.3).reverse()];
  mk('path', { d: poly(road), class: 'sil' }, scene);
  mk('path', { d: open(sample(-8.3, 1.4)) + open(sample(8.3, 1.4)), class: 'nf lo' }, scene);
  for (let x = 10; x < 157; x += 14) mk('path', { d: open(Array.from({ length: 8 }, (_, k) => P(x + k * 0.85, roadY(x + k * 0.85), 1.5))), class: 'nf lo' }, scene);
  // Small roadside posts belong to the road and stay behind the moving SUV.
  for (const x of [18, 49, 114, 146]) { block(scene, x - 0.8, roadY(x) - 13, x + 0.8, roadY(x) - 11.4, 0, 7, 0.7); }
  const car = mk('g', { 'data-part': 'suv' }, scene), farWheels = [mk('path', { class: 'sil' }, car), mk('path', { class: 'sil' }, car)];
  const body = solid(car), cabin = solid(car), glass = mk('path', { class: 'nf' }, car), details = mk('path', { class: 'nf lo' }, car);
  const nearWheels = [-9, 9].map(() => ({ tyre: mk('path', { class: 'sil' }, car), hub: mk('path', { class: 'nf lo' }, car) }));
  const position = spring(73), rest = 73; let over = null, drawn = NaN;
  function draw() {
    if (drawn === position.x) return; drawn = position.x;
    const x = position.x, y = roadY(x), angle = Math.atan(0.266 * Math.cos(x * 0.038 + 0.1));
    const Q = (u, v, z) => P(x + u * Math.cos(angle) - v * Math.sin(angle), y + u * Math.sin(angle) + v * Math.cos(angle), z);
    const wheel = (u, v, radius) => poly(Array.from({ length: 40 }, (_, k) => { const a = k / 40 * Math.PI * 2; return Q(u + Math.cos(a) * radius, v, 5.5 + Math.sin(a) * radius); }));
    farWheels.forEach((el, i) => el.setAttribute('d', wheel(i ? 9 : -9, -7.5, 4.2)));
    const [br, bi] = rings(-16, -8, 16, 8, 2.8, 0.8); put(body, prism(Q, front, br, bi, 6, 14));
    const foot = rrect(-11.3, -7.3, 8.8, 7.3, 1.6, 8), roof = rrect(-8.3, -6.6, 6.5, 6.6, 1.5, 8), inner = rrect(-7.5, -5.8, 5.7, 5.8, 0.8, 8);
    put(cabin, { sil: poly(hull(foot.map(q => Q(q.u, q.v, 13)).concat(roof.map(q => Q(q.u, q.v, 24))))), crease: open(inner.map(q => Q(q.u, q.v, 24))) });
    const windows = [];
    for (const [u0, u1] of [[-9.3, -2.5], [-1, 6.4]]) windows.push(poly([[u0, 15.8], [u1, 15.8], [u1 - 1.5, 22], [u0 + 1, 22]].map(([u, z]) => Q(u, 7.36 - (z - 13) * 0.063, z))));
    windows.push(poly([Q(8.7, -5.9, 14.9), Q(8.7, 5.9, 14.9), Q(6.6, 5.3, 22.7), Q(6.6, -5.3, 22.7)])); glass.setAttribute('d', windows.join(''));
    details.setAttribute('d', seg(Q(-2, 7.6, 7.5), Q(-2, 7.1, 14)) + seg(Q(-5, 7.5, 13), Q(-2.8, 7.5, 13)) + seg(Q(14.7, -5, 13.9), Q(14.7, 5, 13.9)) + seg(Q(-7, -5.2, 25), Q(4.7, -5.2, 25)) + seg(Q(-7, 5.2, 25), Q(4.7, 5.2, 25)));
    nearWheels.forEach((part, i) => { part.tyre.setAttribute('d', wheel(i ? 9 : -9, 8.2, 4.2)); part.hub.setAttribute('d', wheel(i ? 9 : -9, 8.3, 1.8)); });
    body.sil.classList.add('hi');
  }
  draw(); const B = register(stage, dt => { const moving = stepS(position, dt); draw(); return moving; }); bag.add(B.unregister);
  function retarget() { position.t = over ? clamp(rest + clamp((over[0] - rest) / 60, -1, 1) * value, 24, 142) : rest; read.textContent = over ? 'coast road' : 'rest'; B.wake(); }
  function move(point) { const q = unproj(C, point[0], point[1], 1.3); over = q[0] >= 0 && q[0] <= 166 && q[1] >= -5 && q[1] <= 124 ? q : null; retarget(); }
  const leave = () => { over = null; retarget(); };
  bag.add(pointer(stage, { move, leave })); bag.add(() => svg.replaceChildren()); read.textContent = 'rest';
  return { set(v) { value = v; retarget(); }, activate(point) { if (point) move(point); else leave(); }, destroy: bag.dispose };
}
hairline({ name: 'new-zealand', means: 'An SUV follows a winding coastal road below alpine ridges; it returns to its lookout when the pointer leaves.', rules: [1, 3, 4, 5, 6, 7, 8, 9], range: [25, 45, 65], mount });
