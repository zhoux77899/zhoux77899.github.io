// Rounded paper geometry follows @lucasmarkes/hairline Riffle and Stack, Lucas Marques (MIT).
const { Cam, clamp, facing, fit, hull, open, poly, proj, ringAt, rings, prism, rrect, run, seg, circ, rad, solid, put, mk, tween, tset, tval, tdone, pointer, register, disposer } = HL;
function mount({ stage, svg, read }, value) {
  const bag = disposer(), C = Cam(45, 0.5, 1.58);
  fit(C, [[-91, -10, 0], [92, 117, 0], [-91, 117, 0], [92, -10, 0], [26, -2, 99]], 200, 166);
  const P = proj(C), front = facing(C), g = mk("g", {}, svg);
  function cover(x0, x1) {
    const foot = rrect(x0, -7, x1, 113, 6, 10), top = rrect(x0 + 0.8, -6.2, x1 - 0.8, 112.2, 5.2, 10);
    const inner = rrect(x0 + 2, -5, x1 - 2, 111, 4, 10);
    put(solid(g), { sil: poly(hull(ringAt(P, foot, 0).concat(ringAt(P, top, 3.3)))), crease: open(ringAt(P, run(inner, front), 3.3)) });
    mk("path", { d: poly(ringAt(P, rrect(x0 + 5, -1, x1 - 5, 107, 3, 10), 3.4)), class: "nf lo" }, g);
  }
  cover(-88, -7); cover(7, 88);
  const [spine, spineCrease] = rings(-9, -8, 9, 114, 4.5, 1.3);
  put(solid(g), prism(P, front, spine, spineCrease, 0, 5));
  const [mechanism, mechanismCrease] = rings(-5.5, 4, 6.5, 103, 2.2, 0.8);
  put(solid(g), prism(P, front, mechanism, mechanismCrease, 5, 7));
  for (const y of [7, 100]) {
    mk("path", { d: poly(circ(1.4, 24).map((q) => P(0.5 + q.u, y + q.v, 7.1))), class: "nf lo" }, g);
  }
  const metal = (y, from, to) => {
    const outer = [], inner = [], count = 32;
    for (let j = 0; j <= count; j++) {
      const a = from + (to - from) * j / count;
      outer.push(P(7 + 9.5 * Math.cos(a), y, 14 + 11.5 * Math.sin(a)));
      inner.push(P(7 + 8.5 * Math.cos(a), y, 14 + 10.5 * Math.sin(a)));
    }
    return poly([...outer, ...inner.reverse()]);
  };
  for (const y of [21, 53, 85]) mk("path", { d: metal(y, Math.PI / 2, Math.PI * 1.5), class: "sil" }, g);
  const leaves = mk("g", {}, g), pages = [];
  for (let i = 0; i < 6; i++) {
    const y0 = -0.6 + i * 0.8, y1 = 106 + i * 0.4;
    const outline = rrect(10, y0, 81 + i * 0.3, y1, 2.6, 10);
    const inner = rrect(11, y0 + 1, 80 + i * 0.3, y1 - 1, 1.6, 10);
    const group = mk("g", {}, leaves), plate = solid(group);
    const holes = [21, 53, 85].map(() => mk("path", { class: "nf lo" }, group));
    const grooves = [0.35, 0.7, 1.05].map(() => mk("path", { class: "nf lo" }, group));
    pages.push({ i, group, plate, holes, grooves, outline, inner, y1,
      z: 7 + i * 1.7, rest: 3 + i * 1.5, tw: tween(3 + i * 1.5), last: NaN });
  }
  for (const y of [21, 53, 85]) mk("path", { d: metal(y, -Math.PI / 2, Math.PI / 2), class: "sil" }, g);
  let active = -1, angle = value, lastOrder = "";
  const posed = (page, a) => {
    const c = Math.cos(rad(a)), s = Math.sin(rad(a));
    return (x, y, thickness = 0) => P(8 + (x - 8) * c - thickness * s, y, page.z + (x - 8) * s + thickness * c);
  };
  function draw(page, a) {
    if (a === page.last) return;
    page.last = a;
    const Q = posed(page, a), top = page.outline.map((q) => Q(q.u, q.v)), bottom = page.outline.map((q) => Q(q.u, q.v, -1.4));
    put(page.plate, { sil: poly(hull([...top, ...bottom])), crease: open(run(page.inner, front).map((q) => Q(q.u, q.v))) });
    page.holes.forEach((hole, j) => hole.setAttribute("d", poly(circ(2.2, 24).map((q) => Q(17 + q.u, 21 + j * 32 + q.v)))));
    page.grooves.forEach((line, j) => line.setAttribute("d", seg(Q(13, page.y1 - 0.3, -(j + 1) * 0.35), Q(79, page.y1 - 0.3, -(j + 1) * 0.35))));
  }
  function depth(page) {
    const a = rad(page.last), x = 8 + 37 * Math.cos(a), z = page.z + 37 * Math.sin(a);
    return 0.612 * (x + page.y1 / 2) + 0.5 * z;
  }
  function paintOrder() {
    const sorted = pages.slice().sort((a, b) => depth(a) - depth(b)), stamp = sorted.map((page) => page.i).join();
    if (stamp === lastOrder) return;
    lastOrder = stamp; sorted.forEach((page) => leaves.append(page.group));
  }
  pages.forEach((page) => draw(page, page.rest)); paintOrder(); pages[5].plate.sil.classList.add("hi");
  const loop = register(stage, (_dt, now) => {
    let moving = false;
    pages.forEach((page) => { draw(page, tval(page.tw, now)); if (!tdone(page.tw, now)) moving = true; }); paintOrder(); return moving;
  }); bag.add(loop.unregister);
  const centers = pages.map((page) => posed(page, page.rest)(67, 14 + page.i * 17));
  const hitFaces = pages.map((page) => page.outline.map((q) => posed(page, page.rest)(q.u, q.v)));
  function inside([x, y], ring) {
    let contained = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const a = ring[i], b = ring[j];
      if ((a[1] > y) !== (b[1] > y) && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) contained = !contained;
    }
    return contained;
  }
  function select(next) {
    if (next === active) return;
    const from = next < 0 ? active : next, now = performance.now(); active = next;
    pages.forEach((page) => {
      const target = next < 0 ? page.rest : page.i < next ? page.rest : clamp(angle + (page.i - next) * 5.5, 48, 85);
      tset(page.tw, target, now, Math.abs(page.i - from) * 42);
      page.plate.sil.classList.toggle("hi", page.i === (next < 0 ? 5 : next));
    });
    read.textContent = next < 0 ? "rest" : "leaf " + (next + 1); loop.wake();
  }
  function hit([x, y]) {
    if (!hitFaces.some((face) => inside([x, y], face))) return -1;
    let nearest = -1, score = Infinity;
    centers.forEach((p, i) => { const d = Math.hypot(x - p[0], y - p[1]); if (d < score) { nearest = i; score = d; } });
    return score < 56 ? nearest : -1;
  }
  bag.add(pointer(stage, { move: (point) => select(hit(point)), leave: () => select(-1) }));
  bag.add(() => svg.replaceChildren()); read.textContent = "rest";
  return {
    set: (v) => { angle = clamp(v, 52, 79); if (active >= 0) { const previous = active; active = -1; select(previous); } },
    activate: (point) => { const next = point ? hit(point) : -1; select(next === active ? -1 : next); },
    destroy: bag.dispose,
  };
}
hairline({ name: "folio", means: "A hard-cover ring binder opens its thick paper leaves around visible metal rings, one turn spreading through the stack.", rules: [1, 2, 4, 5, 6, 7, 8, 9], range: [52, 66, 79], mount });
