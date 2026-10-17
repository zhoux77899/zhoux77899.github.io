const { Cam, clamp, facing, fit, proj, rrect, circ, prism, solid, put, mk, poly, open, hull, ringAt, run, seg, tween, tset, tval, tdone, pointer, register, disposer } = HL;
function mount({ stage, svg, read }, value) {
  const bag = disposer(), C = Cam(45, .5, 1.36);
  fit(C, [[-72,-34,0],[112,65,0],[-72,-34,91],[112,65,77]], 200, 166);
  const P = proj(C), front = facing(C), g = mk('g', {}, svg);
  const rr = (x,y,w,d,r) => rrect(x,y,x+w,y+d,r,12);
  const path = (parent,d,cls='nf lo') => mk('path', { d, class: cls }, parent);
  const block = (parent,x,y,w,d,z,h,r=2) => {
    const ring=rr(x,y,w,d,r), inner=rr(x+.8,y+.8,w-1.6,d-1.6,Math.max(.4,r-.8)), s=solid(parent);
    put(s,prism(P,front,ring,inner,z,z+h)); return s;
  };
  // A reconstruction instrument: a rail, paired image holders and seven removable neural cassettes.
  block(g,-68,-29,174,89,0,5,8);
  path(g,poly(ringAt(P,rr(-64,-25,166,81,5),5.1)));
  for (const y of [-22,23]) block(g,-60,y,152,3,5,3,1);
  for (const x of [-62,94]) for (const y of [-23,54]) {
    path(g,poly(circ(1.2,32).map(q=>P(x+q.u,y+q.v,5.2))),'nf');
  }
  const layers=[], sizes=[48,38,28,21,28,38,48], rests=[0,1,2,3,2,1,0];
  const rack=mk('g',{},g);
  for (let i=0;i<sizes.length;i++) {
    const x=-48+i*22, size=sizes[i], group=mk('g',{},rack), parts=[];
    block(group,x-6,-size/2-3,12,size+6,7,4,2);
    for (let j=0;j<3;j++) {
      const s=solid(group), xx=x+(j-1)*2.1, ring=rr(-size/2,0,size,size,3), inner=rr(-size/2+1.1,1.1,size-2.2,size-2.2,2);
      const face=(r,depth)=>r.map(q=>P(depth,q.u,12+q.v));
      put(s,{sil:poly(hull(face(ring,xx).concat(face(ring,xx+1.3)))),crease:open(face(run(inner,q=>q.nu>0),xx+1.3))});
      if (j===2) {
        for (const z of [size*.3,size*.56,size*.8]) {
          path(group,seg(P(xx+1.31,-size/2+5,12+z),P(xx+1.31,size/2-5,12+z)));
        }
        for (const y of [-size*.25,0,size*.25]) {
          path(group,poly(circ(1.35,32).map(q=>P(xx+1.32,y+q.u,16+q.v))),'nf');
        }
      }
      parts.push(s);
    }
    layers.push({ i,x,size,group,parts,tw:tween(rests[i]),last:NaN,hit:P(x,0,12+size*.6) });
  }
  // Input and output image carriers share the same physical holder, with noisy and reconstructed specimens.
  for (const [x,clean] of [[-62,false],[84,true]]) {
    const holder=mk('g',{},g); block(holder,x,39,20,16,5,6,3);
    const at=(ring,depth)=>ring.map(q=>P(x+q.u,depth,14+q.v));
    const ring=rr(0,0,20,35,3), inset=rr(2,3,16,29,1.5), screen=solid(holder);
    put(screen,{sil:poly(hull(at(ring,45).concat(at(ring,47)))),crease:poly(at(inset,47.1))});
    for (let r=0;r<5;r++) for (let c=0;c<3;c++) {
      const selected=clean ? Math.hypot(c-1,(r-2)*.6)<1.05 : (r*7+c*3)%5!==0;
      if (selected) path(holder,poly(circ(clean?1.8:.8+(r+c)%3*.3,32).map(q=>P(x+5+c*5+q.u,47.2,21+r*4.4+q.v))),'nf');
    }
    path(holder,seg(P(x+5,47.2,18),P(x+15,47.2,18)));
  }
  // A small verification platen accepts the reconstructed image, rather than turning the instrument into a chart.
  block(g,91,-19,12,31,5,8,3);
  block(g,93,-15,8,23,13,2,2);
  path(g,poly(circ(2.1,48).map(q=>P(97+q.u,-4+q.v,15.1))),'nf');
  let active=-1, lastOrder='';
  function draw(now) {
    let moving=false;
    layers.forEach(layer=>{
      const lift=tval(layer.tw,now); moving=!tdone(layer.tw,now)||moving;
      if (lift===layer.last) return; layer.last=lift;
      const a=P(lift*.18,0,lift), b=P(0,0,0);
      layer.group.setAttribute('transform','translate('+(a[0]-b[0])+' '+(a[1]-b[1])+')');
    });
    const order=layers.slice().sort((a,b)=>(.612*a.x+.61*a.last)-(.612*b.x+.61*b.last)), stamp=order.map(l=>l.i).join();
    if(stamp!==lastOrder){lastOrder=stamp;order.forEach(l=>rack.append(l.group));}
    return moving;
  }
  function highlight() { layers.forEach(l=>l.parts[2].sil.classList.toggle('hi',l.i===(active<0?3:active))); }
  draw(0);highlight();
  const B=register(stage,(_dt,now)=>draw(now));bag.add(B.unregister);
  function choose(next) {
    if(next===active)return;const from=next<0?active:next,now=performance.now();active=next;
    layers.forEach(l=>tset(l.tw,rests[l.i]+(next<0?0:clamp(value,8,20)/(1+Math.abs(l.i-next)*1.9)),now,Math.abs(l.i-from)*35));
    highlight();read.textContent=next<0?'rest':'layer '+String(next+1).padStart(2,'0');B.wake();
  }
  function hit(point) {
    let best=-1,distance=Infinity;
    layers.forEach(l=>{const d=Math.hypot(point[0]-l.hit[0],point[1]-l.hit[1]);if(d<distance&&d<25){best=l.i;distance=d;}});
    return best;
  }
  bag.add(pointer(stage,{move:p=>choose(hit(p)),leave:()=>choose(-1)}));
  bag.add(()=>svg.replaceChildren());read.textContent='rest';
  return { set(v){value=clamp(v,8,20);const old=active;active=-2;choose(old);}, activate(p){const next=p?hit(p):-1;choose(next===active?-1:next);}, destroy:bag.dispose };
}
hairline({name:'cfgan',means:'An image reconstruction workbench holds seven shrinking and expanding neural cassettes between specimen carriers.',rules:[1,2,3,4,5,6,7,8,9,10],range:[8,14,20],mount});
