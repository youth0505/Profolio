const year=document.querySelector('[data-year]');
if(year)year.textContent=new Date().getFullYear();

const gallery=document.querySelector('.exhibition-grid'),spectrum=document.querySelector('[data-photo-spectrum]');
if(gallery&&spectrum){
  const photographs=[...gallery.querySelectorAll('.exhibit')].sort((a,b)=>Number(a.dataset.hue)-Number(b.dataset.hue));
  photographs.forEach((item,index)=>{gallery.appendChild(item);item.querySelector('b').textContent=String(index+1).padStart(2,'0')+(index===photographs.length-1?'+':'')});
  spectrum.style.background=`linear-gradient(90deg,${photographs.map(item=>item.dataset.color).join(',')})`;
}

const photoLightbox=document.querySelector('[data-photo-lightbox]');
if(photoLightbox){
  const lightboxImage=photoLightbox.querySelector('[data-photo-lightbox-image]');
  const lightboxTitle=photoLightbox.querySelector('[data-photo-lightbox-title]');
  const lightboxColor=photoLightbox.querySelector('[data-photo-lightbox-color]');
  const closeButton=photoLightbox.querySelector('[data-photo-close]');
  let lastTrigger=null;
  const openPhoto=item=>{
    const image=item.querySelector('img');
    if(!image)return;
    lastTrigger=item;
    lightboxImage.src=item.dataset.image||image.src;
    lightboxImage.alt=image.alt;
    lightboxTitle.textContent=item.querySelector('figcaption em')?.textContent||'UNTITLED';
    lightboxColor.textContent=item.querySelector('figcaption small')?.textContent||'';
    photoLightbox.classList.add('open');
    photoLightbox.setAttribute('aria-hidden','false');
    document.body.classList.add('photo-lightbox-open');
    closeButton.focus();
  };
  const closePhoto=()=>{
    photoLightbox.classList.remove('open');
    photoLightbox.setAttribute('aria-hidden','true');
    document.body.classList.remove('photo-lightbox-open');
    lastTrigger?.focus();
  };
  document.querySelectorAll('.exhibit--photo').forEach(item=>{
    item.addEventListener('click',()=>openPhoto(item));
    item.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openPhoto(item)}});
  });
  closeButton.addEventListener('click',closePhoto);
  photoLightbox.addEventListener('click',event=>{if(event.target===photoLightbox)closePhoto()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&photoLightbox.classList.contains('open'))closePhoto()});
}

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(item=>observer.observe(item));
