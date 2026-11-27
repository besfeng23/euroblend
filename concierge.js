(function(){
'use strict';
const kb=window.EuroblendKnowledge;if(!kb)return;
const root=document.createElement('div');root.className='eb-concierge';
root.innerHTML='<button class="eb-launch" type="button" aria-expanded="false" aria-controls="eb-panel"><span class="eb-launch-icon" aria-hidden="true">✳</span><span>Ask Euroblend<small>Product &amp; order guide</small></span></button><section id="eb-panel" class="eb-panel" role="dialog" aria-modal="false" aria-labelledby="eb-title" hidden><header class="eb-head"><div class="eb-emblem"><img src="/euroblend-mark.svg" alt="" width="36" height="38"></div><div><strong id="eb-title">Euroblend Concierge</strong><small id="eb-mode">Verified product guide</small></div><button class="eb-close" type="button" aria-label="Close concierge">×</button></header><div class="eb-language" role="group" aria-label="Answer language"><button type="button" data-lang="en" aria-pressed="true">English</button><button type="button" data-lang="fil" aria-pressed="false">Filipino / Taglish</button><button class="eb-reset" type="button">Clear chat</button></div><div class="eb-stream" role="log" aria-live="polite" aria-label="Conversation"></div><div class="eb-suggestions" aria-label="Suggested questions"></div><form class="eb-form"><label class="eb-sr" for="eb-question">Ask Euroblend a question</label><input id="eb-question" autocomplete="off" maxlength="600" placeholder="Ask about flavors, prices, orders…" required><button type="submit" aria-label="Send question">↑</button></form><p class="eb-privacy">Automated guidance. Questions may be processed by an AI provider when enabled. Please do not enter personal or payment details.</p><a class="eb-human" href="https://www.facebook.com/share/1deLJW2QHp/" target="_blank" rel="noopener noreferrer">Speak with the Euroblend team ↗</a></section>';
document.body.append(root);
const $=s=>root.querySelector(s);
const panel=$('.eb-panel'),launch=$('.eb-launch'),close=$('.eb-close'),stream=$('.eb-stream'),suggestions=$('.eb-suggestions'),input=$('#eb-question'),form=$('.eb-form'),mode=$('#eb-mode'),send=form.querySelector('button');
let lang='en',busy=false,version=0,lastAsked=0,context={};
const texts={
en:{welcome:'Hi! Welcome to Euroblend. What brings you here today — finding a new favorite drink, ordering, or exploring a business partnership?',questions:['Explore the flavors','Help me choose a flavor','Prices and ordering','Preparation and ingredients','Become a reseller'],placeholder:'Ask about flavors, prices, orders…',working:'Finding the right information…',guide:'Verified product guide',ai:'AI-assisted · verified answers',local:'Verified guide · offline',links:{collection:'Explore collection',trade:'Business enquiries',contact:'Contact our team'}},
fil:{welcome:'Hi! Welcome sa Euroblend. Anong hanap mo ngayon — bagong favorite drink, order, o business partnership?',questions:['Ano ang mga variants?','Alin ang masarap subukan?','Magkano at paano bumili?','Paano timplahin at ano ang sangkap?','Paano maging reseller?'],placeholder:'Magtanong tungkol sa flavors, presyo, orders…',working:'Hinahanap ang tamang impormasyon…',guide:'Verified product guide',ai:'AI-assisted · verified answers',local:'Verified guide · offline',links:{collection:'Tingnan ang collection',trade:'Business enquiries',contact:'Kausapin ang team'}}
};
const destinations={collection:'/#flavors',trade:'/trade',contact:'https://www.facebook.com/share/1deLJW2QHp/'};
function message(role,text,actions=[]){
 const box=document.createElement('div');box.className='eb-message eb-'+role;
 const label=document.createElement('span');label.className='eb-speaker';label.textContent=role==='user'?'YOU':'EUROBLEND';box.append(label);
 const p=document.createElement('p');p.textContent=text;box.append(p);
 if(actions.length){const links=document.createElement('div');links.className='eb-links';for(const action of actions){if(!Object.prototype.hasOwnProperty.call(destinations,action))continue;const a=document.createElement('a');a.href=destinations[action];a.textContent=texts[lang].links[action]+' ↗';if(action==='contact'){a.target='_blank';a.rel='noopener noreferrer'}else a.addEventListener('click',()=>setOpen(false));links.append(a)}box.append(links)}
 stream.append(box);
 while(stream.children.length>25)stream.firstElementChild.remove();
 stream.scrollTop=stream.scrollHeight;return box;
}
function setOpen(open){panel.hidden=!open;launch.setAttribute('aria-expanded',String(open));if(open){input.focus({preventScroll:true});stream.scrollTop=stream.scrollHeight}else launch.focus({preventScroll:true})}
function renderSuggestions(){suggestions.replaceChildren();for(const q of texts[lang].questions){const b=document.createElement('button');b.type='button';b.textContent=q;b.addEventListener('click',()=>ask(q));suggestions.append(b)}}
function reset(){version++;context={};lastAsked=0;busy=false;send.disabled=false;stream.replaceChildren();mode.textContent=texts[lang].guide;input.value='';input.placeholder=texts[lang].placeholder;message('assistant',texts[lang].welcome);renderSuggestions()}
async function ask(raw){
 const q=String(raw||'').trim().slice(0,600);if(!q||busy||Date.now()-lastAsked<800)return;
 lastAsked=Date.now();busy=true;send.disabled=true;input.value='';suggestions.replaceChildren();message('user',q);
 const pending=message('assistant',texts[lang].working);const turn=version,language=lang;
 let result,offline=false;
 try{
  const response=await fetch('/api/concierge',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q,language,context}),signal:AbortSignal.timeout(11000)});
  if(!response.ok)throw Error('Unavailable');
  result=await response.json();if(typeof result.reply!=='string'||!Array.isArray(result.actions))throw Error('Invalid response');
 }catch{offline=true;result=kb.respond(q,language,context)}
 if(turn!==version)return;
 context=kb.contextOf(result.context);pending.remove();message('assistant',result.reply,result.actions);mode.textContent=offline?texts[lang].local:result.mode==='ai'?texts[lang].ai:texts[lang].guide;
 busy=false;send.disabled=false;if(!panel.hidden)input.focus({preventScroll:true});
}
launch.addEventListener('click',()=>setOpen(panel.hidden));close.addEventListener('click',()=>setOpen(false));
root.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){e.preventDefault();setOpen(false)}});
form.addEventListener('submit',e=>{e.preventDefault();ask(input.value)});
root.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{if(lang===b.dataset.lang)return;lang=kb.language(b.dataset.lang);root.querySelectorAll('[data-lang]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.lang===lang)));reset()}));
$('.eb-reset').addEventListener('click',reset);reset();
})();