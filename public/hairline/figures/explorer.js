const { Cam, facing, fit, proj, rrect, circ, prism, solid, put, mk, poly, open, hull, ringAt, run, seg, fillet, clamp, tween, tset, tval, tdone, register, pointer, disposer, reflect } = HL;
function mount({ stage, svg, read }, value) {
  const bag=disposer(), C=Cam(45,.5,1.22), W=174, D=104, H=23;
  value=clamp(value,6,18);
  fit(C,[[-10,-32,0],[184,110,0],[-10,-32,111],[184,110,95]],200,166);
  const P=proj(C), front=facing(C), g=mk('g',{},svg);
  const rr=(x,y,w,d,r)=>rrect(x,y,x+w,y+d,r,14);
  const block=(parent,x,y,w,d,z,h,r=2,b=.8)=>{
    const ring=rr(x,y,w,d,r), inner=rr(x+b,y+b,w-2*b,d-2*b,Math.max(.4,r-b)), part=solid(parent);
    put(part,prism(P,front,ring,inner,z,z+h));return part;
  };
  const path=(parent,d,cls='nf lo')=>mk('path',{d,class:cls},parent);
  const outer=rr(-4,-4,W+8,D+8,13), inner=rr(0,0,W,D,9);
  reflect(svg,g,P,front,outer,0,12);
  path(g,poly(hull(ringAt(P,outer,0).concat(ringAt(P,outer,H)))),'sil');
  path(g,poly(ringAt(P,inner,H)),'nf');
  path(g,open(ringAt(P,run(inner,q=>!front(q)),7)));
  // The floating lid is behind the modules, not an opaque sheet painted over them.
  const lid=mk('g',{},g);block(lid,-8,-31,W+8,D+8,102,3.5,13,1.4);
  for(const x of [58,114]) block(g,x,3,1.4,D-6,7,14,.5,.3);
  const modules=[], rest=[1.5,3,0,1,0,2], top=[66,69,61,35,38,51];
  for(let i=0;i<6;i++) {
    const col=i%3, row=Math.floor(i/3), x=6+col*56, y=7+row*47;
    const group=mk('g',{},g), marks=[];let focal=null;
    const add=(a,b,w,d,z,h,r=2)=>{const part=block(group,a,b,w,d,z,h,r);marks.push(part.sil);return part;};
    add(x,y,49,41,11,4,4);
    if(i===0) {
      // Upright model plates: thin shells, recessed faces, and aligned contact feet.
      for(let j=0;j<4;j++) {
        const yp=y+8+j*6, face=rr(0,0,39,38,3);
        add(x+5,yp-.3,39,1.9,15,9,.7);
        const at=(ring,depth)=>ring.map(q=>P(x+5+q.u,depth,24+q.v));
        const back=at(face,yp), near=at(face,yp+1.3);
        const p=path(group,poly(hull(back.concat(near))),'sil');marks.push(p);if(j===3)focal=p;
        path(group,poly(at(rr(3,3,33,31,2),yp+1.32)));
        [6,12,18,24,30].forEach(u=>path(group,seg(P(x+5+u,yp+1.34,24),P(x+5+u,yp+1.34,27))));
      }
    } else if(i===1) {
      // A real horizontal optical barrel, its mouth and nested lens retain their depth.
      const cx=x+24, cz=48, at=(r,yp)=>circ(r,96).map(q=>P(cx+q.u,yp,cz+q.v));
      const barrel=solid(group);
      put(barrel,{sil:poly(hull(at(14,y+9).concat(at(14,y+31)))),crease:poly(at(12.8,y+31))});marks.push(barrel.sil);focal=barrel.sil;
      path(group,poly(at(10.9,y+31.2)),'nf');
      path(group,poly(at(9.1,y+31.4)));
      path(group,open(circ(7.2,96).slice(55,73).map(q=>P(cx+q.u,y+31.5,cz+q.v))));
      [y+13,y+17].forEach(yp=>path(group,open(at(14,yp).slice(42,90))));
      add(x+8,y+15,32,19,15,20,3);
    } else if(i===2) {
      focal=add(x+7,y+8,35,26,15,40,4).sil;
      const face=(r)=>poly(r.map(q=>P(q.u,y+34.1,q.v)));
      path(group,face(rr(x+11,25,27,22,2)));
      for(let j=0;j<4;j++) path(group,seg(P(x+14+j*5,y+34.2,20),P(x+14+j*5,y+34.2,24)));
      for(let j=0;j<3;j++)path(group,face(rr(x+14+j*7,41,3,2,.8)),'nf');
      add(x+13,y+12,23,18,55,2,2);
    } else if(i===3) {
      add(x+2,y+2,45,37,15,4,4);
      for(let r=0;r<4;r++) for(let c=0;c<6;c++) {
        const a=x+5+c*6.3,b=y+6+r*7,foot=rr(a,b,5,5.4,1.4),cap=rr(a+.55,b+.55,3.9,4.3,1.1);
        const part=solid(group);put(part,{sil:poly(hull(ringAt(P,foot,19).concat(ringAt(P,cap,23+r*.3)))),crease:open(ringAt(P,run(rr(a+1,b+1,3,3.4,.7),front),23+r*.3))});marks.push(part.sil);
      }
    } else if(i===4) {
      add(x+2,y+3,45,35,15,2.4,3);
      for(let j=0;j<4;j++)add(x+4,y+4,41,32,18+j*2,1.2,2);
      const leaf=fillet([[x+4,y+4],[x+44,y+4],[x+44,y+28],[x+38,y+35],[x+4,y+35]],[2,2,2,2,2]);
      focal=path(group,poly(leaf.map(([u,v])=>P(u,v,28))),'sil');
      path(group,seg(P(x+38,y+28,28),P(x+44,y+28,28))+seg(P(x+38,y+28,28),P(x+38,y+35,28)));
      [10,21,32].forEach(v=>path(group,open(circ(2.1,48).map(q=>P(x+7+q.u,y+v,28+q.v))),'nf'));
    } else {
      for(let j=0;j<6;j++) {
        const scale=1-j*.115;
        const contour=Array.from({length:80},(_,k)=>{
          const a=k/80*Math.PI*2,r=1+.12*Math.sin(3*a+.7)+.06*Math.cos(5*a);
          return {u:x+25+19*scale*r*Math.cos(a),v:y+21+16*scale*r*Math.sin(a),nu:Math.cos(a),nv:Math.sin(a)};
        });
        const inset=contour.map(q=>({...q,u:x+25+(q.u-x-25)*.96,v:y+21+(q.v-y-21)*.96}));
        const part=solid(group);put(part,prism(P,front,contour,inset,16+j*4.7,16+(j+1)*4.7));marks.push(part.sil);if(j===5)focal=part.sil;
      }
    }
    const tw=tween(rest[i]);modules.push({group,marks,focal:focal||marks.at(-1),tw,last:NaN,c:P(x+25,y+23,top[i]+rest[i])});
  }
  // The near wall occludes the feet of the inserts, as a real enclosure does.
  const lr=pts=>pts[0][0]<=pts.at(-1)[0]?pts:pts.slice().reverse();
  const it=lr(ringAt(P,run(inner,front),H)), ot=lr(ringAt(P,run(outer,front),H)), ob=lr(ringAt(P,run(outer,front),0));
  path(g,poly([...it,ot.at(-1),...ob.slice().reverse(),ot[0]]),'fo');
  path(g,open(it),'nf');path(g,open(ot),'nf lo');path(g,open([ot[0],...ob,ot.at(-1)]),'nf sil');
  const face=r=>poly(r.map(q=>P(q.u,D+4,q.v)));
  path(g,face(rr(56,6,76,10,4)),'nf');path(g,face(rr(58,8,72,6,2)),'nf lo');
  path(g,poly(circ(5.2,80).map(q=>P(23+q.u,D+4,12+q.v))),'nf sil');
  path(g,poly(circ(3.8,80).map(q=>P(23+q.u,D+4.01,12+q.v))));
  let active=-1;
  const light=()=>modules.forEach((m,i)=>m.focal.classList.toggle('hi',i===(active<0?0:active)));
  light();
  const B=register(stage,(_dt,now)=>{
    let moving=false;modules.forEach(m=>{
      const lift=tval(m.tw,now);if(lift!==m.last){const a=P(0,0,lift),b=P(0,0,0);m.group.setAttribute('transform','translate(0 '+(a[1]-b[1])+')');m.last=lift;}
      moving=!tdone(m.tw,now)||moving;
    });return moving;
  });
  bag.add(B.unregister);
  function choose(next) {
    if(next===active)return;const from=next<0?active:next,now=performance.now();active=next;
    modules.forEach((m,i)=>tset(m.tw,rest[i]+(next<0?0:value/(1+Math.abs(i%3-next%3)*1.8+Math.abs(Math.floor(i/3)-Math.floor(next/3))*2)),now,Math.abs(i-from)*35));
    light();read.textContent=next<0?'rest':'module '+(next+1);B.wake();
  }
  bag.add(pointer(stage,{move:p=>{
    let nearest=-1,dist=Infinity;modules.forEach((m,i)=>{const d=Math.hypot((p[0]-m.c[0]),(p[1]-m.c[1])*.85);if(d<dist&&d<32){nearest=i;dist=d;}});
    choose(nearest);
  },leave:()=>choose(-1)}));
  bag.add(()=>svg.replaceChildren());read.textContent='rest';B.wake();
  return {set(v){value=clamp(v,6,18);const prior=active;active=-2;choose(prior);},destroy:bag.dispose};
}
hairline({name:'explorer',means:'A precision exploration case holds six research and everyday modules; one rises as its neighbours part.',rules:[1,2,3,4,5,6,7,8,9,10],range:[6,12,18],mount});
