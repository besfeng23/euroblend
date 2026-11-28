const test = require('node:test');
const assert = require('node:assert/strict');
const kb = require('../concierge-knowledge.js');
const {resolve} = require('../api/concierge.js');
test('opening a conversation does not repeat the initial welcome', () => {
  for (const lang of ['en','fil']) {
    const result = kb.respond('Hi', lang, {greeted:true});
    assert.doesNotMatch(result.reply,/welcome/i);
    assert.equal(result.context.greeted,true);
    assert.deepEqual(result.actions,[]);
  }
});
test('greetings retain the selected product', () => {
  const result=kb.respond('Hi','en',{greeted:true,product:'Ube Vanilla',topic:'price'});
  assert.equal(result.context.product,'Ube Vanilla');
  assert.equal(result.context.topic,'price');
});
test('enabled Gemini can respond to greetings with existing quota protections',async()=>{
  const env={CONCIERGE_AI_ENABLED:'true',GEMINI_API_KEY:'mock',GEMINI_MODEL:'gemini-test',CONCIERGE_DAILY_LIMIT:'20',CONCIERGE_REDIS_URL:'https://example.upstash.io',CONCIERGE_REDIS_TOKEN:'mock'};
  let calls=0;
  const fetcher=async(url,options)=>{
    calls++;
    if(url.includes('upstash'))return {ok:true,json:async()=>({result:1})};
    const body=JSON.parse(options.body);
    assert.equal(JSON.parse(body.contents[0].parts[0].text).context.greeted,true);
    return {ok:true,json:async()=>({candidates:[{content:{parts:[{text:JSON.stringify({topics:['greeting'],reply:'Hey there! What can I help you with?'})}]}}]})};
  };
  const result=await resolve('Hi','en',env,fetcher,{greeted:true});
  assert.equal(calls,2);
  assert.equal(result.mode,'ai');
  assert.equal(result.reply,'Hey there! What can I help you with?');
});
test('missing AI binding remains fail closed',async()=>{
  const result=await resolve('Hi','en',{},()=>{throw Error('unexpected provider call')},{greeted:true});
  assert.equal(result.mode,'guide');
  assert.doesNotMatch(result.reply,/welcome/i);
});
