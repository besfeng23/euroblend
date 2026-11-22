(function(){
  var toggle=document.getElementById('menu-toggle');
  var nav=document.getElementById('primary-nav');
  if(toggle&&nav){
    toggle.addEventListener('click',function(){
      var expanded=toggle.getAttribute('aria-expanded')==='true';
      toggle.setAttribute('aria-expanded',String(!expanded));
      toggle.setAttribute('aria-label',expanded?'Open navigation':'Close navigation');
      nav.classList.toggle('is-open',!expanded);
    });
    nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',function(){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');});});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}});
  }
  var year=document.getElementById('year');if(year)year.textContent=String(new Date().getFullYear());
})();