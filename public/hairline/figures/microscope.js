const { Cam, facing, fit, proj, rrect, circ, prism, solid, put, mk, poly, open, hull, ringAt, run, seg, fillet, clamp, unproj, spring, stepS, pointer, register, disposer, reflect } = HL;
function mount({stage,svg,read},value) {
  const bag=disposer(),C=Cam(45,.5,1.7);
  fit(C,[[-53,-40,-16],[56,49,-16],[-32,-29,139],[56,49,106]],200,166);
  const P=proj(C),front=facing(C),g=mk('g',{},svg);
  const rr=(a,b,c,d,r)=>rrect(a,b,c,d,r,16);
  const path=(d,cls='nf lo',parent=g)=>mk('path',{d,class:cls},parent);
  const block=(x0,y0,x1,y1,z0,z1,r)=>{
    const s=solid(g),ring=rr(x0,y0,x1,y1,r),inner=rr(x0+.8,y0+.8,x1-.8,y1-.8,Math.max(.4,r-.8));
    put(s,prism(P,front,ring,inner,z0,z1));return s;
  };
  const cylinder=(x,y,r,z0,z1)=>{
    const at=n=>circ(n,96).map(q=>({...q,u:x+q.u,v:y+q.v})),s=solid(g);
    put(s,prism(P,front,at(r),at(r-.7),z0,z1));return s;
  };
  const base=rr(-49,-32,49,44,15),baseTop=rr(-45,-28,45,40,12),baseInset=rr(-43.6,-26.6,43.6,38.6,11);
  reflect(svg,g,P,front,base,0,12);
  put(solid(g),{sil:poly(hull(ringAt(P,base,0).concat(ringAt(P,baseTop,8)))),crease:open(ringAt(P,run(baseInset,front),8))});
  path(poly(rr(-19,24,18,34,4).map(q=>P(q.u,q.v,8))),'nf');
  path(seg(P(-14,29,8),P(13,29,8)));
  // A continuous C-arm with rounded inside and outside bends, not stacked boxes.
  const profile=fillet([[14,9],[4,47],[-30,99],[-8,117],[18,112],[17,99],[-3,102],[-15,89],[17,46],[27,15]],[6,10,8,9,5,5,5,8,8,5],8);
  const side=x=>profile.map(([y,z])=>P(x,y,z));
  path(poly(side(-49)),'lo');path(poly(side(-39)),'sil');
  path(open([P(-39,18,23),P(-39,10,45),P(-39,-25,91)]));
  const atDial=(r,x)=>circ(r,96).map(q=>P(x,q.u,63+q.v));
  put(solid(g),{sil:poly(hull(atDial(3,-39).concat(atDial(3,-29)))),crease:open(atDial(2.5,-29).slice(0,40))});
  put(solid(g),{sil:poly(hull(atDial(10,-32).concat(atDial(10,-26)))),crease:poly(atDial(8.4,-26))});
  path(poly(atDial(5.2,-25.9)),'nf');
  for(let i=0;i<7;i++){const a=(-.6+i*.32);path(seg(P(-25.8,8.2*Math.cos(a),63+8.2*Math.sin(a)),P(-25.8,9.2*Math.cos(a),63+9.2*Math.sin(a))));}
  block(-40,2,-9,19,102,111,4);
  block(-12,2,13,21,101,115,5);
  cylinder(0,10,8,114,130);cylinder(0,10,10,128,133);
  path(poly(circ(7.6,96).map(q=>P(q.u,10+q.v,133))),'nf');
  path(open(circ(5.3,96).slice(54,75).map(q=>P(q.u,10+q.v,133))));
  cylinder(8,16,14,93,101);
  cylinder(8,16,10.6,88,94);
  cylinder(15,24,6.9,67,91);cylinder(15,24,5.1,61,69);
  cylinder(-2,22,5.5,74,92);cylinder(-2,22,4,69,76);
  block(-48,1,-29,19,43,47,4);
  block(-34,-2,39,38,46,50.5,6);
  path(poly(circ(10,96).map(q=>P(8+q.u,18+q.v,50.5))),'nf');
  cylinder(8,18,14,8,15);cylinder(8,18,13,15,22);cylinder(8,18,10,22,26);
  path(poly(circ(7,96).map(q=>P(8+q.u,18+q.v,26))),'nf');
  const clips=[-20,25].map(x=>{const ring=rr(x,8,x+3,27,1.5);return path(poly(ring.map(q=>P(q.u,q.v,53))),'sil');});
  const slides=Array.from({length:3},()=>({s:solid(g),edge:path(''),sp:spring(0),last:NaN}));
  const rest=[-4,0,5];slides.forEach((s,i)=>{s.sp.x=s.sp.t=rest[i];});
  function draw() {
    slides.forEach((s,i)=>{
      if(s.sp.x===s.last)return;s.last=s.sp.x;
      const x=s.sp.x,z=51.6+i*1.5+Math.abs(x-rest[i])*.12,ring=rr(-14+x,7,27+x,29,2.3),inner=rr(-13.3+x,7.7,26.3+x,28.3,1.6);
      put(s.s,prism(P,front,ring,inner,z,z+1.1));
      s.edge.setAttribute('d',seg(P(-8+x,11,z+1.1),P(-8+x,25,z+1.1)));
      s.s.sil.classList.toggle('hi',i===1);
    });
  }
  const B=register(stage,dt=>{let moving=false;slides.forEach(s=>{moving=stepS(s.sp,dt)||moving;});draw();return moving;});
  bag.add(B.unregister);draw();read.textContent='rest';
  let point=null;
  function answer(p) {
    point=p;const [x,y]=unproj(C,p[0],p[1],54);
    const over=x>=-29&&x<=41&&y>=1&&y<=36;
    const spread=over?clamp(8+(x+29)/70*value,8,25):0;
    slides.forEach((s,i)=>s.sp.t=rest[i]+(i-1)*spread);
    clips.forEach(c=>c.classList.remove('hi'));read.textContent=over?'slides':'rest';B.wake();
  }
  bag.add(pointer(stage,{move:answer,leave:()=>{point=null;slides.forEach((s,i)=>s.sp.t=rest[i]);read.textContent='rest';B.wake();}}));
  bag.add(()=>svg.replaceChildren());
  return {set(v){value=v;if(point)answer(point);},destroy:bag.dispose};
}
hairline({name:'microscope',means:'A compound microscope with a curved arm, focus wheel and optical barrels opens three specimen slides.',rules:[1,3,4,5,6,7,8,9],range:[8,15,22],mount});
