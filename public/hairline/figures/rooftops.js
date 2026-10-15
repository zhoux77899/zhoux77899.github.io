const {
  Cam, clamp, disposer, facing, fillet, fit, mk, open, pointer, poly, prism, proj,
  put, register, rings, rrect, run, seg, solid, tdone, tset, tval, tween,
} = HL;

// Roof tiles follow the curved roof surface; they are not a flat grid.
// The near roof slope masks the far one, and the ridge cap is painted last.
function mount({ stage, svg, read }, value) {
  const bag = disposer(), C = Cam(45, 0.5, 1.78);
  let lift = value, active = -1;
  fit(C, [[0, -8, 0], [157, 89, 0], [157, -8, 0], [0, 89, 0], [77, 30, 104]], 200, 166);
  const P = proj(C), front = facing(C), g = mk("g", {}, svg);
  const sample = (ring) => ring.flatMap((q, i) => {
    const b = ring[(i + 1) % ring.length], n = Math.max(1, Math.ceil(Math.hypot(b.u - q.u, b.v - q.v) / 1.4));
    return Array.from({ length: n }, (_, k) => ({ ...q, u: q.u + (b.u - q.u) * k / n, v: q.v + (b.v - q.v) * k / n }));
  });
  const [street, streetIn] = rings(0, -8, 157, 89, 7, 1.4);
  put(solid(g), prism(P, front, street, streetIn, 0, 3));
  const [kerb, kerbIn] = rings(3, 70, 154, 83, 3, 1);
  put(solid(g), prism(P, front, kerb, kerbIn, 3, 5));
  for (const x of [34, 71, 113]) mk("path", { d: seg(P(x, 73, 5.1), P(x, 80, 5.1)), class: "nf lo" }, g);

  const houses = [[8, 12, 35, 36, 47], [59, -1, 47, 39, 51], [114, 17, 39, 33, 43]].map(([x, y, height, w, d], i) => {
    const group = mk("g", {}, g), x1 = x + w, y1 = y + d;
    const [foot, footIn] = rings(x - 1.5, y - 1.5, x1 + 1.5, y1 + 1.5, 2.8, 0.8);
    put(solid(group), prism(P, front, foot, footIn, 3, 6));
    const [body, bodyIn] = rings(x, y, x1, y1, 2, 0.8);
    put(solid(group), prism(P, front, body, bodyIn, 6, height));
    const facade = (ring) => poly(ring.map((q) => P(q.u, y1 + 0.1, q.v)));
    const side = (ring) => poly(ring.map((q) => P(x1 + 0.1, q.u, q.v)));
    // Timber shutters: a rounded frame, vertical lattice and three rails.
    const a = x + 5.5, b = x1 - 5.5, top = Math.min(height - 5, 29);
    mk("path", { d: facade(rrect(a, 7, b, top, 0.9, 5)), class: "nf" }, group);
    const lattice = [];
    for (let k = 1; k < 5; k++) lattice.push(seg(P(a + (b - a) * k / 5, y1 + 0.15, 8), P(a + (b - a) * k / 5, y1 + 0.15, top - 1)));
    for (const z of [14, 21]) if (z < top - 1) lattice.push(seg(P(a + 1, y1 + 0.15, z), P(b - 1, y1 + 0.15, z)));
    mk("path", { d: lattice.join(""), class: "nf lo" }, group);
    const sy0 = y + 9, sy1 = y1 - 11, sz0 = height - 19, sz1 = height - 8;
    mk("path", { d: side(rrect(sy0, sz0, sy1, sz1, 1, 5)), class: "nf" }, group);
    const bars = [seg(P(x1 + 0.15, sy0 + 1, (sz0 + sz1) / 2), P(x1 + 0.15, sy1 - 1, (sz0 + sz1) / 2))];
    for (let k = 1; k < 4; k++) bars.push(seg(P(x1 + 0.15, sy0 + (sy1 - sy0) * k / 4, sz0 + 1), P(x1 + 0.15, sy0 + (sy1 - sy0) * k / 4, sz1 - 1)));
    mk("path", { d: bars.join(""), class: "nf lo" }, group);
    const roofG = mk("g", {}, group), x0 = x - 4, rx1 = x1 + 4, y0 = y - 4, ry1 = y1 + 4, mx = (x + x1) / 2;
    const profile = Array.from({ length: 41 }, (_, k) => {
      const u = x + w * k / 40, t = Math.abs(u - mx) / ((w + 8) / 2);
      return [u, height + 18 * (1 - t) ** 1.65 + 2.7 * t ** 6 - 2.2];
    });
    const wall = [[x, height], ...profile, [x1, height]];
    mk("path", { d: poly(fillet(wall, wall.map(() => 0.6), 3).map(([u, z]) => P(u, y1 + 0.1, z))), class: "sil" }, group);
    mk("path", { d: seg(P(x + 4, y1 + 0.15, height + 1), P(x1 - 4, y1 + 0.15, height + 1)) + seg(P(mx, y1 + 0.15, height + 1), P(mx, y1 + 0.15, height + 12)), class: "nf lo" }, group);
    group.appendChild(roofG);
    const sides = [[x0, mx], [mx, rx1]].map(([u0, u1]) => ({
      ring: sample(rrect(u0, y0, u1, ry1, 1.2, 8)), inset: sample(rrect(u0 + 0.9, y0 + 0.9, u1 - 0.9, ry1 - 0.9, 0.5, 5)),
      back: mk("path", { class: "lo" }, roofG), face: mk("path", { class: "sil" }, roofG),
      crease: mk("path", { class: "nf lo" }, roofG), tiles: mk("path", { class: "nf lo" }, roofG), u0, u1,
    }));
    const cap = solid(roofG), capRing = rrect(mx - 2.3, y0 - 0.4, mx + 2.3, ry1 + 0.4, 2.2, 10);
    const capIn = rrect(mx - 1.5, y0 + 0.4, mx + 1.5, ry1 - 0.4, 1.4, 8);
    const joints = mk("path", { class: "nf lo" }, roofG), rest = [0, 2.8, 0.6][i];
    return { i, x, y, w, d, height, mx, x0, rx1, y0, ry1, sides, cap, capRing, capIn, joints, rest, motion: tween(rest), drawn: NaN };
  });

  // A shallow upturn at the eaves, and slightly raised corners along the gable ends.
  function zAt(h, x, y, amount) {
    const t = clamp(Math.abs(x - h.mx) / ((h.rx1 - h.x0) / 2), 0, 1);
    const end = Math.abs((y - (h.y0 + h.ry1) / 2) / ((h.ry1 - h.y0) / 2));
    return h.height + amount + 18 * (1 - t) ** 1.65 + 2.7 * t ** 6 + 1.15 * end ** 8 * t * t;
  }
  for (const h of houses) h.hit = h.sides.map((s) => s.ring.map((q) => P(q.u, q.v, zAt(h, q.u, q.v, h.rest))));
  function inside(p, ring) {
    let on = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [x, y] = ring[i], [a, b] = ring[j];
      if ((y > p[1]) !== (b > p[1]) && p[0] < (a - x) * (p[1] - y) / (b - y) + x) on = !on;
    }
    return on;
  }
  function draw(h, amount) {
    if (amount === h.drawn) return;
    h.drawn = amount;
    const at = (ring, dz) => ring.map((q) => P(q.u, q.v, zAt(h, q.u, q.v, amount) + dz));
    for (const slope of h.sides) {
      slope.back.setAttribute("d", poly(at(slope.ring, -2.2)));
      slope.face.setAttribute("d", poly(at(slope.ring, 0)));
      slope.crease.setAttribute("d", open(at(run(slope.inset, front), 0.05)));
      const tiles = [], lo = slope.u0 + 1.6, hi = slope.u1 - 1.6;
      for (const t of [0.28, 0.57, 0.83]) {
        const u = lo + (hi - lo) * t;
        tiles.push(open(Array.from({ length: 25 }, (_, k) => {
          const v = h.y0 + 1.5 + (h.ry1 - h.y0 - 3) * k / 24;
          return P(u, v, zAt(h, u, v, amount) + 0.1);
        })));
      }
      for (let k = 1; k < 8; k++) {
        const v = h.y0 + (h.ry1 - h.y0) * k / 8;
        tiles.push(open(Array.from({ length: 33 }, (_, j) => {
          const u = lo + (hi - lo) * j / 32;
          return P(u, v, zAt(h, u, v, amount) + 0.1);
        })));
      }
      slope.tiles.setAttribute("d", tiles.join(""));
    }
    const capZ = h.height + amount + 18.6;
    put(h.cap, prism(P, front, h.capRing, h.capIn, capZ - 0.4, capZ + 2.2));
    const lines = [];
    for (let k = 1; k < 5; k++) {
      const y = h.y0 + (h.ry1 - h.y0) * k / 5;
      lines.push(seg(P(h.mx - 1.5, y, capZ + 2.3), P(h.mx + 1.5, y, capZ + 2.3)));
    }
    h.joints.setAttribute("d", lines.join(""));
  }
  const highlight = (h, on) => { h.sides.forEach((s) => s.face.classList.toggle("hi", on)); h.cap.sil.classList.toggle("hi", on); };
  highlight(houses[1], true);
  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const h of houses) { draw(h, tval(h.motion, now)); if (!tdone(h.motion, now)) moving = true; }
    return moving;
  });
  bag.add(B.unregister);
  function retarget(next) {
    const from = next < 0 ? Math.max(0, active) : next, now = performance.now();
    active = next;
    for (const h of houses) {
      const distance = Math.abs(h.i - from);
      tset(h.motion, next < 0 ? h.rest : clamp(lift, 10, 34) / (1 + distance * 1.8), now, distance * 40);
      highlight(h, h.i === (next < 0 ? 1 : next));
    }
    read.textContent = next < 0 ? "rest" : "roof " + (next + 1);
    B.wake();
  }
  function move(point) {
    let next = -1;
    for (let i = houses.length - 1; i >= 0; i--) if (houses[i].hit.some((p) => inside(point, p))) { next = i; break; }
    if (next !== active) retarget(next);
  }
  read.textContent = "rest";
  bag.add(pointer(stage, { move, leave: () => retarget(-1) }));
  bag.add(() => svg.replaceChildren());
  return { set: (v) => { lift = v; retarget(active); }, destroy: bag.dispose };
}

hairline({
  name: "rooftops",
  means: "Three timber townhouses have curved tile roofs; the roof under the pointer lifts, followed by its neighbours.",
  rules: [1, 2, 4, 5, 6, 7, 8, 9], range: [10, 22, 34], mount,
});
