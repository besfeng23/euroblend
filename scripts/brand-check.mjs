import {readFileSync,readdirSync} from 'node:fs';
import {join,extname} from 'node:path';
const retired = [1,0,6,4].join('');
const misspelled = ['cro','illo'].join('');
const textExt = new Set(['.html','.js','.mjs','.css','.md','.json','.svg','.xml','.yml','.yaml','.webmanifest','.txt']);
const problems = [];
function scan(dir='.') {
 for (const entry of readdirSync(dir,{withFileTypes:true})) {
  if (['.git','node_modules','.vercel'].includes(entry.name)) continue;
  const p=join(dir,entry.name);
  if (entry.isDirectory()) {scan(p);continue;}
  if (!entry.isFile() || !textExt.has(extname(p))) continue;
  const source=readFileSync(p,'utf8');
  if(source.includes(retired)) problems.push(p+': retired numeric brand prefix');
  if(source.toLowerCase().includes(misspelled)) problems.push(p+': incorrect Criollo spelling');
 }
}
scan();
for(const f of ['index.html','trade.html','script.js']) {
 const content=readFileSync(f,'utf8');
 if(content.includes('mailto:'))problems.push(f+': unapproved email contact link');
}
const home=readFileSync('index.html','utf8');
const storefrontJS=readFileSync('script.js','utf8');
if(home.includes('/images/ube-salted-caramel-')) problems.push('index.html: unapproved Ube Salted Caramel image');
for (const item of ['ube-salted-caramel','ube-milk','ube-classic','ube-vanilla']) {
 if (storefrontJS.includes("image:'"+item+"'")) problems.push('script.js: unapproved illustrative product image for '+item);
}
if (!home.includes('id="flavor-identity"')) problems.push('index.html: neutral visual fallback missing');
// Keep every published list in the same canonical order, including the three distinct signature flavors.
const lineup = [
 ['macchiato','Ube Macchiato','cafe','ube-macchiato'],
 ['criollo-cacao','Ube Criollo Cacao','cafe','ube-criollo-cacao'],
 ['criollo-salted-caramel','Ube Criollo with Salted Caramel','cafe','ube-criollo-salted-caramel'],
 ['salted-caramel','Ube Latte — Salted Caramel','velvet'],
 ['vanilla','Ube Latte — Vanilla','velvet'],
 ['light-lavender','Ube Latte — Light Lavender','signature'],
 ['classic','Ube Latte — Classic Ube','signature'],
 ['latte','Ube Latte — Deep Ube','signature','ube-latte'],
 ['milk','Ube Milk','milk']
];
const names=lineup.map(([,name])=>name);
const same=(label,actual,expected)=>{if(JSON.stringify(actual)!==JSON.stringify(expected))problems.push(label+': lineup mismatch')};
const flavorBlock=storefrontJS.match(/const flavors=\[([\s\S]*?)\n\];/)?.[1]||'';
const entries=[...flavorBlock.matchAll(/\{key:'([^']+)',name:'([^']+)',[^\n]*?family:'([^']+)'\}/g)];
same('script.js flavors',entries.map(m=>m.slice(1,4)),lineup.map(r=>r.slice(0,3)));
same('script.js flavor images',entries.map(m=>m[0].match(/image:'([^']+)'/)?.[1]||null),lineup.map(r=>r[3]||null));
const photos=storefrontJS.match(/const productPhotos=\{([^\n]*)\};/)?.[1]||'';
const photoEntries=[...photos.matchAll(/(?:^|,)\s*'?([\w-]+)'?\s*:\s*'([^']+)'/g)].map(m=>m.slice(1,3));
same('script.js productPhotos',photoEntries,lineup.filter(r=>r[3]).map(r=>[r[0],r[3]]));
const rail=[...home.matchAll(/<button[^>]*class="flavor-rail__option[^>]*data-family="([^"]+)" data-index="(\d+)"[^>]*><span>(\d+)<\/span><strong>([^<]+)<\/strong><\/button>/g)];
same('index.html rail',rail.map(m=>[m[1],Number(m[2]),Number(m[3]),m[4]]),lineup.map((r,i)=>[r[2],i,i+1,r[1]]));
const groups=[...home.matchAll(/<button[^>]*class="flight-groups__tab[^>]*data-family="([^"]+)"/g)].map(m=>m[1]);
same('index.html groups',groups,[...new Set(lineup.map(r=>r[2]))]);
const ticker=home.match(/<div class="ticker__track">(.*?)<\/div>/)?.[1]||'';
same('index.html ticker',[...ticker.matchAll(/<span>([^<]+)<\/span>/g)].map(m=>m[1]),names.map(n=>n.toUpperCase()));
try {
 const list=JSON.parse(home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'].find(v=>v['@type']==='ItemList');
 same('index.html JSON-LD count',list.numberOfItems,names.length);
 same('index.html JSON-LD entries',list.itemListElement.map(v=>[v.position,v.name]),names.map((n,i)=>[i+1,n]));
} catch {problems.push('index.html: invalid collection JSON-LD')}
const features=[...home.matchAll(/data-feature-flavor="(\d+)" aria-label="Explore ([^"]+)"/g)].map(m=>[Number(m[1]),m[2]]);
same('index.html packaging links',features,names.slice(0,3).map((n,i)=>[i,n]));
const faq=home.match(/<summary>What are the nine Euro Blend flavors\?.*?<\/summary><p>(.*?)<\/p>/)?.[1];
same('index.html FAQ',faq,names.slice(0,-1).join(', ')+', and '+names.at(-1)+'.');
const trade=readFileSync('trade.html','utf8');
const tradeList=trade.match(/<div class="trade-list">(.*?)<\/div><p class="trade-note">/s)?.[1]||'';
same('trade.html lineup',[...tradeList.matchAll(/<div><span>(\d+)<\/span><strong>([^<]+)<\/strong><\/div>/g)].map(m=>[Number(m[1]),m[2]]),names.map((n,i)=>[i+1,n]));
const readme=readFileSync('README.md','utf8');
const docs=readme.match(/### Canonical nine product names\n\n([\s\S]*?)\n\n/)?.[1]||'';
same('README.md lineup',[...docs.matchAll(/^(\d+)\. (.+)$/gm)].map(m=>[Number(m[1]),m[2]]),names.map((n,i)=>[i+1,n]));
for(const [file,source] of [['index.html',home],['trade.html',trade],['script.js',storefrontJS]]) {
 if(/\beight(?:[- ](?:distinct[- ])?flavors?)?\b/i.test(source))problems.push(file+': stale eight-flavor copy');
}
// A querySelector result is a single element, never a collection.
// Prevent the menu initialization regression missed by syntax-only checks.
if (/\$\([^\n]+?\)\.forEach\(/.test(storefrontJS.replace(/\$\$/g,'__all__'))) {
  problems.push('script.js: single-element selector incorrectly used as a collection');
}
if(problems.length){console.error(problems.join('\n'));process.exit(1)}
console.log('Brand spelling, public-contact and lineup checks passed. Rasterized packaging text requires visual inspection.');
