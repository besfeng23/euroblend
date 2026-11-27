'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const kb=require('../concierge-knowledge.js');
const {resolve,validate,reserveQuota}=require('../api/concierge.js');
test('canonical eight names, Light Lavender is milk',()=>{
 assert.equal(kb.products.length,8);assert.equal(new Set(kb.products).size,8);
 assert.ok(kb.products.includes('Ube Milk'));assert.ok(!kb.products.includes('Light Lavender'));
 assert.match(kb.answer(['milk'],'en').reply,/Light Lavender is the Ube Milk variant/);
});
test('common English and Filipino questions return supported topics',()=>{
 for(const [q,id] of [['Magkano ang Ube Latte?','price'],['How do I become a reseller?','trade'],['Does it have caffeine?','allergens'],['Paano timplahin?','prepare'],['How many sachets in a box?','pack'],['FDA registered?','safety'],['Do you ship overseas?','delivery'],['Can I use GCash?','payment'],['Light Lavender','milk'],['What are the variants?','catalog']])assert.ok(kb.classify(q).includes(id),q);
 assert.match(kb.answer(['price'],'fil').reply,/Hindi pa nakalathala/);
 assert.deepEqual(kb.answer(['invented'],'en').topics,['unknown']);
});
test('missing key or rate budget never calls provider',async()=>{
 const never=()=>{throw Error('Unexpected call')};
 assert.equal((await resolve('price','en',{},never)).mode,'guide');
 assert.equal((await resolve('price','en',{CONCIERGE_AI_ENABLED:'true',GEMINI_API_KEY:'mock',GEMINI_MODEL:'gemini-test'},never)).mode,'guide');
});
test('AI routes to approved answer only, quota enforced, personal or safety questions stay local',async()=>{
 const env={CONCIERGE_AI_ENABLED:'true',GEMINI_API_KEY:'mock',GEMINI_MODEL:'gemini-test',CONCIERGE_DAILY_LIMIT:'2',CONCIERGE_REDIS_URL:'https://example.upstash.io',CONCIERGE_REDIS_TOKEN:'mock'};
 let calls=0;
 const fetcher=async(url,opts)=>{calls++;if(url.includes('upstash'))return {ok:true,json:async()=>({result:1})};assert.match(url,/generativelanguage.googleapis.com/);return {ok:true,json:async()=>({candidates:[{content:{parts:[{text:'["trade"]'}]}}]})}};
 const r=await resolve('Can I offer this to my customers?','en',env,fetcher);assert.equal(r.mode,'ai');assert.deepEqual(r.topics,['trade']);assert.equal(r.reply,kb.entries.trade.en);assert.equal(calls,2);
 assert.equal((await resolve('Is it safe for diabetes?','en',env,fetcher)).mode,'guide');assert.equal(calls,2);
 assert.equal((await resolve('Contact a@example.com','en',env,fetcher)).mode,'guide');assert.equal(calls,2);
 assert.equal(await reserveQuota(env,async()=>({ok:true,json:async()=>({result:3})})),false);
 const denied=await resolve('ask','en',env,async()=>({ok:true,json:async()=>({result:3})}));assert.equal(denied.mode,'guide');
 const malformed=await resolve('ask','en',env,async(url)=>({ok:true,json:async()=>url.includes('upstash')?{result:1}:{candidates:[{content:{parts:[{text:'["not-approved"]'}]}}]}}));assert.equal(malformed.mode,'guide');
});
test('request validation',()=>{assert.equal(validate({message:''}),null);assert.equal(validate({message:'a'.repeat(601)}),null);assert.deepEqual(validate({message:' hi ',language:'fil'}),{message:'hi',lang:'fil'});assert.equal(validate({message:3}),null)});
