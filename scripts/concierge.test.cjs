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

test('conversational greeting, follow-ups, language and honest handoff',async()=>{
 const hi=await resolve('Hi','en',{});
 assert.match(hi.reply,/^Hi! Welcome to Euroblend/);
 assert.deepEqual(hi.actions,[]);
 const product=await resolve('Ube Latte','en',{});
 assert.equal(product.context.product,'Ube Latte');
 const price=await resolve('How much?','en',{},fetch,product.context);
 assert.match(price.reply,/confirmed price for Ube Latte/);
 const other=await resolve('How about Ube Vanilla?','en',{},fetch,price.context);
 assert.match(other.reply,/confirmed price for Ube Vanilla/);
 const fil=await resolve('Magkano po?','en',{},fetch,other.context);
 assert.equal(fil.language,'fil');assert.match(fil.reply,/Para sa Ube Vanilla/);
 const thank=await resolve('Thank you!','en',{},fetch,fil.context);
 assert.match(thank.reply,/You’re welcome/);assert.deepEqual(thank.actions,[]);
 const honest=await resolve('Are you a bot?','en',{});
 assert.match(honest.reply,/automated concierge/);
 assert.match((await resolve('What do you mean?','en',{})).reply,/little more/);
 assert.deepEqual(kb.contextOf({product:'not a product',topic:'__proto__'}),{product:null,topic:null});
});

test('Gemini can compose discovery dialogue but cannot override confirmed facts',async()=>{
 const env={CONCIERGE_AI_ENABLED:'true',GEMINI_API_KEY:'mock',GEMINI_MODEL:'gemini-test',CONCIERGE_DAILY_LIMIT:'2',CONCIERGE_REDIS_URL:'https://example.upstash.io',CONCIERGE_REDIS_TOKEN:'mock'};
 const mock=(topics,reply)=>async(url)=>({ok:true,json:async()=>url.includes('upstash')?{result:1}:{candidates:[{content:{parts:[{text:JSON.stringify({topics,reply})}]}}]}});
 const discovery=await resolve('Can you suggest something?','en',env,mock(['recommend'],'Of course! Do you usually go for vanilla or salted caramel?'));
 assert.equal(discovery.reply,'Of course! Do you usually go for vanilla or salted caramel?');
 const unsafe=await resolve('Can you suggest something?','en',env,mock(['recommend'],'It is caffeine free and costs ₱100.'));
 assert.doesNotMatch(unsafe.reply,/caffeine free|₱100/);
 const facts=await resolve('How much is Ube Latte?','en',env,mock(['price'],'It costs 100 pesos.'));
 assert.match(facts.reply,/confirmed price for Ube Latte/);
});

test('a coherent customer journey keeps intent, preference and quantity',async()=>{
 let r=await resolve('For myself','en',{});
 assert.equal(r.context.goal,'personal');assert.match(r.reply,/What kind of flavor/);
 r=await resolve('I like vanilla','en',{},fetch,r.context);
 assert.equal(r.context.product,'Ube Vanilla');assert.equal(r.context.preference,'vanilla');
 assert.match(r.reply,/Ube Vanilla/);assert.equal(r.context.pending,'order');
 r=await resolve('Yes please','en',{},fetch,r.context);
 assert.equal(r.topics[0],'order');assert.match(r.reply,/For Ube Vanilla/);
 r=await resolve('How much?','en',{},fetch,r.context);
 assert.match(r.reply,/confirmed price for Ube Vanilla/);
 r=await resolve('2 boxes','en',{},fetch,r.context);
 assert.equal(r.context.quantity,2);assert.match(r.reply,/2 boxes of Ube Vanilla/);
 assert.doesNotMatch(r.reply,/order (?:placed|confirmed)/i);
 assert.ok(r.context.recentTopics.length<=4);
 const b=await resolve('For my cafe','en',{});
 assert.equal(b.context.goal,'business');assert.match(b.reply,/What kind of business/);
 assert.equal(kb.contextOf({quantity:-5,goal:'invalid',preference:'random',recentTopics:['price','__proto__','order']}).quantity,undefined);
 assert.deepEqual(kb.contextOf({recentTopics:['price','__proto__','order']}).recentTopics,['price','order']);
});
