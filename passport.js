(function(root){
var Wt=[7,3,1];
function cd(s){var t=0;for(var i=0;i<s.length;i++){var c=s[i],v=c==='<'?0:(c>='0'&&c<='9'?+c:c.charCodeAt(0)-55);t+=v*Wt[i%3];}return t%10;}
var N2={O:'0',Q:'0',D:'0',I:'1',L:'1',B:'8',S:'5',Z:'2',G:'6',T:'7'},A2={'0':'O','1':'I','8':'B','5':'S','2':'Z','6':'G'};
function num(s){return s.replace(/[A-Z]/g,function(c){return N2[c]||c;});}
function alp(s){return s.replace(/[0-9]/g,function(c){return A2[c]||c;});}
function clean(s){return (s||'').toUpperCase().replace(/[^A-Z0-9<]/g,'');}
function fit(s){s=clean(s);return s.length>=44?s.slice(0,44):s+new Array(45-s.length).join('<');}
function date(s,dob){
  if(!/^\d{6}$/.test(s))return '';
  var yy=+s.slice(0,2),mm=s.slice(2,4),dd=s.slice(4,6),cy=new Date().getFullYear()%100,y;
  y=dob?(yy>cy?1900+yy:2000+yy):2000+yy;
  if(+mm<1||+mm>12||+dd<1||+dd>31)return '';
  return y+'-'+mm+'-'+dd;
}
function parseMRZ(a,b){
  var l1=fit(a),l2=fit(b);
  var iss=alp(l1.slice(2,5)).replace(/</g,''),rest=l1.slice(5).replace(/[<KCELSX]{4,}$/,'');
  var parts=rest.split('<<');
  var sur=alp(parts[0]).replace(/</g,' ').trim(),giv=alp(parts.slice(1).join(' ')).replace(/</g,' ').replace(/\s+/g,' ').trim();
  var docno=l2.slice(0,9),c1=num(l2[9]),nat=alp(l2.slice(10,13)).replace(/</g,''),dob=num(l2.slice(13,19)),c2=num(l2[19]),sex=alp(l2[20]),
      exp=num(l2.slice(21,27)),c3=num(l2[27]),pers=l2.slice(28,42),c4=num(l2[42]),c5=num(l2[43]);
  var ok={
    doc:String(cd(docno))===c1,
    dob:String(cd(dob))===c2,
    exp:String(cd(exp))===c3,
    personal:/^<*$/.test(pers)?(c4==='<'||c4==='0'):String(cd(pers))===c4,
    final:String(cd(l2.slice(0,10)+l2.slice(13,20)+l2.slice(21,43)))===c5
  };
  var score=0;for(var k in ok)if(ok[k])score++;
  return {surname:sur,given:giv,issuer:iss,nat:nat,docno:docno.replace(/</g,''),dob:date(dob,true),exp:date(exp,false),sex:sex==='M'||sex==='F'?sex:'X',personal:pers.replace(/</g,''),checks:ok,score:score};
}
function findMRZ(text){
  var ls=(text||'').split(/\n/).map(clean).filter(function(l){return l.length>=36;});
  for(var i=ls.length-2;i>=0;i--){if(ls[i][0]==='P'&&ls[i].indexOf('<')>-1){return [ls[i],ls[i+1]];}}
  return ls.length>=2?[ls[ls.length-2],ls[ls.length-1]]:null;
}
var api={parseMRZ:parseMRZ,findMRZ:findMRZ,checkDigit:cd};
if(typeof module!=='undefined'&&module.exports){module.exports=api;}
root.PassportMRZ=api;
if(typeof document==='undefined')return;

var en=document.documentElement.lang==='en';
var L=en?{
 title:'Scan your passport',lead:'Take a clear photo of the photo page of your passport. The two lines of letters at the bottom are read on your device and the form below fills itself. Your photo never leaves your phone or computer.',
 pick:'Choose passport photo',cam:'Use camera',rot:'Rotate',scan:'Read passport',busy:'Reading... first time may take a minute',
 hint:'Tips: good light, no glare, whole bottom of the page in view, hold the phone flat.',
 fail:'Could not read the two bottom lines. Retake the photo (flat, in light, bottom lines sharp) or type the details yourself.',
 ok:'Passport read. Please check every field against your passport before saving.',part:'Read with some doubt: marked fields may be wrong. Please check them against the passport.',
 f:{surname:'Surname',given:'Given names',sex:'Sex',nat:'Nationality (code)',dob:'Date of birth',docno:'Passport number',issuer:'Issuing country (code)',exp:'Date of expiry',personal:'Personal number (optional)',cnic:'CNIC / national ID',pob:'Place of birth',father:'Father or husband name',phone:'Phone / WhatsApp',kind:'Traveller'},
 kinds:['Adult','Child (under 12)','Infant (under 2)'],
 dobl:'Your passport reader checks digits built into the passport. Green tick means the digits matched.',
 save:'Add to travellers list',list:'Travellers on this device',none:'No one added yet.',del:'Remove',csv:'Download CSV',json:'Download JSON',clr:'Clear all',
 send:'Send these details to Al Multazam for visa processing',consent:'I agree that these details are sent to Al Multazam Travels only to prepare my visa and booking. I understand the passport photo is not sent.',
 sent:'Sent. JazakAllah khair, we will contact you.',senderr:'Could not send. Download the CSV and WhatsApp it to us, or try again later.',needc:'Please tick the consent box first.',
 exp0:'This passport has expired.',exp6:'Less than 6 months validity left. Saudi Arabia normally needs at least 6 months from the travel date.',expok:'Passport validity looks fine for travel.',
 priv:'Privacy: scanning runs inside your browser. Details are kept only on this device (local storage) until you press Send. Do not use this on a shared computer, and press Clear all when done.',
 chk:'Documents usually needed for the visa',
 docs:['Passport with at least 6 months validity and 2 blank pages','Recent passport-size photo, white background','CNIC copy (B-form for children)','Meningitis (ACWY) vaccination certificate','Marriage certificate if a couple or a woman travelling with husband','Our booking form and payment receipt'],
 docn:'Rules change from time to time. We confirm the current list when you book. See also Travel Requirements.',
 ldg:'Loading reader...',ocrerr:'The reader could not be loaded. Check your internet connection and try again.'
}:{
 title:'اپنا پاسپورٹ سکین کریں',lead:'پاسپورٹ کے تصویری صفحے کی صاف تصویر لیں۔ نیچے حروف کی دو سطریں آپ کے اپنے فون یا کمپیوٹر پر پڑھی جاتی ہیں اور نیچے کا فارم خود بھر جاتا ہے۔ آپ کی تصویر کہیں اپ لوڈ نہیں ہوتی۔',
 pick:'پاسپورٹ کی تصویر چنیں',cam:'کیمرہ استعمال کریں',rot:'گھمائیں',scan:'پاسپورٹ پڑھیں',busy:'پڑھا جا رہا ہے... پہلی بار ایک منٹ لگ سکتا ہے',
 hint:'مشورہ: اچھی روشنی، چمک نہ ہو، صفحے کا پورا نچلا حصہ نظر آئے، فون سیدھا رکھیں۔',
 fail:'نیچے کی دو سطریں پڑھی نہ جا سکیں۔ دوبارہ تصویر لیں (سیدھی، روشنی میں، سطریں صاف) یا تفصیل خود لکھیں۔',
 ok:'پاسپورٹ پڑھ لیا گیا۔ محفوظ کرنے سے پہلے ہر خانہ پاسپورٹ سے ملا لیں۔',part:'کچھ شک کے ساتھ پڑھا گیا: نشان زدہ خانے غلط ہو سکتے ہیں۔ انہیں پاسپورٹ سے ملا لیں۔',
 f:{surname:'خاندانی نام (Surname)',given:'دیا گیا نام (Given names)',sex:'جنس',nat:'قومیت (کوڈ)',dob:'تاریخِ پیدائش',docno:'پاسپورٹ نمبر',issuer:'جاری کرنے والا ملک (کوڈ)',exp:'تاریخِ اختتام',personal:'ذاتی نمبر (اختیاری)',cnic:'شناختی کارڈ نمبر',pob:'جائے پیدائش',father:'والد یا شوہر کا نام',phone:'فون / واٹس ایپ',kind:'مسافر'},
 kinds:['بالغ','بچہ (12 سال سے کم)','شیر خوار (2 سال سے کم)'],
 dobl:'پاسپورٹ ریڈر پاسپورٹ میں موجود تصدیقی ہندسے جانچتا ہے۔ سبز نشان کا مطلب ہے ہندسے درست نکلے۔',
 save:'مسافروں کی فہرست میں شامل کریں',list:'اس ڈیوائس پر مسافر',none:'ابھی کوئی شامل نہیں۔',del:'ہٹائیں',csv:'CSV ڈاؤن لوڈ',json:'JSON ڈاؤن لوڈ',clr:'سب مٹا دیں',
 send:'یہ تفصیل ویزا کارروائی کے لیے الملتزم کو بھیجیں',consent:'میں اجازت دیتا/دیتی ہوں کہ یہ تفصیل صرف میرے ویزے اور بکنگ کی تیاری کے لیے الملتزم ٹریولز کو بھیجی جائے۔ مجھے معلوم ہے کہ پاسپورٹ کی تصویر نہیں بھیجی جاتی۔',
 sent:'بھیج دی گئی۔ جزاک اللہ خیر، ہم رابطہ کریں گے۔',senderr:'بھیجی نہ جا سکی۔ CSV ڈاؤن لوڈ کر کے ہمیں واٹس ایپ کریں یا بعد میں دوبارہ کوشش کریں۔',needc:'پہلے اجازت کا خانہ منتخب کریں۔',
 exp0:'اس پاسپورٹ کی مدت ختم ہو چکی ہے۔',exp6:'6 ماہ سے کم میعاد باقی ہے۔ سعودی عرب عموماً سفر کی تاریخ سے کم از کم 6 ماہ کی میعاد مانگتا ہے۔',expok:'پاسپورٹ کی میعاد سفر کے لیے ٹھیک لگتی ہے۔',
 priv:'رازداری: سکین آپ کے براؤزر کے اندر ہوتا ہے۔ تفصیل بھیجنے تک صرف اسی ڈیوائس پر (لوکل سٹوریج میں) رہتی ہے۔ مشترک کمپیوٹر پر استعمال نہ کریں اور کام کے بعد "سب مٹا دیں" دبائیں۔',
 chk:'ویزے کے لیے عموماً درکار دستاویزات',
 docs:['کم از کم 6 ماہ میعاد اور 2 خالی صفحات والا پاسپورٹ','حالیہ پاسپورٹ سائز تصویر، سفید پس منظر','شناختی کارڈ کی کاپی (بچوں کے لیے ب فارم)','میننجائٹس (ACWY) ویکسین سرٹیفکیٹ','جوڑے یا شوہر کے ساتھ سفر کرنے والی خاتون کے لیے نکاح نامہ','ہمارا بکنگ فارم اور ادائیگی کی رسید'],
 docn:'قواعد وقتاً فوقتاً بدلتے ہیں۔ بکنگ پر ہم موجودہ فہرست کی تصدیق کرتے ہیں۔ سفری تقاضے کا صفحہ بھی دیکھیں۔',
 ldg:'ریڈر لوڈ ہو رہا ہے...',ocrerr:'ریڈر لوڈ نہ ہو سکا۔ انٹرنیٹ دیکھیں اور دوبارہ کوشش کریں۔'
};
var URL_='https://script.google.com/macros/s/AKfycbyJO5G5UHuQ0lpw-Jk_i_GxWhV1yKoJh1k0OIeuQAEHZPbttLUX0rDZ8wb8Y-MbZk0/exec';
var KEY='amtTravelers';
var app=document.getElementById('pp-app');if(!app)return;
function $(s){return app.querySelector(s);}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
var FIELDS=['surname','given','sex','nat','dob','docno','issuer','exp','personal','cnic','pob','father','phone','kind'];
function inp(k){
  var t=(k==='dob'||k==='exp')?'date':(k==='phone'?'tel':'text');
  if(k==='sex')return '<select name="sex"><option value="M">M</option><option value="F">F</option><option value="X">X</option></select>';
  if(k==='kind')return '<select name="kind">'+L.kinds.map(function(x,i){return '<option value="'+['Adult','Child','Infant'][i]+'">'+x+'</option>';}).join('')+'</select>';
  return '<input name="'+k+'" type="'+t+'" dir="ltr" autocomplete="off">';
}
app.innerHTML='<h2>'+L.title+'</h2><p>'+L.lead+'</p>'+
'<div class="pp-up"><input type="file" id="pp-f" accept="image/*" hidden><input type="file" id="pp-c" accept="image/*" capture="environment" hidden>'+
'<button type="button" class="pp-b" id="pp-pick">'+L.pick+'</button><button type="button" class="pp-b alt" id="pp-cam">'+L.cam+'</button><button type="button" class="pp-b alt" id="pp-rot" disabled>'+L.rot+'</button></div>'+
'<p class="pp-n">'+L.hint+'</p><canvas id="pp-cv" hidden></canvas>'+
'<button type="button" class="pp-b go" id="pp-go" disabled>'+L.scan+'</button><div class="pp-bar" id="pp-bar" hidden><i></i></div><div class="pp-m" id="pp-m"></div>'+
'<form id="pp-form" class="pp-form">'+FIELDS.map(function(k){return '<label class="pp-fl"><span>'+L.f[k]+' <b class="pp-ck" data-k="'+k+'"></b></span>'+inp(k)+'</label>';}).join('')+'</form>'+
'<div class="pp-m" id="pp-exp"></div><p class="pp-n">'+L.dobl+'</p>'+
'<div class="pp-row"><button type="button" class="pp-b" id="pp-add">'+L.save+'</button></div>'+
'<h3>'+L.list+'</h3><div id="pp-list"></div>'+
'<div class="pp-row" id="pp-ex" hidden><button type="button" class="pp-b alt" id="pp-csv">'+L.csv+'</button><button type="button" class="pp-b alt" id="pp-json">'+L.json+'</button><button type="button" class="pp-b alt" id="pp-clr">'+L.clr+'</button></div>'+
'<div class="pp-send" id="pp-sendbox" hidden><label class="pp-c"><input type="checkbox" id="pp-cons"> <span>'+L.consent+'</span></label><button type="button" class="pp-b go" id="pp-send">'+L.send+'</button><div class="pp-m" id="pp-sm"></div></div>'+
'<h3>'+L.chk+'</h3><ul class="pp-docs">'+L.docs.map(function(d){return '<li>'+d+'</li>';}).join('')+'</ul><p class="pp-n">'+L.docn+'</p><p class="pp-n pp-priv">'+L.priv+'</p>';

var img=null,rot=0,form=$('#pp-form');
function msg(t,c){var m=$('#pp-m');m.className='pp-m '+(c||'');m.textContent=t||'';}
function setImg(f){
  if(!f)return;
  var show=function(b){img=b;rot=0;draw();$('#pp-go').disabled=false;$('#pp-rot').disabled=false;msg('');};
  if(window.createImageBitmap){createImageBitmap(f,{imageOrientation:'from-image'}).then(show).catch(function(){leg(f,show);});}else leg(f,show);
}
function leg(f,cb){var i=new Image();i.onload=function(){cb(i);};i.src=URL.createObjectURL(f);}
function canvasOf(max){
  var r=rot%2===1,w=img.width,h=img.height,s=Math.min(1,max/Math.max(w,h)),c=document.createElement('canvas');
  c.width=Math.round((r?h:w)*s);c.height=Math.round((r?w:h)*s);var x=c.getContext('2d');
  x.translate(c.width/2,c.height/2);x.rotate(rot*Math.PI/2);x.scale(s,s);x.drawImage(img,-w/2,-h/2);return c;
}
function draw(){var v=$('#pp-cv'),c=canvasOf(900);v.width=c.width;v.height=c.height;v.getContext('2d').drawImage(c,0,0);v.hidden=false;}
function prep(src,frac){
  var sy=Math.round(src.height*(1-frac)),h=src.height-sy,sc=Math.min(2,2200/src.width),c=document.createElement('canvas');
  c.width=Math.round(src.width*sc);c.height=Math.round(h*sc);var x=c.getContext('2d');x.drawImage(src,0,sy,src.width,h,0,0,c.width,c.height);
  var d=x.getImageData(0,0,c.width,c.height),p=d.data,lo=255,hi=0,i,g;
  for(i=0;i<p.length;i+=4){g=.3*p[i]+.59*p[i+1]+.11*p[i+2];p[i]=g;if(g<lo)lo=g;if(g>hi)hi=g;}
  var k=255/Math.max(30,hi-lo);
  for(i=0;i<p.length;i+=4){g=Math.max(0,Math.min(255,(p[i]-lo)*k));p[i]=p[i+1]=p[i+2]=g;}
  x.putImageData(d,0,0);return c;
}
var worker=null;
function loadT(){
  return new Promise(function(ok,no){
    if(window.Tesseract)return ok();
    var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';s.onload=ok;s.onerror=no;document.head.appendChild(s);
  });
}
function getWorker(){
  if(worker)return worker;
  worker=loadT().then(function(){return window.Tesseract.createWorker('eng',1,{logger:function(m){if(m.status==='recognizing text'){var b=$('#pp-bar i');b.style.width=Math.round(m.progress*100)+'%';}}});})
  .then(function(w){return w.setParameters({tessedit_char_whitelist:'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<',tessedit_pageseg_mode:'6',preserve_interword_spaces:'0'}).then(function(){return w;});});
  worker.catch(function(){worker=null;});return worker;
}
function setVals(r){
  FIELDS.forEach(function(k){var e=form.elements[k];if(e&&r[k]!=null&&k!=='kind')e.value=r[k];});
  var map={docno:r.checks.doc,dob:r.checks.dob,exp:r.checks.exp,personal:r.checks.personal};
  app.querySelectorAll('.pp-ck').forEach(function(b){var k=b.dataset.k;if(k in map){b.textContent=map[k]?'✓':'?';b.className='pp-ck '+(map[k]?'y':'n');}else b.textContent='';});
  expiry();
}
function expiry(){
  var v=form.elements.exp.value,m=$('#pp-exp');if(!v){m.textContent='';m.className='pp-m';return;}
  var d=new Date(v),n=new Date(),mo=(d-n)/2629800000;
  if(mo<0){m.textContent=L.exp0;m.className='pp-m err';}else if(mo<6){m.textContent=L.exp6;m.className='pp-m warn';}else{m.textContent=L.expok;m.className='pp-m ok';}
}
form.elements.exp.addEventListener('change',expiry);
async function scan(){
  if(!img)return;
  var b=$('#pp-go'),bar=$('#pp-bar');b.disabled=true;bar.hidden=false;$('#pp-bar i').style.width='0';msg(L.ldg);
  try{
    var w=await getWorker(),src=canvasOf(2400),best=null;msg(L.busy);
    for(var f of [.28,.4,.55]){
      var res=await w.recognize(prep(src,f)),m=findMRZ(res.data.text);
      if(!m)continue;var r=parseMRZ(m[0],m[1]);
      if(!best||r.score>best.score)best=r;
      if(r.score>=4)break;
    }
    if(!best||(best.score<2&&!best.docno)){msg(L.fail,'err');}
    else{setVals(best);msg(best.score>=4?L.ok:L.part,best.score>=4?'ok':'warn');}
  }catch(e){msg(typeof e==='object'&&e&&e.message&&worker?L.fail:L.ocrerr,'err');}
  b.disabled=false;bar.hidden=true;
}
$('#pp-pick').onclick=function(){$('#pp-f').click();};
$('#pp-cam').onclick=function(){$('#pp-c').click();};
$('#pp-f').onchange=$('#pp-c').onchange=function(){setImg(this.files[0]);};
$('#pp-rot').onclick=function(){rot=(rot+1)%4;draw();};
$('#pp-go').onclick=scan;

function load(){try{return JSON.parse(localStorage.getItem(KEY)||'[]');}catch(e){return [];}}
function store(a){try{localStorage.setItem(KEY,JSON.stringify(a));}catch(e){}}
function render(){
  var a=load(),el=$('#pp-list');
  el.innerHTML=a.length?a.map(function(t,i){return '<div class="pp-t"><div><b dir="ltr">'+esc(t.surname)+' '+esc(t.given)+'</b><br><small dir="ltr">'+esc(t.docno)+' · '+esc(t.nat)+' · '+esc(t.dob)+' → '+esc(t.exp)+'</small></div><button type="button" class="pp-x" data-i="'+i+'">'+L.del+'</button></div>';}).join(''):'<p class="pp-n">'+L.none+'</p>';
  $('#pp-ex').hidden=!a.length;$('#pp-sendbox').hidden=!a.length;
  el.querySelectorAll('.pp-x').forEach(function(b){b.onclick=function(){var x=load();x.splice(+b.dataset.i,1);store(x);render();};});
}
function cur(){var o={};FIELDS.forEach(function(k){o[k]=form.elements[k].value.trim();});return o;}
$('#pp-add').onclick=function(){
  var o=cur();if(!o.surname&&!o.docno){msg(L.fail,'err');return;}
  var a=load();a.push(o);store(a);render();form.reset();app.querySelectorAll('.pp-ck').forEach(function(b){b.textContent='';});$('#pp-exp').textContent='';$('#pp-exp').className='pp-m';
};
function dl(name,type,text){var b=new Blob([text],{type:type}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){a.remove();URL.revokeObjectURL(a.href);},500);}
$('#pp-csv').onclick=function(){var a=load();dl('travellers.csv','text/csv',[FIELDS.join(',')].concat(a.map(function(t){return FIELDS.map(function(k){return '"'+String(t[k]||'').replace(/"/g,'""')+'"';}).join(',');})).join('\n'));};
$('#pp-json').onclick=function(){dl('travellers.json','application/json',JSON.stringify(load(),null,2));};
$('#pp-clr').onclick=function(){store([]);render();};
$('#pp-send').onclick=function(){
  var sm=$('#pp-sm');if(!$('#pp-cons').checked){sm.className='pp-m err';sm.textContent=L.needc;return;}
  var b=this;b.disabled=true;
  fetch(URL_,{method:'POST',body:JSON.stringify({action:'passport',source:'Website passport scan',travellers:load()})}).then(function(r){return r.json();}).then(function(r){
    if(r.ok){sm.className='pp-m ok';sm.textContent=L.sent;}else{sm.className='pp-m err';sm.textContent=L.senderr;}
  }).catch(function(){sm.className='pp-m err';sm.textContent=L.senderr;}).then(function(){b.disabled=false;});
};
render();
})(typeof window!=='undefined'?window:globalThis);
