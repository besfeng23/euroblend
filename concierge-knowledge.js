(function(root,factory){const knowledge=factory();if(typeof module==='object'&&module.exports)module.exports=knowledge;else root.EuroblendKnowledge=knowledge})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const products=['Ube Macchiato','Ube Criollo','Ube Criollo Salted Caramel','Ube Salted Caramel','Ube Vanilla','Ube Classic','Ube Latte','Ube Milk'];
const entries={
greeting:{en:'Hi! Welcome to Euroblend. Are you looking for something to enjoy yourself, or exploring our drinks for your business?',fil:'Hi! Welcome sa Euroblend. Para sa sarili mo ba ang hinahanap mong drink, o para sa business?',action:null},
thanks:{en:'You’re welcome! If you have another question about our drinks, I’m here to help.',fil:'Walang anuman! Kung may iba ka pang tanong tungkol sa drinks namin, nandito lang ako.',action:null},
identity:{en:'I’m Euroblend’s automated concierge. I can help you explore the collection and prepare an enquiry, or connect you with our team for details I can’t confirm.',fil:'Ako ang automated concierge ng Euroblend. Tutulungan kitang pumili ng variant o maghanda ng enquiry. Maaari rin kitang ituro sa team para sa hindi ko pa makumpirma.',action:null},
clarify:{en:'What would you like to know about it — the flavor, price, preparation, or where to buy?',fil:'Ano ang gusto mong malaman — ang flavor, presyo, paraan ng pagtimpla, o kung saan mabibili?',action:null},
catalog:{en:'Explore all eight variants: '+products.join(', ')+'. Light Lavender identifies Ube Milk.',fil:'May walong variant ang Euro Blend: '+products.join(', ')+'. Ang Light Lavender ay Ube Milk, hindi hiwalay na variant.',action:'collection'},
recommend:{en:'For a café-inspired choice, explore Ube Macchiato or the Criollo variants. For vanilla or salted caramel, try the matching named variant. Ube Latte, Ube Classic and Ube Milk are other options. Which flavor interests you? Sweetness, caffeine and taste intensity have not been confirmed.',fil:'Kung café-inspired ang hanap mo, tingnan ang Ube Macchiato o Criollo variants. Kung vanilla o salted caramel ang gusto mo, may variant para rito. May Ube Latte, Ube Classic at Ube Milk din. Alin ang gusto mong malaman? Hindi pa kumpirmado ang sweetness, caffeine at intensity.',action:'collection'},
milk:{en:'Light Lavender is the Ube Milk variant. It is not an additional flavor. Its dairy ingredients and prepared drink appearance must be confirmed from the actual product label.',fil:'Ang Light Lavender ay Ube Milk mismo, hindi dagdag na variant. Kailangang kumpirmahin ang dairy ingredients at itsura ng inihandang inumin sa aktuwal na produkto.',action:'collection'},
taste:{en:'The variant names can help you choose a flavor direction, but exact sweetness, creaminess and intensity have not been verified. Our team can confirm the flavor profile you prefer.',fil:'Makakatulong ang pangalan ng variant sa pagpili, pero hindi pa kumpirmado ang tamis, creaminess at intensity. Makapagtatanong ka sa team tungkol sa gusto mong flavor profile.',action:'contact'},
price:{en:'Current retail and wholesale prices are not published. Ask the Euro Blend team for a quotation and confirm the variant, quantity and delivery location.',fil:'Hindi pa nakalathala ang kasalukuyang retail at wholesale prices. Humingi ng quotation sa team at ilagay ang variant, quantity at delivery location.',action:'contact'},
prepare:{en:'Follow the instructions on the actual product packaging. Exact water volume, temperature, serving size and hot or iced preparation have not been confirmed. Ask the team for the instructions for your chosen variant.',fil:'Sundin ang instructions sa aktuwal na packaging. Hindi pa kumpirmado ang dami at temperatura ng tubig, serving size at hot o iced preparation. Tanungin ang team para sa napili mong variant.',action:'contact'},
ingredients:{en:'The ingredient list, ube content, coffee content and formulation have not been independently confirmed. Check the actual product label or request the ingredient information from Euro Blend.',fil:'Hindi pa kumpirmado ang ingredient list, ube content, coffee content at formulation. Tingnan ang aktuwal na label o humingi ng ingredient information sa Euro Blend.',action:'contact'},
allergens:{en:'Allergens, dairy, caffeine, sugar and dietary suitability have not been verified. Do not assume any variant is allergen-free, dairy-free, caffeine-free, sugar-free or suitable for a medical condition. Check the label and confirm with the team before consuming.',fil:'Hindi pa kumpirmado ang allergens, dairy, caffeine, sugar at dietary suitability. Huwag ipagpalagay na allergen-free, dairy-free, caffeine-free, sugar-free o angkop sa medical condition ang isang variant. Suriin ang label at kumpirmahin sa team bago uminom.',action:'contact'},
nutrition:{en:'Calories, nutrition facts and serving sizes have not been confirmed. Please request the current nutrition label for the exact variant.',fil:'Hindi pa kumpirmado ang calories, nutrition facts at serving size. Humingi ng kasalukuyang nutrition label para sa mismong variant.',action:'contact'},
pack:{en:'Selected carton and sachet artwork is available on the collection page. Confirm the actual pack weight, sachet quantity and packaging format with the team; the artwork is not a verified specification.',fil:'May carton at sachet artwork sa collection page para sa ilang variant. Kumpirmahin sa team ang aktuwal na timbang, bilang ng sachets at packaging format; hindi pa verified specification ang artwork.',action:'collection'},
order:{en:'You can ask Euro Blend about orders through its official Facebook page. Mention your chosen variant, quantity and delivery area. This website does not place an order or accept payment.',fil:'Magtanong tungkol sa order sa official Facebook page ng Euro Blend. Sabihin ang variant, quantity at delivery area. Hindi nagpo-place ng order o tumatanggap ng payment ang website.',action:'contact'},
delivery:{en:'Delivery areas, shipping fees, lead times, pickup options and international shipping are not yet confirmed. Contact the team with your destination for the available arrangements.',fil:'Hindi pa kumpirmado ang delivery areas, shipping fees, lead time, pickup at international shipping. Ibigay sa team ang destination para malaman ang available arrangements.',action:'contact'},
payment:{en:'Payment methods, including GCash, bank transfer and cash on delivery, have not been confirmed. Verify payment instructions directly with Euro Blend; do not share payment credentials in this chat.',fil:'Hindi pa kumpirmado ang payment methods gaya ng GCash, bank transfer at COD. Kumpirmahin ang payment instructions sa Euro Blend; huwag magbigay ng payment credentials sa chat.',action:'contact'},
trade:{en:'Euro Blend welcomes enquiries from cafés, hotels, restaurants, retailers and prospective resellers or distributors. Share your business type, desired variants, estimated quantity and location. Minimum orders, pricing, territories and supply terms require confirmation.',fil:'Tumatanggap ang Euro Blend ng enquiries mula sa café, hotel, restaurant, retailer, reseller at distributor. Ibigay ang business type, variants, tantiyang quantity at location. Kailangan pang kumpirmahin ang minimum order, pricing, territory at supply terms.',action:'trade'},
safety:{en:'FDA registration, shelf life, storage requirements and other certifications have not been confirmed in our published information. Request the current product label and relevant documentation from the team.',fil:'Hindi pa kumpirmado sa published information ang FDA registration, shelf life, storage requirements at certifications. Humingi ng kasalukuyang product label at dokumentasyon sa team.',action:'contact'},
contact:{en:'Contact Euro Blend through its official Facebook page for a human representative. The website lists Parañaque, Metro Manila, Philippines. Business hours and exact pickup arrangements are not confirmed.',fil:'Makipag-ugnayan sa official Facebook page ng Euro Blend para sa human representative. Nasa website ang Parañaque, Metro Manila, Philippines. Hindi pa kumpirmado ang business hours at pickup arrangements.',action:'contact'},
brand:{en:'Euro Blend presents a Filipino ube beverage collection of eight variants. Explore the range and enquire directly with the team for current product information.',fil:'Ang Euro Blend ay may koleksiyon ng walong Filipino ube beverage variants. Tingnan ang collection at magtanong sa team para sa kasalukuyang product information.',action:'collection'},
unknown:{en:'I can help with Euro Blend products, preparation, orders and business enquiries. I do not have a confirmed answer to that specific question. Our team can assist you directly.',fil:'Makakatulong ako sa Euro Blend products, preparation, orders at business enquiries. Wala akong kumpirmadong sagot sa partikular na tanong na iyon. Makakatulong ang team nang direkta.',action:null}
};
const rules=[
['identity',/\b(are you (?:a )?(?:bot|ai|robot|human)|who are you|totoong tao|bot ka ba)\b/i],
['allergens',/\b(allerg\w*|dairy|lactose|caffeine|decaf|diabet\w*|sugar.free|sugar|vegan|halal|pregnan\w*|gluten|gatas|buntis|bawal|asukal|kape ba)\b/i],
['safety',/\b(fda|registered|certif\w*|shelf.life|expir\w*|storage|safe|expiration|panis)\b/i],
['nutrition',/\b(calorie\w*|nutrition\w*|protein|carbs|serving size|calory)\b/i],
['ingredients',/\b(ingredient\w*|real ube|actual ube|contains|contain|made of|sangkap|totoong ube|may kape|formulation)\b/i],
['trade',/\b(resell\w*|distribut\w*|wholesale|business|bulk|hotel|restaurant|retail\w*|minimum order|franchise|cafe supply|supplier|negosyo|pakyawan)\b/i],
['price',/\b(price\w*|cost|how much|magkano|presyo|quotation|quote|pricing)\b/i],
['delivery',/\b(deliver\w*|ship\w*|courier|pickup|pick up|nationwide|export\w*|overseas|shipping fee|padala)\b/i],
['payment',/\b(pay\w*|gcash|maya|cod|bank transfer|cash on delivery|bayad)\b/i],
['prepare',/\b(prepar\w*|recipe|mix\w*|how to make|hot|iced|ice|water|timpla\w*|tubig|mainit|malamig)\b/i],
['pack',/\b(packag\w*|sachet\w*|grams?|weight|box|carton|ilang piraso)\b/i],
['order',/\b(order\w*|buy|purchase|stock|available|availability|bili\w*|saan mabibili|where to buy|meron ba)\b/i],
['taste',/\b(sweet\w*|cream\w*|strong\w*|intensity|taste|tamis|matamis|mapait|lasa)\b/i],
['milk',/\b(light lavender|ube milk)\b/i],
['recommend',/\b(recommend\w*|suggest\w*|best|try|choose|favorite|masarap|alin|ano mas)\b/i],
['catalog',/\b(variant\w*|flavou?r\w*|collection|lineup|walo|ilang flavor|menu|ube latte|ube classic|ube vanilla|ube salted caramel|ube macchiato|ube criollo)\b/i],
['contact',/\b(contact|representative|human|agent|phone|facebook|messenger|hours|address|location|kausap|tawag)\b/i],
['brand',/\b(euro\s?blend|what is|ano ang|about)\b/i]
];
const aliases=[
['Ube Criollo Salted Caramel',/\b(?:ube\s+)?criollo\s+(?:with\s+)?salted caramel\b/i],
['Ube Milk',/\b(?:light lavender|ube milk)\b/i],
['Ube Macchiato',/\b(?:ube\s+)?macchiato\b/i],
['Ube Salted Caramel',/\b(?:ube\s+)?salted caramel\b/i],
['Ube Vanilla',/\b(?:ube\s+)?vanilla\b/i],
['Ube Classic',/\b(?:ube\s+)?classic\b/i],
['Ube Latte',/\b(?:ube\s+)?latte\b/i],
['Ube Criollo',/\b(?:ube\s+)?criollo\b/i]
];
function productIn(message){return aliases.find(([,re])=>re.test(message))?.[0]||null}
function classify(message){const q=String(message||'').trim().slice(0,600);if(/^(?:hi|hello|hey|good (?:morning|afternoon|evening)|kumusta|kamusta|magandang (?:umaga|hapon|gabi))(?: there| po)?[!.?\s]*$/i.test(q))return ['greeting'];if(/^(?:thanks|thank you|salamat|maraming salamat)(?: po| so much)?[!.?\s]*$/i.test(q))return ['thanks'];if(/^(?:yes|no|sure|okay|ok|opo|oo|sige|hindi)[!.?\s]*$/i.test(q))return ['clarify'];const ids=rules.filter(([,re])=>re.test(q)).map(([id])=>id);return ids.length?ids.slice(0,2):['unknown']}
function language(value){return value==='fil'?'fil':'en'}
function inferLanguage(message,preferred){if(preferred==='fil')return 'fil';return /\b(?:magkano|presyo|paano|saan|ano|alin|gusto|meron|mayroon|salamat|po|opo|kumusta|kamusta|timpla\w*|bibili|mabibili)\b/i.test(message)?'fil':'en'}
function contextOf(value){
 const ctx={product:products.includes(value?.product)?value.product:null,topic:Object.prototype.hasOwnProperty.call(entries,value?.topic)?value.topic:null};
 if(['personal','business'].includes(value?.goal))ctx.goal=value.goal;
 if(Number.isSafeInteger(value?.quantity)&&value.quantity>=1&&value.quantity<=10000)ctx.quantity=value.quantity;
 if(['vanilla','salted caramel','classic ube','café-inspired'].includes(value?.preference))ctx.preference=value.preference;
 return ctx;
}
function answer(ids,lang){lang=language(lang);const safe=[...new Set(Array.isArray(ids)?ids.filter(id=>Object.prototype.hasOwnProperty.call(entries,id)):[])].slice(0,2);if(!safe.length)safe.push('unknown');return {reply:safe.map(id=>entries[id][lang]).join('\n\n'),actions:[...new Set(safe.map(id=>entries[id].action).filter(Boolean))],topics:safe}}
function respond(message,preferred,previous={},selected){
 const q=String(message||'').trim().slice(0,600),lang=inferLanguage(q,preferred),fil=lang==='fil',prior=contextOf(previous),named=productIn(q),product=named||prior.product;
 const local=classify(q);let topics=selected||local;
 const next={...prior,product};
 if(/\b(?:for (?:myself|me|my family)|personal use|sarili ko|para sa akin)\b/i.test(q))next.goal='personal';
 if(/\b(?:my (?:cafe|café|shop|hotel|restaurant|business)|resell\w*|distribut\w*|wholesale|negosyo)\b/i.test(q))next.goal='business';
 const quantity=q.match(/\b([1-9]\d{0,3})\s*(?:boxes|box|cartons|kahon)\b/i);
 if(quantity)next.quantity=Number(quantity[1]);
 if(/\b(?:like|love|prefer|gusto|type)\b/i.test(q)&&named){
  const p=named==='Ube Vanilla'?'vanilla':named==='Ube Salted Caramel'||named==='Ube Criollo Salted Caramel'?'salted caramel':named==='Ube Classic'?'classic ube':named==='Ube Macchiato'||named==='Ube Criollo'?'café-inspired':null;
  if(p)next.preference=p;
 }
 if(!selected&&next.goal==='personal'&&next.goal!==prior.goal&&local.every(x=>['unknown','brand'].includes(x)))topics=['recommend'];
 if(!selected&&next.goal==='business'&&next.goal!==prior.goal&&local.every(x=>['unknown','brand','trade'].includes(x)))topics=['trade'];
 if(!selected&&next.preference&&next.preference!==prior.preference&&local.every(x=>['unknown','catalog','brand','recommend'].includes(x)))topics=['recommend'];
 if(quantity&&['price','order','trade'].includes(prior.topic)&&local.every(x=>['unknown','pack','brand'].includes(x)))topics=[prior.topic];
 // Social turns should never be routed to brand copy or an irrelevant sales link.
 if(['greeting','thanks','identity'].includes(local[0]))topics=local;
 if(topics[0]==='unknown'&&named)topics=[prior.topic==='recommend'?'recommend':'catalog'];
 if(named&&prior.topic==='recommend'&&topics.every(x=>['catalog','milk','unknown','brand'].includes(x)))topics=['recommend'];
 if(topics[0]==='unknown'&&/^(?:what about|how about|and|paano naman|eh|ito|iyon|that one)\b/i.test(q)&&prior.topic)topics=[prior.topic];
 if(named&&prior.topic&&['price','order','prepare','delivery','pack','ingredients','allergens','nutrition','taste'].includes(prior.topic)&&topics.every(x=>['catalog','milk','unknown','brand'].includes(x))&&!/\b(what is|ano ang|variants|flavou?rs|list|collection|menu)\b/i.test(q))topics=[prior.topic];
 // Avoid mixing broad product-name matches with the specific customer question.
 if(topics.length>1&&topics.some(x=>!['catalog','brand','milk'].includes(x)))topics=topics.filter(x=>!['catalog','brand','milk'].includes(x));
 const result=answer(topics,lang);let reply=result.reply;
 const topic=result.topics[0];
 if(topic==='price')reply=fil?(product?'Para sa '+product+', wala pa akong kumpirmadong presyo. ':'Wala pa akong kumpirmadong price list. ')+'Ilang box ang kailangan mo? Makakahingi ka ng quotation sa team.':(product?'I don’t have a confirmed price for '+product+' yet. ':'I don’t have the current price list yet. ')+'How many boxes are you looking for? Our team can confirm a quotation.';
 if(topic==='recommend'){
  if(/\b(vanilla|salted caramel|macchiato|criollo|latte|ube milk|classic|light lavender)\b/i.test(q)&&named)reply=fil?'Kung '+named+' ang gusto mong subukan, magandang simulan sa variant na iyon. Gusto mo bang malaman kung paano ito i-order?':'If '+named+' is the flavor direction you like, that’s a good place to start. Would you like help ordering it?';
  else reply=fil?'Anong flavor ang mas type mo — classic ube, vanilla, salted caramel, o café-inspired? Tutulungan kitang maghanap sa collection.':'What kind of flavor do you usually enjoy — classic ube, vanilla, salted caramel, or something café-inspired? I can help narrow it down.';
 }
 if(topic==='price'&&next.quantity)reply=fil?'Noted, '+next.quantity+' box'+(product?' ng '+product:'')+'. Wala pa akong confirmed na presyo. Maaari mong ipadala ang quantity na ito sa team para sa quotation.':'Got it — '+next.quantity+' boxes'+(product?' of '+product:'')+'. I don’t have confirmed pricing yet, but you can send those details to our team for a quotation.';
 if(topic==='trade'&&next.goal==='business')reply=fil?'Sige, matutulungan kitang maghanda ng business enquiry. '+(next.quantity?'Noted ang '+next.quantity+' boxes. ':'')+'Anong klaseng business ang meron ka, at saang lugar?':'I can help you prepare a business enquiry. '+(next.quantity?'I’ve noted the '+next.quantity+' boxes. ':'')+'What kind of business do you run, and where is it located?';
 if(topic==='unknown')reply=fil?'Gusto kong makatulong. Maaari mo bang sabihin kung anong variant o detalye ang tinutukoy mo?':'I’d like to help. Could you tell me a little more about what you’re looking for?';
 if(topic==='catalog'&&named&&!/\b(variants|flavou?rs|list|collection|menu|walo)\b/i.test(q))reply=fil?named+' ay bahagi ng walong variants ng Euroblend. Ano ang gusto mong malaman tungkol dito — presyo, flavor, o paano bumili?':named+' is part of Euroblend’s eight-variant collection. What would you like to know about it — price, flavor, or how to order?';
 if(result.topics.length>1&&reply!==result.reply)reply+='\n\n'+entries[result.topics[1]][lang];
 return {...result,reply,language:lang,context:{...next,topic:['greeting','thanks','identity','unknown','clarify'].includes(topic)?prior.topic:topic}};
}
return {products,entries,classify,answer,language,inferLanguage,contextOf,respond};
});