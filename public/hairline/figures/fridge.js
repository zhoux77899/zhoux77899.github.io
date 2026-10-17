const { Cam, facing, fit, proj, unproj, rrect, circ, prism, solid, put, mk, poly, open, hull, run, seg, clamp, tween, tset, tval, tdone, pointer, register, disposer }=HL;
function mount({stage,svg,read},value) {
  const bag=disposer(),C=Cam(45,.5,1.25),W=76,D=54,H=130,A=165*Math.PI/180,hinge=[W+5,D+6],doorWidth=W+10;
  fit(C,[[-7,-7,0],[84,136,0],[-7,-7,141],[145,105,137],[84,55,141]],200,166);
  const P=proj(C),front=facing(C),g=mk('g',{},svg),rr=(a,b,c,d,r)=>rrect(a,b,c,d,r,12),nodes=[],trays=[];
  const path=(parent,d,cls='nf lo')=>mk('path',{d,class:cls},parent);
  const direction=[Math.sqrt(3/8),Math.sqrt(3/8),.5];
  function node(points,space=null) {
    const local=space?points.map(space):points,group=mk('g',{},g),shape=hull(points.map(q=>P(...q)));
    const lo=[0,1,2].map(k=>Math.min(...local.map(q=>q[k]))),hi=[0,1,2].map(k=>Math.max(...local.map(q=>q[k])));
    const n={id:nodes.length,group,base:shape,shape,lo,hi,space,offset:0,depth:0,last:NaN};nodes.push(n);return n;
  }
  function position(n,offset) {
    if(offset===n.last)return false;n.last=offset;n.offset=offset;
    const a=P(0,offset,0),b=P(0,0,0),dx=a[0]-b[0],dy=a[1]-b[1];
    n.group.setAttribute('transform','translate('+dx+' '+dy+')');n.shape=n.base.map(q=>[q[0]+dx,q[1]+dy]);
    n.bounds=[Math.min(...n.shape.map(q=>q[0])),Math.min(...n.shape.map(q=>q[1])),Math.max(...n.shape.map(q=>q[0])),Math.max(...n.shape.map(q=>q[1]))];
    n.depth=.612372*((n.lo[0]+n.hi[0])/2+(n.lo[1]+n.hi[1])/2+offset)+.5*(n.lo[2]+n.hi[2])/2;return true;
  }
  function block(x0,y0,x1,y1,z0,z1,r=2) {
    const ring=rr(x0,y0,x1,y1,r),inner=rr(x0+.8,y0+.8,x1-.8,y1-.8,Math.max(.3,r-.8));
    const n=node([z0,z1].flatMap(z=>ring.map(q=>[q.u,q.v,z]))),s=solid(n.group);put(s,prism(P,front,ring,inner,z0,z1));n.s=s;return n;
  }
  block(-5,-5,W+5,D+5,0,7,8);
  const back=block(-5,-5,W+5,0,7,H+5,3);
  path(back.group,poly(rr(7,15,W-7,H-8,5).map(q=>P(q.u,.1,q.v))));
  [27,62,98].forEach(z=>path(back.group,seg(P(5,.1,z),P(W-5,.1,z))));
  block(-5,0,0,D+4,7,H+5,2);block(W,0,W+5,D+4,7,H+5,2);
  block(-5,-5,W+5,D+4,H+5,H+11,8);
  // Four front solids let an extracted shelf pass a frame edge without passing every wall.
  block(-5,D+3,2,D+5,7,H+5,1);block(W-2,D+3,W+5,D+5,7,H+5,1);
  block(2,D+3,W-2,D+5,7,12,1);block(2,D+3,W-2,D+5,H+1,H+5,1);
  for(const z of [24,103]) {
    const ring=circ(2.2,48).map(q=>({...q,u:q.u+hinge[0],v:q.v+hinge[1]})),inner=circ(1.5,48).map(q=>({...q,u:q.u+hinge[0],v:q.v+hinge[1]}));
    const n=node([z,z+6].flatMap(h=>ring.map(q=>[q.u,q.v,h])));put(solid(n.group),prism(P,front,ring,inner,z,z+6));
  }
  for(let i=0;i<3;i++) {
    const z=18+i*35,shelf=block(4,5,W-4,D,z,z+3.1,5),foods=[],rest=[7,2,0][i];
    path(shelf.group,poly(rr(17,D-2,59,D,1).map(q=>P(q.u,q.v,z+3.2))));
    const specifications=i===2?[[13,27],[33,27],[53,27]]:i===1?[[14,24],[34,24],[14,41],[34,41]]:[[16,29],[35,38],[54,29]];
    specifications.forEach(([x,y])=>{
      const b=z+3.2,kind=i===2?'bottle':i===1?'egg':'fruit',circle=(r,zz)=>circ(r,80).map(q=>[x+q.u,y+q.v,zz]);
      let cloud;
      if(kind==='bottle')cloud=[...circle(5.9,b),...circle(5.9,b+19),...circle(2.5,b+25),...circle(3.1,b+27)];
      else {
        const r=kind==='egg'?5.5:6.8,h=kind==='egg'?11:10;
        cloud=Array.from({length:25},(_,k)=>{const theta=-Math.PI/2+k*Math.PI/24,s=Math.sin(theta);return circle(Math.max(.001,r*Math.cos(theta)*(kind==='egg'?1-.14*s:1)),b+h*(.5+.5*s));}).flat();
      }
      const f=node(cloud),body=solid(f.group);foods.push(f);
      if(kind==='bottle') {
        put(body,{sil:poly(hull([...circle(5.9,b),...circle(5.9,b+19),...circle(2.5,b+25)].map(q=>P(...q)))),crease:open(run(circ(5.2,80),front).map(q=>P(x+q.u,y+q.v,b+18)))});
        const ring=circ(3.1,64).map(q=>({...q,u:x+q.u,v:y+q.v})),inner=circ(2.4,64).map(q=>({...q,u:x+q.u,v:y+q.v}));put(solid(f.group),prism(P,front,ring,inner,b+24,b+27));
        path(f.group,seg(P(x-4,y+5.2,b+8),P(x+4,y+5.2,b+8)));
      } else {
        const r=kind==='egg'?5.5:6.8,h=kind==='egg'?11:10;
        put(body,{sil:poly(hull(cloud.map(q=>P(...q)))),crease:open(circ(r*.72,80).slice(48,70).map(q=>P(x+q.u,y+q.v,b+h*.85)))});
        if(kind==='fruit')path(f.group,seg(P(x,y,b+h),P(x+.5,y,b+h+2)));
      }
    });
    trays.push({i,shelf,foods,rest,tw:tween(rest)});
  }
  // One fixed right-front hinge keeps the closed outline and the open slab aligned.
  const doorPoint=(u,d,z,angle=A)=>[hinge[0]-u*Math.cos(angle)+d*Math.sin(angle),hinge[1]+u*Math.sin(angle)+d*Math.cos(angle),z];
  const doorSpace=([x,y,z])=>{const dx=x-hinge[0],dy=y-hinge[1];return [-dx*Math.cos(A)+dy*Math.sin(A),dx*Math.sin(A)+dy*Math.cos(A),z];};
  const doorRing=rr(0,7,doorWidth,H+5,6),door=node([-2,2].flatMap(d=>doorRing.map(q=>doorPoint(q.u,d,q.v))),doorSpace);
  const doorP=(u,z,d)=>P(...doorPoint(u,-d,z)),doorFront=q=>q.nu*(-direction[0]*Math.cos(A)+direction[1]*Math.sin(A))+q.nv*direction[2]>0;
  const at=(ring,d)=>ring.map(q=>P(...doorPoint(q.u,d,q.v)));
  put(solid(door.group),prism(doorP,doorFront,doorRing,rr(.9,7.9,doorWidth-.9,H+4.1,5.1),-2,2));
  path(door.group,poly(at(rr(4,12,doorWidth-4,H,4),-2.1)),'nf lo');
  path(door.group,poly(at(rr(8,18,doorWidth-8,39,3),-2.2)),'nf lo');
  // The outside pull belongs to the free edge; its own solid sorts behind the open door.
  const handleRing=rr(doorWidth-10,72,doorWidth-5,108,2.5),handle=node([2,7].flatMap(d=>handleRing.map(q=>doorPoint(q.u,d,q.v))),doorSpace);
  for(const z of [72,103])put(solid(handle.group),prism(doorP,doorFront,rr(doorWidth-9.2,z,doorWidth-5.8,z+5,1.5),rr(doorWidth-8.8,z+.4,doorWidth-6.2,z+4.6,1.1),-5,-2));
  put(solid(handle.group),prism(doorP,doorFront,handleRing,rr(doorWidth-9.2,72.8,doorWidth-5.8,107.2,1.7),-7,-4));
  // Compare opaque silhouettes only where they overlap, on a camera ray through that overlap.
  const cross=(a,b,p)=>(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]);
  function overlap(a,b) {
    if(a.bounds[0]>=b.bounds[2]||b.bounds[0]>=a.bounds[2]||a.bounds[1]>=b.bounds[3]||b.bounds[1]>=a.bounds[3])return [];
    let out=a.shape;const ring=b.shape,area=ring.reduce((s,p,i)=>s+p[0]*ring[(i+1)%ring.length][1]-p[1]*ring[(i+1)%ring.length][0],0),sign=area>=0?1:-1;
    for(let i=0;i<ring.length&&out.length;i++) {
      const edge=ring[i],end=ring[(i+1)%ring.length],input=out;out=[];
      for(let j=0;j<input.length;j++) {
        const p=input[j],q=input[(j+1)%input.length],dp=sign*cross(edge,end,p),dq=sign*cross(edge,end,q);
        if(dp>=0)out.push(p);if((dp>=0)!==(dq>=0)){const t=dp/(dp-dq);out.push([p[0]+t*(q[0]-p[0]),p[1]+t*(q[1]-p[1])]);}
      }
    }return out;
  }
  function ray(n,screen) {
    const xy=unproj(C,screen[0],screen[1],0),origin=[xy[0],xy[1]-n.offset,0];let o=origin,d=direction;
    if(n.space){o=n.space(origin);const q=n.space(origin.map((v,k)=>v+direction[k]));d=q.map((v,k)=>v-o[k]);}
    let low=-Infinity,high=Infinity;
    for(let k=0;k<3;k++){const a=(n.lo[k]-o[k])/d[k],b=(n.hi[k]-o[k])/d[k];low=Math.max(low,Math.min(a,b));high=Math.min(high,Math.max(a,b));}return [low,high];
  }
  let orderStamp='';
  function paintOrder() {
    const edges=nodes.map(()=>[]),degree=nodes.map(()=>0);
    for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++) {
      const region=overlap(nodes[i],nodes[j]);if(region.length<3)continue;
      const p=region.reduce((s,q)=>[s[0]+q[0]/region.length,s[1]+q[1]/region.length],[0,0]),a=ray(nodes[i],p),b=ray(nodes[j],p);
      const before=a[1]<b[0]+.01?i:b[1]<a[0]+.01?j:a[1]<b[1]?i:j,after=before===i?j:i;edges[before].push(after);degree[after]++;
    }
    const queue=nodes.filter(n=>degree[n.id]===0),order=[];
    while(queue.length){queue.sort((a,b)=>a.depth-b.depth);const n=queue.shift();order.push(n);edges[n.id].forEach(id=>{if(--degree[id]===0)queue.push(nodes[id]);});}
    if(order.length<nodes.length)nodes.filter(n=>!order.includes(n)).sort((a,b)=>a.depth-b.depth).forEach(n=>order.push(n));
    const stamp=order.map(n=>n.id).join();if(stamp===orderStamp)return;orderStamp=stamp;order.forEach(n=>g.append(n.group));
  }
  nodes.forEach(n=>position(n,0));let active=-1;
  function draw(now) {
    let moving=false,changed=false;
    trays.forEach(t=>{const offset=tval(t.tw,now);moving=!tdone(t.tw,now)||moving;changed=position(t.shelf,offset)||changed;t.foods.forEach(f=>{changed=position(f,offset)||changed;});});
    if(changed)paintOrder();return moving;
  }
  draw(0);const B=register(stage,(_dt,now)=>draw(now));bag.add(B.unregister);
  const centers=trays.map(t=>P(W/2,D+t.rest,21.2+t.i*35));
  function choose(next) {
    if(next===active)return;const from=next<0?active:next,now=performance.now();active=next;
    trays.forEach(t=>{tset(t.tw,next<0?t.rest:t.i===next?value:3,now,Math.abs(t.i-from)*40);t.shelf.s.sil.classList.toggle('hi',t.i===(next<0?0:next));});
    read.textContent=next<0?'rest':'tray '+(next+1);B.wake();
  }
  function hit(p){let best=-1,d=Infinity;centers.forEach((c,i)=>{const q=Math.hypot(p[0]-c[0],p[1]-c[1]);if(q<d&&q<32){d=q;best=i;}});return best;}
  trays[0].shelf.s.sil.classList.add('hi');read.textContent='rest';
  bag.add(pointer(stage,{move:p=>choose(hit(p)),leave:()=>choose(-1)}));bag.add(()=>svg.replaceChildren());
  return {set(v){value=clamp(v,20,42);const previous=active;active=-2;choose(previous);},activate(p){const next=p?hit(p):-1;choose(next===active?-1:next);},destroy:bag.dispose};
}
hairline({name:'fridge',means:'An open refrigerator holds bottles, eggs and fruit on three shelves; the selected shelf slides past the cabinet frame.',rules:[1,2,3,4,5,6,7,8,9],range:[20,33,42],mount});
