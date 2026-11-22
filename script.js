(()=>{
  const menu=document.getElementById('mobile-menu');
  const nav=document.getElementById('site-nav');
  if(menu&&nav){
    const close=()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');nav.classList.remove('open')};
    menu.addEventListener('click',()=>{const isOpen=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!isOpen));menu.setAttribute('aria-label',isOpen?'Open menu':'Close menu');nav.classList.toggle('open',!isOpen)});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  }
  const year=document.getElementById('year');if(year)year.textContent=String(new Date().getFullYear());
  const flavors=[
    {key:'latte',name:'Ube Latte',html:'Ube<br>Latte',kicker:'THE SIGNATURE',description:'Our signature expression of a familiar favorite, imagined for your everyday rituals.',image:'/images/ube-latte.webp'},
    {key:'milk',name:'Ube Milk',html:'Ube<br>Milk',kicker:'SOMETHING SOFT',description:'A milk-inspired take on ube, for moments that call for something a little gentler.',image:'/images/ube-milk.webp'},
    {key:'classic',name:'Ube Classic',html:'Ube<br>Classic',kicker:'THE FAMILIAR FAVORITE',description:'A nod to the ube flavor we know and love, with no need for an introduction.',image:'/images/ube-classic.webp'},
    {key:'macchiato',name:'Ube Macchiato',html:'Ube<br>Macchiato',kicker:'A PLAYFUL PAIRING',description:'An ube twist on a familiar café-inspired name.',image:'/images/ube-macchiato.webp'},
    {key:'vanilla',name:'Ube Vanilla',html:'Ube<br>Vanilla',kicker:'SWEETLY FAMILIAR',description:'Two familiar flavor ideas, brought together with a little imagination.',image:'/images/ube-vanilla.webp'},
    {key:'salted-caramel',name:'Ube Salted Caramel',html:'Ube Salted<br>Caramel',kicker:'A LITTLE CONTRAST',description:'The sweet-and-salty pairing with a purple point of view.',image:'/images/ube-salted-caramel.webp'},
    {key:'criollo-cacao',name:'Ube Criollo Cacao',html:'Ube Criollo<br>Cacao',kicker:'THE CACAO EDITION',description:'An ube-and-cacao-inspired pairing for a different kind of moment.',image:'/images/ube-criollo-cacao.webp'},
    {key:'criollo-salted-caramel',name:'Ube Criollo Salted Caramel',html:'Ube Criollo<br>Salted Caramel',kicker:'THE BOLD PAIRING',description:'Cacao-inspired notes meet the idea of salted caramel in one distinctive flavor name.',image:'/images/ube-criollo-salted-caramel.webp'}
  ];
  const stage=document.getElementById('flavor-experience');
  if(!stage)return;
  const image=document.getElementById('selected-product-image');
  const title=document.getElementById('selected-flavor-title');
  const kicker=document.getElementById('selected-flavor-kicker');
  const desc=document.getElementById('selected-flavor-description');
  const number=document.getElementById('selected-flavor-number');
  const link=document.getElementById('selected-flavor-link');
  const buttons=[...document.querySelectorAll('.flavor-picker__option')];
  const prev=document.getElementById('flavor-prev');const next=document.getElementById('flavor-next');
  let selected=0;
  function choose(n){
    selected=(n+flavors.length)%flavors.length;
    const f=flavors[selected];
    stage.dataset.flavor=f.key;
    image.classList.add('is-switching');
    image.src=f.image;image.alt='Euro Blend '+f.name+' carton, sachet and warm serving';
    if(image.complete)image.classList.remove('is-switching');
    else image.addEventListener('load',()=>image.classList.remove('is-switching'),{once:true});
    title.innerHTML=f.html;kicker.textContent=f.kicker;desc.textContent=f.description;
    number.innerHTML=String(selected+1).padStart(2,'0')+' <span>/ 08</span>';
    link.setAttribute('aria-label','Enquire about '+f.name);
    buttons.forEach((button,i)=>{const active=i===selected;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active))});
  }
  buttons.forEach((button,i)=>button.addEventListener('click',()=>choose(i)));
  prev.addEventListener('click',()=>choose(selected-1));
  next.addEventListener('click',()=>choose(selected+1));
  const flavorPicker=document.querySelector('.flavor-picker');
  flavorPicker.addEventListener('keydown',e=>{
    if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;
    e.preventDefault();const nextIndex=(selected+(e.key==='ArrowRight'?1:-1)+flavors.length)%flavors.length;
    choose(nextIndex);buttons[nextIndex].focus();
  });
})();
