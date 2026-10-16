const year=document.querySelector('[data-year]');
if(year)year.textContent=new Date().getFullYear();

const gallery=document.querySelector('.exhibition-grid'),spectrum=document.querySelector('[data-photo-spectrum]');
if(gallery&&spectrum){
  const photographs=[...gallery.querySelectorAll('.exhibit')].sort((a,b)=>Number(a.dataset.hue)-Number(b.dataset.hue));
  photographs.forEach((item,index)=>{gallery.appendChild(item);item.querySelector('b').textContent=String(index+1).padStart(2,'0')+(index===photographs.length-1?'+':'')});
  spectrum.style.background=`linear-gradient(90deg,${photographs.map(item=>item.dataset.color).join(',')})`;
}

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(item=>observer.observe(item));
