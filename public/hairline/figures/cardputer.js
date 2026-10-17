// Keycap geometry adapted from @lucasmarkes/hairline Keyboard, Lucas Marques (MIT).
const { Cam, clamp, facing, fit, hull, open, poly, prism, proj, ringAt, rings, rrect, run, seg, circ, unproj, spring, stepS, disposer, mk, pointer, put, register, solid } = HL;
function mount({ stage, svg, read }, value) {
  const bag = disposer(), U = 10, W = 15, Y = 53, H = [6.9, 6.1, 5.6, 6.2, 7], Z = 10;
  const rows = [
    [...Array(13).fill(1), 2],
    [1.5, ...Array(11).fill(1), 2.5],
    [1.75, ...Array(10).fill(1), 3.25],
    [2.25, ...Array(9).fill(1), 3.75],
    [1.5, 1.5, 7.5, 1.5, 1.5, 1.5],
  ];
  const C = Cam(45, 0.5, 1.8);
  fit(C, [[-8, -8, 0], [158, 113, 0], [-8, 113, 0], [158, -8, 0], [150, 100, 33]], 200, 166);
  const P = proj(C), front = facing(C), g = mk("g", {}, svg);
  const foot = rrect(-6, -6, 156, 110, 8, 12), top = rrect(-4, -4, 154, 108, 6, 12);
  const inset = rrect(-2.5, -2.5, 152.5, 106.5, 4.5, 12);
  put(solid(g), { sil: poly(hull(ringAt(P, foot, 0).concat(ringAt(P, top, 8)))), crease: open(ringAt(P, run(inset, front), 8)) });
  const [bezel, crease] = rings(4, 2, 146, 45, 5, 1.3);
  put(solid(g), prism(P, front, bezel, crease, 8, 10));
  mk("path", { d: poly(ringAt(P, rrect(9, 6, 141, 41, 3, 10), 10.2)), class: "nf" }, g);
  mk("path", { d: open(ringAt(P, run(rrect(10.2, 7.2, 139.8, 39.8, 2, 10), front), 10.2)), class: "nf lo" }, g);
  const [tray, trayCrease] = rings(0, Y - 2, 150, Y + 52, 3.2, 0.8);
  put(solid(g), prism(P, front, tray, trayCrease, 8, 9.2));
  const side = (ring, x) => poly(ring.map((q) => P(x, q.u, q.v)));
  for (const [y, width, z] of [[13, 14, 4], [37, 6, 4]]) {
    mk("path", { d: side(rrect(y, z - 1.2, y + width, z + 1.2, 1.1, 8), 155.2), class: "nf" }, g);
    mk("path", { d: side(rrect(y + 1, z - 0.45, y + width - 1, z + 0.45, 0.4, 6), 155.3), class: "nf lo" }, g);
  }
  mk("path", { d: poly(rrect(22, 2.5, 46, 5, 1.2, 8).map((q) => P(q.u, 109.7, q.v))), class: "nf lo" }, g);
  for (const x of [3, 147]) for (const y of [49, 104]) {
    mk("path", { d: poly(circ(1.2, 24).map((q) => P(x + q.u, y + q.v, 9.5))), class: "nf lo" }, g);
  }
  const keyLayer = mk("g", {}, g), keys = [];
  rows.forEach((row, r) => {
    let x = 0;
    row.forEach((width, col) => {
      const x0 = x * U, x1 = (x + width) * U, y0 = Y + r * U, y1 = y0 + U;
      const pad = 0.6, taper = 1.1, inner = pad + taper + 0.65, el = solid(keyLayer);
      keys.push({ id: keys.length, r, col, x0, x1, y0, y1, h: Z + H[r], el,
        foot: rrect(x0 + pad, y0 + pad, x1 - pad, y1 - pad, 1.7, 6),
        top: rrect(x0 + pad + taper, y0 + pad + taper, x1 - pad - taper, y1 - pad - taper, 1.3, 6),
        inner: rrect(x0 + inner, y0 + inner, x1 - inner, y1 - inner, 0.7, 6),
        sp: spring(Z + H[r], { eps: 0.012 }), drawn: NaN,
        bump: r === 2 && [4, 7].includes(col) ? mk("path", { class: "nf lo" }, el.g) : null,
      });
      x += width;
    });
  });
  const enter = keys.find((key) => key.r === 2 && key.col === rows[2].length - 1);
  const restPoint = [(enter.x0 + enter.x1) / 2, (enter.y0 + enter.y1) / 2];
  let radius = value, over = null, lit = null;
  function aim(at, selected, reach, lift) {
    keys.forEach((key) => {
      const dx = Math.max(key.x0 - at[0], 0, at[0] - key.x1), dy = Math.max(key.y0 - at[1], 0, at[1] - key.y1);
      const share = key === selected ? 1 : clamp(1 - Math.hypot(dx, dy) / (reach * U), 0, 1);
      key.sp.t = key.h + share * lift;
    });
  }
  function highlight(key) {
    if (key === lit) return;
    lit?.el.sil.classList.remove("hi"); lit = key; key.el.sil.classList.add("hi");
  }
  function draw(key) {
    const z = key.sp.x;
    if (z === key.drawn) return;
    key.drawn = z;
    put(key.el, { sil: poly(hull(ringAt(P, key.foot, Z).concat(ringAt(P, key.top, z)))), crease: open(ringAt(P, run(key.inner, front), z)) });
    if (key.bump) {
      const x = (key.x0 + key.x1) / 2, y = key.y1 - 3;
      key.bump.setAttribute("d", seg(P(x - 1.6, y, z), P(x + 1.6, y, z)));
    }
  }
  let lastOrder = "";
  function paintOrder() {
    const depth = (key) => .612372 * (key.x0 + key.x1 + key.y0 + key.y1) / 2 + .5 * (Z + key.sp.x) / 2;
    const order = keys.slice().sort((a, b) => depth(a) - depth(b)), stamp = order.map((key) => key.id).join();
    if (stamp === lastOrder) return;
    lastOrder = stamp; order.forEach((key) => keyLayer.append(key.el.g));
  }
  aim(restPoint, enter, 1.4, 2.2);
  keys.forEach((key) => { key.sp.x = key.sp.t; draw(key); }); paintOrder(); highlight(enter);
  const loop = register(stage, (dt) => {
    let moving = false;
    keys.forEach((key) => { if (stepS(key.sp, dt)) moving = true; draw(key); }); paintOrder(); return moving;
  }); bag.add(loop.unregister);
  function hit(point) {
    for (let r = rows.length - 1; r >= 0; r--) {
      const at = unproj(C, point[0], point[1], Z + H[r]);
      if (at[1] < Y + r * U || at[1] >= Y + (r + 1) * U || at[0] < 0 || at[0] >= W * U) continue;
      return { at, key: keys.find((key) => key.r === r && at[0] >= key.x0 && at[0] < key.x1) };
    }
    const at = unproj(C, point[0], point[1], Z + H[2]);
    if (at[0] < -2 || at[0] > 152 || at[1] < Y - 2 || at[1] > Y + 52) return null;
    at[0] = clamp(at[0], 0, 149.99); at[1] = clamp(at[1], Y, Y + 49.99);
    return { at, key: keys.find((key) => key.r === Math.floor((at[1] - Y) / U) && at[0] >= key.x0 && at[0] < key.x1) };
  }
  function retarget() {
    if (over) { aim(over.at, over.key, radius, 14); highlight(over.key); read.textContent = "key " + (keys.indexOf(over.key) + 1); }
    else { aim(restPoint, enter, 1.4, 2.2); highlight(enter); read.textContent = "rest"; }
    loop.wake();
  }
  bag.add(pointer(stage, { move: (point) => { over = hit(point); retarget(); }, leave: () => { over = null; retarget(); } }));
  bag.add(() => svg.replaceChildren()); read.textContent = "rest";
  return {
    set: (next) => { radius = clamp(next, 1.2, 4.3); if (over) retarget(); },
    activate: (point) => { const next = point ? hit(point) : null; over = next && next.key !== over?.key ? next : null; retarget(); },
    destroy: bag.dispose,
  };
}
hairline({ name: "cardputer", means: "A pocket computer has a recessed screen and fifty-six sculpted keycaps; the keys rise around the pointer.", rules: [1, 3, 4, 5, 6, 7, 8, 9], range: [1.2, 3.2, 4.3], mount });
