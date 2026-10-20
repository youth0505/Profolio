const year=document.querySelector('[data-year]');
if(year)year.textContent=new Date().getFullYear();

const gallery=document.querySelector('.exhibition-grid'),spectrum=document.querySelector('[data-photo-spectrum]');
const photoCount=document.querySelector('[data-photo-count]');

// Add final works here. `hue` sorts the archive around the color wheel (0–360).
// Keep image paths relative to photography.html, e.g. assets/Photo/my-photo.webp.
const photographs=[];

const escapeHtml=value=>String(value).replace(/[&<>'"]/g,character=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[character]));
const renderPhotographs=()=>{
  if(!gallery||!spectrum)return;
  const ordered=[...photographs].sort((a,b)=>a.hue-b.hue);
  if(!ordered.length){
    spectrum.style.background='linear-gradient(90deg,#d9cff5,#c9ebd5)';
    if(photoCount)photoCount.textContent='SORTED 00—∞';
    gallery.innerHTML='<div class="archive-pending reveal in-view"><span>01—∞</span><strong>THE ARCHIVE IS<br/>COMING INTO FOCUS.</strong><p>The first selection is being edited. Return soon for places, people, and passing light.</p></div>';
    return;
  }
  spectrum.style.background=`linear-gradient(90deg,${ordered.map(item=>item.color).join(',')})`;
  if(photoCount)photoCount.textContent=`SORTED 01—${String(ordered.length).padStart(2,'0')}`;
  gallery.innerHTML=ordered.map((item,index)=>`<figure class="exhibit exhibit--photo reveal in-view" data-hue="${item.hue}" data-color="${escapeHtml(item.color)}" data-image="${escapeHtml(item.image)}" style="--photo-color:${escapeHtml(item.color)}" tabindex="0" role="button" aria-label="Open ${escapeHtml(item.title)}"><div><b>${String(index+1).padStart(2,'0')}</b><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt)}" loading="lazy" /></div><figcaption><em>${escapeHtml(item.title)}</em><small>${escapeHtml(item.caption)} · OPEN ↗</small></figcaption></figure>`).join('');
};
renderPhotographs();

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
