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
for (const flavor of ['Ube Latte','Ube Milk','Ube Classic','Ube Macchiato','Ube Vanilla','Ube Salted Caramel','Ube Criollo Cacao','Ube Criollo Salted Caramel']) {
 if (!home.includes(flavor)) problems.push('index.html: missing '+flavor);
}
if(problems.length){console.error(problems.join('\n'));process.exit(1)}
console.log('Brand spelling, public-contact and lineup checks passed. Rasterized packaging text requires visual inspection.');
