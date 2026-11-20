// Rounded paper geometry follows @lucasmarkes/hairline Riffle and Stack, Lucas Marques (MIT).
const { Cam, clamp, facing, fit, hull, open, poly, proj, ringAt, rings, prism, rrect, run, circ, rad, solid, put, mk, tween, tset, tval, tdone, pointer, register, disposer } = HL;
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
  const stations = [21, 53, 85];
  const ringPoint = (angle, thickness = 0) => [7 + (9 + thickness) * Math.cos(angle), 14 + (11 + thickness) * Math.sin(angle)];
  const leaves = mk("g", {}, g), pages = [];
  for (let i = 0; i < 6; i++) {
    const y0 = -0.6 + i * 0.8, y1 = 106 + i * 0.4;
    const outline = rrect(10, y0, 81 + i * 0.3, y1, 2.6, 10);
    const inner = rrect(11, y0 + 1, 80 + i * 0.3, y1 - 1, 1.6, 10);
    const group = mk("g", {}, leaves), plate = solid(group);
    const holes = stations.map(() => mk("path", { class: "nf lo" }, group));
    pages.push({ i, group, plate, holes, outline, inner, y0, y1,
      binding: Math.asin((7 + i * 1.7 - 14) / 11), rest: 3 + i * 1.5, tw: tween(3 + i * 1.5), last: NaN });
  }
  const hoops = stations.map(() => mk("path", { class: "sil" }, g));
  let active = -1, angle = value, lastOrder = "";
  const rayX = Math.sqrt(3 / 8), rayZ = .5, paperThickness = .8;
  const posed = (page, a) => {
    const c = Math.cos(rad(a)), s = Math.sin(rad(a));
    const [hx, hz] = ringPoint(page.binding + rad(a - page.rest));
    return (x, y, thickness = 0) => P(hx + (x - 17) * c - thickness * s, y, hz + (x - 17) * s + thickness * c);
  };
  function draw(page, a) {
    if (a === page.last) return;
    page.last = a;
    const Q = posed(page, a), top = page.outline.map((q) => Q(q.u, q.v)), bottom = page.outline.map((q) => Q(q.u, q.v, -paperThickness));
    const c = Math.cos(rad(a)), s = Math.sin(rad(a));
    page.anchor = ringPoint(page.binding + rad(a - page.rest));
    page.cos = c; page.sin = s; page.normal = rayZ * c - rayX * s;
    const face = page.normal > 0 ? 0 : -paperThickness;
    // Include the exact wire crossing even when a punch is viewed almost edge-on.
    let contact = page.binding + rad(a - page.rest);
    for (let step = 0; step < 4; step++) {
      const [x, z] = ringPoint(contact);
      const offset = (z - page.anchor[1]) * c - (x - page.anchor[0]) * s - face;
      contact -= offset / (11 * Math.cos(contact) * c + 9 * Math.sin(contact) * s);
    }
    page.contact = contact;
    const edge = run(page.inner, q => q.nu * (rayX * c + rayZ * s) + q.nv * rayX > 0);
    put(page.plate, { sil: poly(hull([...top, ...bottom])), crease: open(edge.map(q => Q(q.u, q.v, face))) });
    page.holes.forEach((hole, j) => hole.setAttribute("d", poly(circ(2.2, 24).map(q => Q(17 + q.u, stations[j] + q.v, face)))));
  }
  // Test each wire against the actual paper planes so the ring disappears behind a leaf and emerges at its punch.
  function wireHidden(x, y, z) {
    return pages.some(page => {
      const [hx, hz] = page.anchor, c = page.cos, s = page.sin;
      const offset = (z - hz) * c - (x - hx) * s;
      const distance = ((page.normal > 0 ? 0 : -paperThickness) - offset) / page.normal;
      if (distance <= 0 || !Number.isFinite(distance)) return false;
      const u = (x - hx + distance * rayX) * c + (z - hz + distance * rayZ) * s;
      const v = y + distance * rayX;
      return u >= -7 && u <= 64 + page.i * .3 && v >= page.y0 && v <= page.y1
        && !stations.some(station => Math.hypot(u, v - station) <= 2.2);
    });
  }
  function drawHoops() {
    const angles = Array.from({ length: 81 }, (_, j) => -Math.PI / 2 + j * Math.PI / 40)
      .concat(pages.map(page => page.contact)).sort((a, b) => a - b);
    stations.forEach((y, index) => {
      let outer = [], inner = [], path = "";
      function append(a) {
        const [ox, oz] = ringPoint(a, .55), [ix, iz] = ringPoint(a, -.55);
        outer.push(P(ox, y, oz)); inner.push(P(ix, y, iz));
      }
      function visible(a) {
        const [x, z] = ringPoint(a);
        return z >= 5 && !wireHidden(x, y, z);
      }
      let previous = angles[0], exposed = false;
      for (const a of angles) {
        const current = visible(a);
        if (current !== exposed) {
          let lo = previous, hi = a;
          for (let j = 0; j < 9; j++) {
            const middle = (lo + hi) / 2;
            if (visible(middle) === exposed) lo = middle; else hi = middle;
          }
          append((lo + hi) / 2);
          if (!current) { path += poly([...outer, ...inner.reverse()]); outer = []; inner = []; }
        }
        if (current) append(a);
        previous = a; exposed = current;
      }
      hoops[index].setAttribute("d", path);
    });
  }
  function paintOrder() {
    // Once a leaf turns past the sightline its underside faces us and its neighbour order reverses.
    const flat = pages.filter(page => page.normal > 0), turned = pages.filter(page => page.normal <= 0);
    const sorted = flat.concat(turned.reverse()), stamp = sorted.map(page => page.i).join();
    if (stamp === lastOrder) return;
    lastOrder = stamp; sorted.forEach((page) => leaves.append(page.group));
  }
  pages.forEach(page => draw(page, page.rest)); paintOrder(); drawHoops(); pages[5].plate.sil.classList.add("hi");
  const loop = register(stage, (_dt, now) => {
    let moving = false, changed = false, lower = 0;
    pages.forEach(page => {
      lower = Math.max(lower, tval(page.tw, now));
      if (page.last !== lower) { draw(page, lower); changed = true; }
      if (!tdone(page.tw, now)) moving = true;
    });
    if (changed) { paintOrder(); drawHoops(); }
    return moving;
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
