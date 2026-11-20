const { Cam, clamp, disposer, facing, fit, hull, mk, open, pointer, poly, prism, proj, put, register, rings, rrect, run, seg, solid, spring, stepS } = HL;

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
  // Each station cuts across the same range, from its far foot through the crest
  // to the coastal foothills. Adjacent sections share their saddle and spur edges.
  const peaks = [[4, 3], [14, 16], [23, 29], [31, 43], [38, 38], [48, 20],
    [58, 28], [68, 41], [78, 64], [84, 55], [93, 46], [103, 27],
    [114, 37], [124, 48], [131, 44], [140, 26], [149, 13], [159, 2]];
  const profiles = peaks.map(([x, height]) => {
    const crest = 24 + 5 * Math.sin(x * 0.072), toe = 61 + 4 * Math.sin(x * 0.095);
    return [[x, 5, 0.4], [x, crest - 8, height * 0.57], [x, crest, height],
      [x, crest + 8, height * (0.58 + 0.09 * Math.sin(x * 0.19))],
      [x, toe - 10, height * 0.15], [x, toe, 0.4]];
  });
  // Slice each exposed slope with two contour planes. Intersections come from
  // the terrain triangles themselves, so the lines wrap the folds and saddles.
  const contour = (triangle, level) => {
    const points = [];
    triangle.forEach((a, i) => {
      const b = triangle[(i + 1) % 3];
      if ((a[2] < level) === (b[2] < level)) return;
      const t = (level - a[2]) / (b[2] - a[2]);
      points.push(P(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, level));
    });
    return points.length === 2 ? seg(...points) : '';
  };
  profiles.slice(1).forEach((next, index) => {
    const previous = profiles[index], left = previous.map(point => P(...point)), right = next.map(point => P(...point));
    for (let band = 0; band < left.length - 1; band++) {
      const surface = [left[band], right[band], right[band + 1], left[band + 1]];
      mk('path', { d: poly(surface), class: 'fo' }, scene);
      if (band >= 2) {
        const [a, b, c, d] = [previous[band], next[band], next[band + 1], previous[band + 1]];
        const tracing = [13, 30].map(z => contour([a, b, c], z) + contour([c, d, a], z)).join('');
        if (tracing) mk('path', { d: tracing, class: 'nf lo' }, scene);
      }
      const edges = [];
      if (band === 0 || band === 2) edges.push(seg(left[band], right[band]));
      if (band === 4) edges.push(seg(left[5], right[5]));
      if (index === 0) edges.push(seg(left[band], left[band + 1]));
      if (index === profiles.length - 2) edges.push(seg(right[band], right[band + 1]));
      if (edges.length) mk('path', { d: edges.join(''), class: 'nf sil' }, scene);
      if (band >= 2 && band <= 3 && [3, 7, 9, 13].includes(index)) {
        mk('path', { d: seg(left[band], left[band + 1]), class: 'nf lo' }, scene);
      }
    }
  });
  const roadY = x => 80 + 7 * Math.sin(x * 0.038 + 0.1), sample = (offset, z) => Array.from({ length: 81 }, (_, k) => { const x = 6 + k * 1.925; return P(x, roadY(x) + offset, z); });
  const road = [...sample(-10, 1.3), ...sample(10, 1.3).reverse()];
  mk('path', { d: poly(road), class: 'sil' }, scene);
  mk('path', { d: open(sample(-8.3, 1.4)) + open(sample(8.3, 1.4)), class: 'nf lo' }, scene);
  for (let x = 10; x < 157; x += 14) mk('path', { d: open(Array.from({ length: 8 }, (_, k) => P(x + k * 0.85, roadY(x + k * 0.85), 1.5))), class: 'nf lo' }, scene);
  // Small roadside posts belong to the road and stay behind the moving SUV.
  for (const x of [18, 49, 114, 146]) { block(scene, x - 0.8, roadY(x) - 13, x + 0.8, roadY(x) - 11.4, 0, 7, 0.7); }
  // Screen x increases strictly along this road. A fixed envelope includes both
  // the pavement and a vehicle roof, without turning the mountains into controls.
  const route = Array.from({ length: 155 }, (_, i) => {
    const x = i + 6;
    return { x, center: P(x, roadY(x), 1.3) };
  });
  const car = mk('g', { 'data-part': 'suv' }, scene), farWheels = [mk('path', { class: 'sil' }, car), mk('path', { class: 'sil' }, car)];
  const body = solid(car), cabin = solid(car), glass = mk('path', { class: 'nf' }, car), details = mk('path', { class: 'nf lo' }, car);
  const nearWheels = [-9, 9].map(() => ({ tyre: mk('path', { class: 'sil' }, car), hub: mk('path', { class: 'nf lo' }, car) }));
  const position = spring(73), rest = 73; let over = null, drawn = NaN;
  function draw() {
    if (drawn === position.x) return; drawn = position.x;
    const x = position.x, y = roadY(x), angle = Math.atan(0.266 * Math.cos(x * 0.038 + 0.1));
    const Q = (u, v, z) => P(x + u * Math.cos(angle) - v * Math.sin(angle), y + u * Math.sin(angle) + v * Math.cos(angle), z);
    const localFront = q => front({ nu: q.nu * Math.cos(angle) - q.nv * Math.sin(angle),
      nv: q.nu * Math.sin(angle) + q.nv * Math.cos(angle) });
    const wheel = (u, v, radius) => poly(Array.from({ length: 40 }, (_, k) => { const a = k / 40 * Math.PI * 2; return Q(u + Math.cos(a) * radius, v, 5.5 + Math.sin(a) * radius); }));
    farWheels.forEach((el, i) => el.setAttribute('d', wheel(i ? 9 : -9, -7.5, 4.2)));
    const [br, bi] = rings(-16, -8, 16, 8, 2.8, 0.8); put(body, prism(Q, localFront, br, bi, 6, 14));
    const foot = rrect(-11.3, -7.3, 8.8, 7.3, 1.6, 8), roof = rrect(-8.3, -6.6, 6.5, 6.6, 1.5, 8), inner = rrect(-7.5, -5.8, 5.7, 5.8, 0.8, 8);
    put(cabin, { sil: poly(hull(foot.map(q => Q(q.u, q.v, 13)).concat(roof.map(q => Q(q.u, q.v, 24))))), crease: open(run(inner, localFront).map(q => Q(q.u, q.v, 24))) });
    const windows = [];
    for (const [u0, u1] of [[-9.3, -2.5], [-1, 6.4]]) windows.push(poly([[u0, 15.8], [u1, 15.8], [u1 - 1.5, 22], [u0 + 1, 22]].map(([u, z]) => Q(u, 7.36 - (z - 13) * 0.063, z))));
    const windscreen = (v, z) => Q(8.8 - 2.3 * (z - 13) / 11, v, z);
    windows.push(poly([windscreen(-5.7, 14.9), windscreen(5.7, 14.9), windscreen(5.2, 22.7), windscreen(-5.2, 22.7)])); glass.setAttribute('d', windows.join(''));
    details.setAttribute('d', seg(Q(-2, 7.6, 7.5), Q(-2, 7.1, 14)) + seg(Q(-5, 7.5, 13), Q(-2.8, 7.5, 13)) + seg(Q(14.7, -5, 13.9), Q(14.7, 5, 13.9)) + seg(Q(-7, -5.2, 25), Q(4.7, -5.2, 25)) + seg(Q(-7, 5.2, 25), Q(4.7, 5.2, 25)));
    nearWheels.forEach((part, i) => { part.tyre.setAttribute('d', wheel(i ? 9 : -9, 8.2, 4.2)); part.hub.setAttribute('d', wheel(i ? 9 : -9, 8.3, 1.8)); });
    body.sil.classList.add('hi');
  }
  draw(); const B = register(stage, dt => { const moving = stepS(position, dt); draw(); return moving; }); bag.add(B.unregister);
  function retarget() {
    position.t = over === null ? rest : clamp(rest + (over - rest) * value / 45, 24, 142);
    read.textContent = over === null ? 'rest' : 'coast road';
    B.wake();
  }
  function move([sx, sy]) {
    const end = route.at(-1), index = route.findIndex(({ center }) => center[0] >= sx);
    over = null;
    if (sx >= route[0].center[0] - 5 && sx <= end.center[0] + 5) {
      const right = index < 0 ? end : route[index], left = route[Math.max(0, (index < 0 ? route.length - 1 : index) - 1)];
      const t = clamp((sx - left.center[0]) / (right.center[0] - left.center[0] || 1), 0, 1);
      const road = left.center[1] + (right.center[1] - left.center[1]) * t;
      if (sy >= road - 42 && sy <= road + 13) over = left.x + (right.x - left.x) * t;
    }
    retarget();
  }
  const leave = () => { over = null; retarget(); };
  bag.add(pointer(stage, { move, leave })); bag.add(() => svg.replaceChildren()); read.textContent = 'rest';
  return { set(v) { value = v; retarget(); }, activate(point) { if (point) move(point); else leave(); }, destroy: bag.dispose };
}
hairline({ name: 'new-zealand', means: 'An SUV follows a winding coastal road below alpine ridges; it returns to its lookout when the pointer leaves.', rules: [1, 3, 4, 5, 6, 7, 8, 9], range: [25, 45, 65], mount });
