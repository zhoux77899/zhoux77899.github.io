const {Cam,facing,fit,proj,rrect,prism,solid,put,mk,open,clamp,unproj,spring,stepS,pointer,register,disposer,reflect}=HL;
function mount({stage,svg,read},value) {
  const bag=disposer(),C=Cam(45,.5,1.65);
  fit(C,[[0,0,-6],[152,112,-6],[0,112,-6],[152,0,82]],200,166);
  const P=proj(C),front=facing(C),g=mk('g',{},svg);
  const base=rrect(0,0,152,112,10,16),inset=rrect(1.4,1.4,150.6,110.6,8.6,16);
  reflect(svg,g,P,front,base,-6,12);
  put(solid(g),prism(P,front,base,inset,-6,0));
  // A continuous coast and meandering channel replace faceted pyramid mountains.
  const channel=(offset)=>Array.from({length:65},(_,i)=>{const y=7+i*1.53;return P(78+9*Math.sin(y*.058)+2*Math.sin(y*.14)+offset,y,.1);});
  mk('path',{d:open(channel(-2))+open(channel(2)),class:'nf lo'},g);
  const regions=[{cx:35,cy:54,rx:29,ry:47,phase:.4},{cx:116,cy:53,rx:26,ry:46,phase:1.7}];
  const slices=[];
  regions.forEach((region,j)=>{
    for(let level=0;level<9;level++) {
      const s=1-level*.087,cx=region.cx+Math.sin(level*.32)*3,cy=region.cy+(j?1:-1)*level*1.05;
      const raw=Array.from({length:96},(_,k)=>{
        const a=k/96*Math.PI*2,r=1+.085*Math.sin(3*a+region.phase)+.055*Math.cos(5*a-.3);
        return {u:cx+region.rx*s*r*Math.cos(a),v:cy+region.ry*s*r*Math.sin(a)};
      });
      const ring=raw.map((q,k)=>{
        const prev=raw[(k+95)%96],next=raw[(k+1)%96],dx=next.u-prev.u,dy=next.v-prev.v,n=Math.hypot(dx,dy);
        return {...q,nu:dy/n,nv:-dx/n};
      });
      const inner=ring.map(q=>({...q,u:cx+(q.u-cx)*.967,v:cy+(q.v-cy)*.967}));
      slices.push({j,level,cx,cy,ring,inner,el:solid(g),sp:spring(3.4+level*4.8),last:'',rest:3.4+level*4.8});
    }
  });
  let position=null,active=-1;
  function draw() {
    slices.forEach(s=>{
      const prev=s.level?slices.find(p=>p.j===s.j&&p.level===s.level-1).sp.x:0;
      const key=s.sp.x+','+prev;if(key===s.last)return;s.last=key;
      put(s.el,prism(P,front,s.ring,s.inner,prev,s.sp.x));
      s.el.sil.classList.toggle('hi',s.level===8&&s.j===(active<0?0:active));
    });
  }
  draw();const B=register(stage,dt=>{let moving=false;slices.forEach(s=>{moving=stepS(s.sp,dt)||moving;});draw();return moving;});bag.add(B.unregister);
  function retarget() {
    slices.forEach(s=>{
      const d=position?Math.hypot(s.cx-position[0],s.cy-position[1]):Infinity;
      s.sp.t=s.rest+(position?value*Math.exp(-d*d/1800)*(s.level+1)/9:0);
    });
    read.textContent=position?'ridge '+(active+1):'rest';B.wake();
  }
  bag.add(pointer(stage,{move:p=>{
    const q=unproj(C,p[0],p[1],28);
    if(q[0]<0||q[0]>152||q[1]<0||q[1]>112){position=null;active=-1;}
    else {position=[clamp(q[0],0,152),clamp(q[1],0,112)];active=Math.abs(q[0]-35)<Math.abs(q[0]-116)?0:1;}
    retarget();
  },leave:()=>{position=null;active=-1;retarget();}}));
  bag.add(()=>svg.replaceChildren());read.textContent='rest';
  return {set(v){value=v;retarget();},destroy:bag.dispose};
}
hairline({name:'fjord',means:'Two smooth contour ridges frame a winding fjord; the terrain rises gently around the pointer.',rules:[1,3,4,5,6,7,8,9],range:[7,14,21],mount});
