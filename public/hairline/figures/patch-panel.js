// Geometry adapted from @lucasmarkes/hairline by Lucas Marques (MIT).
const { Cam, clamp, facing, fillet, fit, hull, open, poly, prism, proj, rings, rrect, run, seg, spring, stepS, disposer, mk, pointer, put, register, solid } = HL;
const NC = 12, PITCH = 15, GAP = 8, EAR = 15, MAR = 5, H = 44, T = 2.6, DEEP = 18;
const X0 = EAR + MAR, W = 2 * X0 + NC * PITCH + GAP, ZT = 30, ZB = 12.5;
const JW = 5, JH = 4.2, NW = 1.9, NH = 1.7, JD = 2.4;
const PW = 4.3, PH = 3.5, PL = 4, BL = 5, CR = 1.8, OUT = 8, LEAN = 11, LZ = 7, LIFT = 12;
const EMPTY = [2, 10, 18], REST = 7, HIT_Y = 2.5;
const JIT = (p) => [((p * 7) % 5) - 2, ((p * 11) % 7) - 3];
const falloff = (d, R) => (d === 0 ? 0 : clamp(1 - (d - 1) / R, 0, 1));
function tube(q, w) {
    const n = q.length, L = [], Rt = [], nrm = [];
    for (let i = 0; i < n; i++) {
        const a = q[Math.max(0, i - 1)], b = q[Math.min(n - 1, i + 1)], l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
        const t = [(b[0] - a[0]) / l, (b[1] - a[1]) / l];
        nrm.push(t);
        L.push([q[i][0] - t[1] * w, q[i][1] + t[0] * w]);
        Rt.push([q[i][0] + t[1] * w, q[i][1] - t[0] * w]); }
    const cap = (c, t, s) => {
        const out = [];
        for (let k = 1; k < 6; k++) {
            const th = (k / 6) * Math.PI, cs = Math.cos(th), sn = Math.sin(th);
            out.push([c[0] + s * w * (-t[1] * cs + t[0] * sn), c[1] + s * w * (t[0] * cs + t[1] * sn)]); }
        return out; };
    return poly([...L, ...cap(q[n - 1], nrm[n - 1], 1), ...Rt.reverse(), ...cap(q[0], nrm[0], -1)]); }
const mount = ({ stage, svg, read }, value) => {
    const bag = disposer();
    const S = 1.5, C = Cam(45, 0.5, S);
    const tipZ = ZT + 27 + LIFT + LZ, lowZ = ZB - 26 - LZ;
    fit(C, [[0, -DEEP, H], [W, -DEEP, H], [0, 0, 0], [W, 0, 0], [X0, 34, tipZ], [W - X0, 34, lowZ], [X0, 34, lowZ]], 200, 166);
    const P = proj(C), front = facing(C);
    let R = value, over = -1, lit = null;
    const at = (ring, cx, y, cz) => ring.map((q) => P(cx + q.u, y, cz + q.v));
    const seen = (q) => 0.612 * q.nu + 0.5 * q.nv > 0;
    const slab = (ring, inner, cx, cz, y0, y1) => ({
        sil: poly(hull(at(ring, cx, y0, cz).concat(at(ring, cx, y1, cz)))),
        crease: open(at(run(inner, seen), cx, y1, cz)), });
    const g = mk("g", {}, svg);
    const [br, bi] = rings(EAR + 2, -DEEP, W - EAR - 2, -T, 3, 1.6);
    put(solid(g), prism(P, front, br, bi, 3, H - 3));
    put(solid(g), slab(rrect(0, 0, W, H, 3, 4), rrect(0.7, 0.7, W - 0.7, H - 0.7, 2.3, 4), 0, 0, -T, 0));
    const flat = (ring) => ring.map((q) => [q.u, q.v]);
    const face = (pts, cls) => mk("path", { d: poly(pts.map(([x, z]) => P(x, 0, z))), class: cls }, g);
    for (const ex of [EAR / 2 + 1, W - EAR / 2 - 1])
        for (const ez of [8, H - 8]) {
            face(flat(rrect(ex - 3.4, ez - 1.5, ex + 3.4, ez + 1.5, 1.5, 3)), "nf"); }
    const ports = [];
    for (let p = 0; p < 2 * NC; p++) {
        const r = p < NC ? 0 : 1, c = p % NC;
        ports.push({ p, r, c, cx: X0 + (c + 0.5) * PITCH + (c >= 6 ? GAP : 0), cz: r ? ZB : ZT, full: !EMPTY.includes(p) }); }
    for (const m of [0, 6]) {
        const a = ports[m].cx - PITCH / 2 + 1, b = ports[m + 5].cx + PITCH / 2 - 1;
        face(flat(rrect(a, ZB - JH - 3, b, ZT + JH + NH + 2.6, 2.4, 4)), "lo nf"); }
    const jack = fillet([[-JW, -JH], [JW, -JH], [JW, JH], [NW, JH], [NW, JH + NH], [-NW, JH + NH], [-NW, JH], [-JW, JH]], [1, 1, 1, 0.4, 0.5, 0.5, 0.4, 1]);
    for (const pt of ports) {
        const { cx, cz } = pt, d = JD;
        pt.jack = face(jack.map(([u, v]) => [cx + u, cz + v]), "nf");
        mk("path", { d: open([[-JW + d, JH], [-JW + d, -JH + 0.816 * d], [JW, -JH + 0.816 * d]].map(([u, v]) => P(cx + u, 0, cz + v))), class: "lo nf" }, g); }
    const plugG = mk("g", {}, g), cabG = mk("g", {}, g);
    const plug = rrect(-PW, -PH, PW, PH, 1.2, 3), plugIn = rrect(-PW + 0.7, -PH + 0.7, PW - 0.7, PH - 0.7, 0.6, 3);
    const bootA = rrect(-3.7, -3, 3.7, 3, 1.6, 3), bootB = rrect(-2.4, -2.4, 2.4, 2.4, 2.3, 3);
    const order = ports.slice().sort((a, b) => a.c - b.c || a.r - b.r);
    for (const pt of order) {
        pt.pull = spring(0, { eps: 0.002 });
        pt.lx = spring(0, { eps: 0.01 });
        pt.lz = spring(0, { eps: 0.01 });
        if (!pt.full)
            continue;
        pt.plug = solid(plugG);
        pt.latch = mk("path", { class: "lo nf" }, pt.plug.g);
        pt.boot = solid(plugG);
        pt.cable = mk("path", { class: "sil" }, cabG);
        pt.drawn = ""; }
    function drawPort(pt) {
        const k = pt.pull.x, lx = pt.lx.x, lz = pt.lz.x, key = [k, lx, lz].join();
        if (key === pt.drawn)
            return;
        pt.drawn = key;
        const { cx, cz, r, p } = pt, y1 = PL + OUT * k, y2 = y1 + BL, up = r ? -1 : 1, [jx, jz] = JIT(p);
        put(pt.plug, slab(plug, plugIn, cx, cz, 0, y1));
        pt.latch.setAttribute("d", seg(P(cx, 0.6, cz + PH), P(cx, y1 - 0.8, cz + PH)));
        put(pt.boot, { sil: poly(hull(at(bootA, cx, y1, cz).concat(at(bootB, cx, y2, cz)))), crease: "" });
        const out = r ? 6 : 2, lean = r ? 2 : 3;
        const p0 = [cx, y2 - 1.5, cz], p1 = r ? [cx + 0.5, y2 + out + 4 * k, cz] : [cx, y2 + 1 + 2 * k, cz + 6];
        const p3 = [cx + lean + jx + lx, y2 + out + 1 + LIFT * k, cz + up * (24 + jz) + lz + LIFT * k], p2 = [p3[0] - 0.6, p3[1] - 1, p3[2] - up * 12];
        const q = [];
        for (let i = 0; i <= 16; i++) {
            const s = i / 16, a = (1 - s) ** 3, b = 3 * (1 - s) ** 2 * s, c = 3 * (1 - s) * s * s, d = s ** 3;
            q.push(P(...[0, 1, 2].map((j) => a * p0[j] + b * p1[j] + c * p2[j] + d * p3[j]))); }
        pt.cable.setAttribute("d", tube(q, CR * S)); }
    function aim(a, radius, depth) {
        const A = ports[a];
        for (const pt of ports) {
            const dx = pt.c - A.c, dr = pt.r - A.r, d = Math.hypot(dx, dr), f = falloff(d, radius) * depth;
            pt.pull.t = pt === A ? depth : 0;
            pt.lx.t = d ? clamp((dx / d) * f * LEAN, -LEAN, LEAN) : 0;
            pt.lz.t = d ? clamp((-dr / d) * f * LZ, -LZ, LZ) : 0; } }
    function light(pt) {
        if (pt === lit)
            return;
        const mark = (q, on) => (q.full ? [q.plug.sil, q.boot.sil, q.cable] : [q.jack]).forEach((el) => el.classList.toggle("hi", on));
        if (lit)
            mark(lit, false);
        lit = pt;
        mark(pt, true); }
    aim(REST, 1.6, 0.55);
    for (const pt of ports)
        for (const s of [pt.pull, pt.lx, pt.lz])
            s.x = s.t;
    light(ports[REST]);
    read.textContent = "rest";
    const B = register(stage, (dt) => {
        let m = false;
        for (const pt of ports) {
            for (const s of [pt.pull, pt.lx, pt.lz])
                if (stepS(s, dt))
                    m = true;
            if (pt.full)
                drawPort(pt); }
        return m; });
    bag.add(B.unregister);
    const o = P(0, HIT_Y, 0), ux = P(1, HIT_Y, 0), uz = P(0, HIT_Y, 1);
    const ex = [ux[0] - o[0], ux[1] - o[1]], ez = [uz[0] - o[0], uz[1] - o[1]], det = ex[0] * ez[1] - ex[1] * ez[0];
    function hit([sx, sy]) {
        const qx = sx - o[0], qy = sy - o[1], x = (qx * ez[1] - qy * ez[0]) / det, z = (ex[0] * qy - ex[1] * qx) / det;
        if (x < X0 - 2 || x > W - X0 + 2 || z < ZB - JH - 6 || z > ZT + JH + 8)
            return -1;
        let best = -1, bd = Infinity;
        for (const pt of ports) {
            const dd = Math.abs(pt.cx - x) + (Math.abs(pt.cz - z) > (ZT - ZB) / 2 ? 1e3 : 0);
            if (dd < bd) {
                bd = dd;
                best = pt.p; } }
        return best; }
    function retarget() {
        if (over >= 0) {
            aim(over, R, 1);
            light(ports[over]);
            read.textContent = "port " + String(over + 1).padStart(2, "0"); }
        else {
            aim(REST, 1.6, 0.55);
            light(ports[REST]);
            read.textContent = "rest"; }
        B.wake(); }
    bag.add(pointer(stage, {
        move: (p) => { const h = hit(p); if (h !== over) {
            over = h;
            retarget();
        } },
        leave: () => { over = -1; retarget(); }, }));
    bag.add(() => svg.replaceChildren());
    return {
        set: (v) => { R = clamp(v, 1, 5); if (over >= 0)
            retarget(); },
        activate: (point) => { const next = point ? hit(point) : -1; over = next === over ? -1 : next; retarget(); },
        destroy: bag.dispose, }; };

hairline({ name: "patch-panel", means: "A twenty-four-port rack patch panel lifts the chosen cable and draws its plug halfway out of the jack.", rules: [1, 3, 4, 5, 6, 7, 8, 9], range: [1, 3, 5], mount });
