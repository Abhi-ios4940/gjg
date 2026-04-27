// Preloader
window.addEventListener('load',()=>{setTimeout(()=>{document.getElementById('preloader').classList.add('done')},2800)});

// Floating Particles
const particleContainer=document.getElementById('particles');
for(let i=0;i<25;i++){
  const p=document.createElement('div');
  p.className='particle';
  p.style.left=Math.random()*100+'vw';
  p.style.animationDelay=Math.random()*20+'s';
  p.style.animationDuration=(15+Math.random()*10)+'s';
  particleContainer.appendChild(p);
}

// Navbar Scroll
window.addEventListener('scroll',()=>{
  const nav=document.getElementById('navbar');
  if(window.scrollY>50)nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// Mobile Toggle
function toggleNav(){
  document.getElementById('navLinks').classList.toggle('active');
}

// Canvas Network Animation
const canvas=document.getElementById('heroCanvas');
const ctx=canvas.getContext('2d');
let w,h,nodes=[];
function resize(){
  w=canvas.width=window.innerWidth;
  h=canvas.height=window.innerHeight;
}
window.addEventListener('resize',resize);
resize();

class Node{
  constructor(){
    this.x=Math.random()*w;
    this.y=Math.random()*h;
    this.vx=(Math.random()-.5)*.5;
    this.vy=(Math.random()-.5)*.5;
    this.r=Math.random()*2+1;
  }
  update(){
    this.x+=this.vx;this.y+=this.vy;
    if(this.x<0||this.x>w)this.vx*=-1;
    if(this.y<0||this.y>h)this.vy*=-1;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.fillStyle='rgba(0,255,136,.6)';
    ctx.fill();
  }
}

for(let i=0;i<60;i++)nodes.push(new Node());

function animate(){
  ctx.clearRect(0,0,w,h);
  nodes.forEach((n,i)=>{
    n.update();n.draw();
    for(let j=i+1;j<nodes.length;j++){
      const dx=n.x-nodes[j].x,dy=n.y-nodes[j].y;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<150){
        ctx.beginPath();
        ctx.moveTo(n.x,n.y);
        ctx.lineTo(nodes[j].x,nodes[j].y);
        ctx.strokeStyle=`rgba(0,255,136,${.15*(1-dist/150)})`;
        ctx.lineWidth=.5;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(animate);
}
animate();

// Generate Chart Bars
function makeChart(id,count,min,max){
  const el=document.getElementById(id);
  if(!el)return;
  for(let i=0;i<count;i++){
    const bar=document.createElement('div');
    bar.className='chart-bar';
    bar.style.height=(min+Math.random()*(max-min))+'%';
    el.appendChild(bar);
  }
}
makeChart('tempChart',12,30,100);
makeChart('soilChart',12,20,80);
makeChart('humChart',12,10,60);
makeChart('phChart',12,40,90);
makeChart('npkChart',12,50,100);
makeChart('waterChart',12,60,100);

// Live Data Simulation
function updateVal(id,min,max,dec){
  const el=document.getElementById(id);
  if(!el)return;
  let v=parseFloat(el.innerText);
  v+=((min+Math.random()*(max-min)-v)*.3);
  el.innerText=dec?v.toFixed(dec):Math.round(v);
}
setInterval(()=>{
  updateVal('tempVal',32,38,1);
  updateVal('soilVal',35,50,0);
  updateVal('humVal',22,35,0);
  updateVal('phVal',6.8,7.6,1);
  updateVal('npkVal',60,80,0);
  updateVal('waterVal',75,95,0);
},3000);

// Scroll Reveal
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('active');});
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Active Nav
const sections=document.querySelectorAll('section[id]');
window.addEventListener('scroll',()=>{
  let cur='';
  sections.forEach(s=>{if(scrollY>=s.offsetTop-200)cur=s.getAttribute('id');});
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.classList.toggle('active',a.getAttribute('href')==='#'+cur);
  });
});

