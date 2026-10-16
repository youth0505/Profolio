const loader=document.querySelector('.loader'),loaderCount=document.querySelector('[data-loader-count]');let count=0;const loadTimer=setInterval(()=>{count=Math.min(100,count+Math.ceil(Math.random()*14));loaderCount.textContent=String(count).padStart(2,'0');if(count===100){clearInterval(loadTimer);setTimeout(()=>loader.classList.add('done'),180)}},60);document.querySelector('[data-year]').textContent=new Date().getFullYear();const menuButton=document.querySelector('.menu-toggle'),nav=document.querySelector('#site-nav');const setMenu=open=>{menuButton.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);document.body.style.overflow=open?'hidden':''};menuButton.addEventListener('click',()=>setMenu(!nav.classList.contains('open')));nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));const gallery=document.querySelector('.exhibition-grid'),spectrum=document.querySelector('[data-photo-spectrum]');if(gallery&&spectrum){const photographs=[...gallery.querySelectorAll('.exhibit')].sort((a,b)=>Number(a.dataset.hue)-Number(b.dataset.hue));photographs.forEach((item,index)=>{gallery.appendChild(item);item.querySelector('b').textContent=String(index+1).padStart(2,'0')+(index===photographs.length-1?'+':'')});spectrum.style.background=`linear-gradient(90deg,${photographs.map(item=>item.dataset.color).join(',')})`}const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(item=>observer.observe(item));const orbitCopy=document.querySelector('.orbit-copy');orbitCopy.innerHTML=orbitCopy.textContent.split('').map((character,index,all)=>`<i style="position:absolute;left:50%;top:50%;font-style:normal;transform:rotate(${index/all.length*360}deg) translateY(-6.9vw);transform-origin:0 0">${character}</i>`).join('');if(window.matchMedia('(pointer:fine)').matches)document.querySelectorAll('.magnetic').forEach(element=>{element.addEventListener('mousemove',event=>{const box=element.getBoundingClientRect(),x=(event.clientX-box.left-box.width/2)*.18,y=(event.clientY-box.top-box.height/2)*.18;element.style.transform=`translate(${x}px, ${y}px)`});element.addEventListener('mouseleave',()=>{element.style.transform=''})});

const projectTriggers=[...document.querySelectorAll('[data-project-image]')],projectLightbox=document.querySelector('.project-lightbox');
if(projectTriggers.length&&projectLightbox){
  const lightboxImage=projectLightbox.querySelector('figure img'),lightboxTitle=projectLightbox.querySelector('figcaption span'),lightboxCount=projectLightbox.querySelector('figcaption small'),closeButton=projectLightbox.querySelector('.lightbox-close');
  let activeProjectIndex=0,lastProjectTrigger=null;
  const renderProjectImage=index=>{activeProjectIndex=(index+projectTriggers.length)%projectTriggers.length;const trigger=projectTriggers[activeProjectIndex],preview=trigger.querySelector('img');lightboxImage.src=trigger.dataset.projectImage;lightboxImage.alt=preview?.alt||trigger.dataset.projectTitle;lightboxTitle.textContent=trigger.dataset.projectTitle;lightboxCount.textContent=`${String(activeProjectIndex+1).padStart(2,'0')} / ${String(projectTriggers.length).padStart(2,'0')}`};
  const openProjectImage=trigger=>{lastProjectTrigger=trigger;renderProjectImage(projectTriggers.indexOf(trigger));projectLightbox.classList.add('open');projectLightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';closeButton.focus()};
  const closeProjectImage=()=>{projectLightbox.classList.remove('open');projectLightbox.setAttribute('aria-hidden','true');document.body.style.overflow='';lastProjectTrigger?.focus()};
  projectTriggers.forEach(trigger=>trigger.addEventListener('click',()=>openProjectImage(trigger)));
  closeButton.addEventListener('click',closeProjectImage);
  projectLightbox.querySelector('.lightbox-prev').addEventListener('click',()=>renderProjectImage(activeProjectIndex-1));
  projectLightbox.querySelector('.lightbox-next').addEventListener('click',()=>renderProjectImage(activeProjectIndex+1));
  projectLightbox.addEventListener('click',event=>{if(event.target===projectLightbox)closeProjectImage()});
  document.addEventListener('keydown',event=>{if(!projectLightbox.classList.contains('open'))return;if(event.key==='Escape')closeProjectImage();if(event.key==='ArrowLeft')renderProjectImage(activeProjectIndex-1);if(event.key==='ArrowRight')renderProjectImage(activeProjectIndex+1)});
}

const radialGallery=document.querySelector('.project-visual');
if(radialGallery){
  const radialNodes=[...radialGallery.querySelectorAll('.project-node')],reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let radialFrame=0;
  const clamp=(value,min=0,max=1)=>Math.min(max,Math.max(min,value));
  const renderRadialGallery=()=>{
    radialFrame=0;
    const rect=radialGallery.getBoundingClientRect(),viewportHeight=window.innerHeight,centerDistance=Math.abs(rect.top+rect.height/2-viewportHeight/2),travelRange=(viewportHeight+rect.height)*.53;
    const scatter=reducedMotion?(rect.bottom>0&&rect.top<viewportHeight?1:0):clamp(1-centerDistance/travelRange);
    radialGallery.style.setProperty('--scatter',scatter.toFixed(3));
    radialNodes.forEach(node=>{
      const delay=Number(node.dataset.scatterDelay||0),local=clamp((scatter-delay)/(1-delay)),eased=1-Math.pow(1-local,3),x=Number(node.dataset.scatterX),y=Number(node.dataset.scatterY),mobile=window.innerWidth<=820,mobileFactor=mobile ? 0.72 : 1;
      node.style.setProperty('--scatter-tx',`${x*rect.width*eased*mobileFactor}px`);
      node.style.setProperty('--scatter-ty',`${y*rect.height*eased*mobileFactor}px`);
      node.style.setProperty('--node-scale',(0.34+eased*.66).toFixed(3));
      node.style.setProperty('--node-opacity',(0.22+eased*.78).toFixed(3));
      node.style.setProperty('--node-rotation',`calc(var(--node-angle) * ${eased.toFixed(3)})`);
      node.classList.toggle('is-scattered',local>.56);
      node.tabIndex=local>.56?0:-1;
    });
  };
  const requestRadialRender=()=>{if(!radialFrame)radialFrame=requestAnimationFrame(renderRadialGallery)};
  window.addEventListener('scroll',requestRadialRender,{passive:true});window.addEventListener('resize',requestRadialRender);renderRadialGallery();
}

document.querySelectorAll('.intro-card').forEach(card=>{
  card.addEventListener('click',()=>{
    const willOpen=card.getAttribute('aria-pressed')!=='true';
    document.querySelectorAll('.intro-card[aria-pressed="true"]').forEach(openCard=>openCard.setAttribute('aria-pressed','false'));
    card.setAttribute('aria-pressed',String(willOpen));
  });
  card.addEventListener('mouseleave',()=>{if(window.matchMedia('(pointer:fine)').matches)card.setAttribute('aria-pressed','false')});
});

const experienceChain=document.querySelector('[data-experience-chain]');
if(experienceChain){
  const experiences=[
    {number:'01',kicker:'DATA → INSIGHT',company:'Ernst & Young Hua Ming LLP',role:'Data Analysis Intern · Shanghai, China',summary:'Built the analytical foundation: processing business data, finding the signal, and translating it into clear visual reporting.',points:['Analyzed historical business data with Excel and Power BI.','Transferred Tableau knowledge into a new tool and real client work.'],bridge:'From reading data<br/>to shaping how people see it.'},
    {number:'02',kicker:'MODEL → INTERACTION',company:'Suzhou Broadcasting System',role:'Technology R&D Intern · Suzhou, China',summary:'Moved from static analysis to interactive AI—deploying a multimodal model and designing an interface through which people could test and understand its outputs.',points:['Deployed Qwen2-VL-7B locally for image recognition and video keyword extraction.','Built a Gradio interface for visualizing, testing, and refining model output.'],bridge:'From visual reporting<br/>to interactive intelligence.'},
    {number:'03',kicker:'STEPS → WORKFLOW',company:'Suzhou Yantu Education Technology',role:'AIGC Development Intern · Suzhou, China',summary:'Connected individual AI capabilities into an end-to-end product flow, learning how data, prompts, APIs, evaluation, and iteration work as one system.',points:['Linked assessment, question generation, explanations, and language analysis.','Integrated APIs and custom code, then improved reliability through error analysis.'],bridge:'From one model interaction<br/>to an orchestrated AI product.'},
    {number:'04',kicker:'WORKFLOW → OPERATION',company:'Bosch Powertrain Systems',role:'Manufacturing Digitalization / Operations Intern · Wuxi, China',summary:'Brought the full stack into real operations—combining data access, visual management, automation, and cross-functional delivery at manufacturing scale.',points:['Built seven KPI reports and visual boards for office and shop-floor decisions.','Automated an international material-calling process, cutting weekly manual work from two hours to almost zero.'],bridge:'From a digital workflow<br/>to an operating system for decisions.'}
  ];
  const map=experienceChain.querySelector('.chain-map'),stage=experienceChain.querySelector('.chain-stage'),nodes=[...experienceChain.querySelectorAll('.chain-node')];
  const fields={number:'[data-chain-number]',kicker:'[data-chain-kicker]',company:'[data-chain-company]',role:'[data-chain-role]',summary:'[data-chain-summary]',bridge:'[data-chain-bridge]'};
  const activateExperience=index=>{const item=experiences[index];nodes.forEach((node,nodeIndex)=>{const active=nodeIndex===index;node.classList.toggle('is-active',active);node.setAttribute('aria-selected',String(active))});map.style.setProperty('--active-step',index);Object.entries(fields).forEach(([key,selector])=>stage.querySelector(selector)[key==='bridge'?'innerHTML':'textContent']=item[key]);stage.querySelector('[data-chain-points]').innerHTML=item.points.map(point=>`<li>${point}</li>`).join('');stage.classList.remove('is-switching');requestAnimationFrame(()=>stage.classList.add('is-switching'))};
  nodes.forEach((node,index)=>{node.addEventListener('click',()=>activateExperience(index));node.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();const next=(index+(event.key==='ArrowRight'?1:-1)+nodes.length)%nodes.length;nodes[next].focus();activateExperience(next)})});
}
