const {
  Cam, clamp, disposer, facing, fillet, fit, hull, mk, open, pointer, poly, prism, proj,
  put, register, ringAt, rings, rrect, run, seg, solid, tdone, tset, tval, tween, unproj,
} = HL;

// A hollow bath: the far wall is behind the water; the near wall masks it.
// Four coping stones follow the same rounded perimeter, including its corners.
function mount({ stage, svg, read }, value) {
  const bag = disposer(), C = Cam(45, 0.5, 1.68);
  let spread = value, active = -1;
  fit(C, [[-6, -6, -2], [147, 149, -2], [147, -6, -2], [-6, 149, -2], [68, 52, 62]], 200, 166);
  const P = proj(C), front = facing(C), g = mk("g", {}, svg);
  const outer = rrect(8, 8, 132, 105, 25, 16), inner = rrect(20, 20, 120, 93, 13, 16);
  const water = rrect(21.5, 21.5, 118.5, 91.5, 14, 16);
  const LR = (p) => p[0][0] <= p[p.length - 1][0] ? p : p.slice().reverse();
  const foot = rrect(5, 5, 135, 108, 28, 16), footIn = rrect(6.2, 6.2, 133.8, 106.8, 26.8, 16);
  put(solid(g), prism(P, front, foot, footIn, -2, 1.5));
  mk("path", { d: poly(hull(ringAt(P, outer, 1).concat(ringAt(P, outer, 20)))), class: "sil" }, g);
  mk("path", { d: poly(ringAt(P, inner, 20)), class: "nf" }, g);
  mk("path", { d: open(ringAt(P, run(inner, (q) => !front(q)), 10)), class: "nf lo" }, g);

  const far = mk("g", {}, g);
  mk("path", { d: poly(ringAt(P, water, 11)), class: "lo" }, g);
  // Open elliptical ripples are details on the water plane.
  for (const [r, a, b] of [[20, 0.14, 0.91], [28, 1.12, 1.83], [12, 0.12, 0.82]]) {
    const wave = Array.from({ length: 33 }, (_, k) => {
      const t = (a + (b - a) * k / 32) * Math.PI;
      return P(71 + Math.cos(t) * r, 54 + Math.sin(t) * r * 0.58, 11.1);
    });
    mk("path", { d: open(wave), class: "nf lo" }, g);
  }
  for (const [x, y, h, phase] of [[49, 48, 37, 0.2], [87, 54, 44, 1.1]]) {
    const curl = Array.from({ length: 41 }, (_, k) => {
      const t = k / 40;
      return P(x + Math.sin(t * Math.PI * 2.2 + phase) * 2.7, y + t * 1.4, 12 + t * h);
    });
    mk("path", { d: open(curl), class: "nf lo" }, g);
  }
  const iF = LR(ringAt(P, run(inner, front), 20)), oT = LR(ringAt(P, run(outer, front), 20));
  const oB = LR(ringAt(P, run(outer, front), 1));
  mk("path", { d: poly([...iF, oT[oT.length - 1], ...oB.slice().reverse(), oT[0]]), class: "fo" }, g);
  mk("path", { d: open(iF), class: "nf" }, g);
  mk("path", { d: open([oT[0], ...oB, oT[oT.length - 1]]), class: "nf sil" }, g);
  mk("path", { d: open(ringAt(P, run(outer, front), 6)), class: "nf lo" }, g);
  const near = mk("g", {}, g);

  const rimOut = rrect(6, 6, 134, 107, 27, 16), rimIn = rrect(19, 19, 121, 94, 14, 16);
  const crease = rrect(7.2, 7.2, 132.8, 105.8, 25.8, 16);
  const panels = [[0, -1], [-1, 0], [1, 0], [0, 1]].map(([dx, dy], i) => {
    const keep = (q) => dx * q.nu + dy * q.nv >= Math.SQRT1_2 - 0.001;
    const outline = [...run(rimOut, keep), ...run(rimIn, keep).slice().reverse()];
    const shape = fillet(outline.map((q) => [q.u, q.v]), outline.map(() => 0.45), 3).map(([u, v]) => ({ u, v }));
    const parent = dx + dy < 0 ? far : near, rest = [0, 0.2, 0.1, 0.85][i];
    return {
      i, dx, dy, shape, inset: run(crease, keep), rest, motion: tween(rest), drawn: NaN,
      back: mk("path", { class: "lo" }, parent), face: mk("path", { class: "sil" }, parent),
      edge: mk("path", { class: "nf lo" }, parent),
    };
  });
  panels[3].face.classList.add("hi");
  // Three real stone treads, each with one shallow drainage groove.
  for (let i = 0; i < 3; i++) {
    const x0 = 62 - i * 4, x1 = 101 + i * 4, y0 = 105 + i * 12, y1 = 122 + i * 12, h = 17 - i * 5.5;
    const [r, c] = rings(x0, y0, x1, y1, 3.4, 1.1);
    put(solid(g), prism(P, front, r, c, 0, h));
    mk("path", { d: seg(P(x0 + 4, y1 - 4, h + 0.1), P(x1 - 4, y1 - 4, h + 0.1)), class: "nf lo" }, g);
  }

  function draw(panel, amount) {
    if (amount === panel.drawn) return;
    panel.drawn = amount;
    const dx = panel.dx * amount, dy = panel.dy * amount, z = 24 + amount * 0.25;
    const plane = (ring, height) => ring.map((q) => P(q.u + dx, q.v + dy, height));
    panel.back.setAttribute("d", poly(plane(panel.shape, z - 3.2)));
    panel.face.setAttribute("d", poly(plane(panel.shape, z)));
    panel.edge.setAttribute("d", open(plane(panel.inset, z)));
  }
  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const panel of panels) { draw(panel, tval(panel.motion, now)); if (!tdone(panel.motion, now)) moving = true; }
    return moving;
  });
  bag.add(B.unregister);

  function retarget(next) {
    const origin = panels[next < 0 ? Math.max(0, active) : next], now = performance.now();
    active = next;
    for (const panel of panels) {
      const distance = 1 - panel.dx * origin.dx - panel.dy * origin.dy;
      tset(panel.motion, next < 0 ? panel.rest : clamp(spread, 3, 11) / (1 + distance * 1.6), now, distance * 40);
      panel.face.classList.toggle("hi", panel.i === (next < 0 ? 3 : next));
    }
    read.textContent = next < 0 ? "rest" : "rim " + (next + 1);
    B.wake();
  }
  function move(point) {
    const [x, y] = unproj(C, point[0], point[1], 24);
    let next = -1;
    if (x >= 1 && x <= 139 && y >= 1 && y <= 112) {
      const u = (x - 70) / 62, v = (y - 56.5) / 48.5;
      next = Math.abs(u) > Math.abs(v) ? (u < 0 ? 1 : 2) : (v < 0 ? 0 : 3);
    }
    if (next !== active) retarget(next);
  }
  read.textContent = "rest";
  bag.add(pointer(stage, { move, leave: () => retarget(-1) }));
  bag.add(() => svg.replaceChildren());
  return { set: (v) => { spread = v; retarget(active); }, destroy: bag.dispose };
}

hairline({
  name: "onsen",
  means: "A steaming stone bath has a stepped entrance; its rounded coping opens from the side under the pointer.",
  rules: [1, 2, 4, 5, 6, 7, 8, 9], range: [3, 7, 11], mount,
});
