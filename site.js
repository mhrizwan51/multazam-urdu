(function(){
var en=document.documentElement.lang==='en';
var EL={'index':'Home','umrah-packages':'Umrah Packages','hajj-2027':'Hajj 2027','track-booking':'Track Booking','reviews':'Reviews','terms':'Payments and Terms','services':'Services','umrah-guide':'Umrah Guide','hajj-guide':'Hajj Guide','travel-requirements':'Travel Requirements','faqs':'FAQs','gallery':'Gallery','about-us':'About Us','contact':'Contact','passport':'Passport Scan','login':'Login'};
var NAV=[['index','ہوم','home'],['umrah-packages','عمرہ پیکجز'],['hajj-2027','حج 2027'],['track-booking','میری بکنگ'],['reviews','تبصرے'],['terms','ادائیگی اور شرائط','payments-and-terms'],['services','ہماری خدمات'],['umrah-guide','عمرہ کا طریقہ'],['hajj-guide','حج کا طریقہ'],['travel-requirements','سفری تقاضے'],['faqs','عام سوالات'],['gallery','تصاویر'],['about-us','ہمارا تعارف'],['passport','پاسپورٹ سکین'],['contact','رابطہ'],['login','لاگ اِن']];
// Photos live in images/ (resized, about 100-200 KB each).
var B='https://sites.google.com/u/0/sitesv-images-rt/',W='=w1280';
var PH={
home:['images/haram-night.jpg','images/masjid-nabawi-wide.jpg'],
packages:['images/masjid-quba.jpg'],
services:['images/bus-group.jpg'],
g:['images/haram-night.jpg','images/masjid-nabawi-wide.jpg','images/masjid-nabawi-group.jpg','images/masjid-quba.jpg','images/ziyarat-makkah.jpg','images/bus-group.jpg','images/ihram-group.jpg','images/arafat-six.jpg','images/arafat-three.jpg','images/arafat-crowd.jpg']
};
function src(k,i){var a=PH[k]||[],v=a[i];return !v?'':(/^https?:/.test(v)?v:/^images\//.test(v)?(en?'../':'')+v:B+v+W);}
var cur=(location.pathname.split('/').pop()||'index.html').replace(/\.html$/,'')||'index';
var me=NAV.filter(function(n){return n[0]===cur;})[0]||NAV[0];
var top=document.getElementById('top');
if(top){top.outerHTML='<header class="top"><div class="in"><a class="brand" href="index.html">Al Multazam <span>Travels</span></a><button class="mb" aria-label="Menu" onclick="document.getElementById(\'mn\').classList.toggle(\'open\')">☰</button><nav class="mn" id="mn">'+NAV.map(function(n){return '<a href="'+n[0]+'.html"'+(n[0]===me[0]?' class="on"':'')+'>'+(en?EL[n[0]]:n[1])+'</a>';}).join('')+'</nav><a class="en" href="'+(en?'../'+me[0]+'.html':'en/'+me[0]+'.html')+'">'+(en?'اردو':'English')+'</a></div></header>';}
var ft=document.getElementById('ft');
if(ft){ft.outerHTML='<footer class="ft">'+(en?'Al-Multazam Travels (Pvt) Ltd · 3-L Commercial, DHA Phase 8, Lahore<br>WhatsApp: ':'الملتزم ٹریولز (پرائیویٹ) لمیٹڈ · 3-L کمرشل، ڈی ایچ اے فیز 8، لاہور<br>واٹس ایپ: ')+'<a class="ltr" href="https://wa.me/923001853111">0300 1853111</a> · <a class="ltr" href="mailto:almultazamtravels@gmail.com">almultazamtravels@gmail.com</a> · <a class="ltr" href="https://www.facebook.com/AlMultazamTravels">Facebook</a></footer>';}
document.querySelectorAll('[data-bg]').forEach(function(e){var u=src('g',+e.dataset.bg);if(u)e.style.backgroundImage='url('+u+')';});
document.querySelectorAll('.photos[data-ph]').forEach(function(box){var k=box.dataset.ph,from=+(box.dataset.from||0),n=box.dataset.n?+box.dataset.n:(PH[k]||[]).length-from;for(var i=from;i<from+n;i++){var u=src(k,i);if(!u)continue;var im=new Image();im.loading='lazy';im.alt='Al Multazam Travels';im.onerror=function(){this.remove();};im.src=u;box.appendChild(im);}if(n===1)box.classList.add('one');});
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
document.querySelectorAll('.bn').forEach(function(b){var d=b.dataset,m=d.m||'',u=d.img!=null?src('g',+d.img):'';
b.innerHTML=(u?'<div class="bg" style="background-image:url('+u+')"></div>':'')+'<div class="ov"></div>'+(m==='pattern'?'<div class="ptn"></div>':'')+'<canvas></canvas>'+(m==='sweep'?'<div class="sw"></div>':'')+'<div class="tx"><div class="k">'+d.k+'</div><div class="ln"></div><h2>'+d.h+'</h2><p>'+d.p+'</p></div>';
if(rm||(m!=='dust'&&m!=='stars'))return;
var cv=b.querySelector('canvas'),x=cv.getContext('2d'),Wd,H,P=[];
function rs(){Wd=cv.width=b.clientWidth;H=cv.height=b.clientHeight;}rs();addEventListener('resize',rs);
var n=m==='dust'?50:90;for(var i=0;i<n;i++)P.push({x:Math.random()*Wd,y:Math.random()*H,r:Math.random()*(m==='dust'?2.4:1.4)+.4,v:Math.random()*.4+.15,p:Math.random()*6.28,s:Math.random()*.03+.01});
(function f(){x.clearRect(0,0,Wd,H);P.forEach(function(q){q.p+=q.s;var a=.35+.45*Math.sin(q.p);if(m==='dust'){q.y-=q.v;q.x+=Math.sin(q.p)*.3;if(q.y<-5){q.y=H+5;q.x=Math.random()*Wd;}x.fillStyle='rgba(227,185,90,'+a+')';x.shadowColor='#e3b95a';x.shadowBlur=8;}else{x.fillStyle='rgba(255,255,255,'+a+')';x.shadowBlur=0;}x.beginPath();x.arc(q.x,q.y,q.r,0,6.283);x.fill();});requestAnimationFrame(f);})();
});

var wa='https://wa.me/923001853111',tel='tel:+923001853111';
var bar=document.createElement('div');bar.className='mbar';
bar.innerHTML='<a href="'+tel+'">📞 <span>'+(en?'Call':'کال')+'</span></a><a class="w" href="'+wa+'" target="_blank" rel="noopener">💬 <span>WhatsApp</span></a><a href="'+(en?'':'')+'contact.html">✉️ <span>'+(en?'Quote':'کوٹ')+'</span></a>';
document.body.appendChild(bar);
var fw=document.createElement('a');fw.className='fwa';fw.href=wa;fw.target='_blank';fw.rel='noopener';fw.setAttribute('aria-label','WhatsApp');fw.innerHTML='<span>💬</span>';
document.body.appendChild(fw);
if(cur==='index'){var bn0=document.getElementById('h')||document.querySelector('.bn');if(bn0){var ts=document.createElement('div');ts.className='trust';ts.innerHTML=(en?[['1981','Serving pilgrims since'],['45','Years of experience'],['IATA','Ticketing partner'],['MORA','Approved operator']]:[['1981','سے خدمت میں'],['45','سال کا تجربہ'],['IATA','ٹکٹنگ پارٹنر'],['MORA','منظور شدہ آپریٹر']]).map(function(x){return '<div><b>'+x[0]+'</b><span>'+x[1]+'</span></div>';}).join('');bn0.insertAdjacentElement('afterend',ts);var tl=document.querySelector('.tiles');if(tl)ts.insertAdjacentElement('afterend',tl);}}
var rv=document.querySelectorAll('main .txt,main .wg,main .photos,main .tiles a,main .trust div');
if('IntersectionObserver' in window&&!rm){rv.forEach(function(e){e.classList.add('rv');});var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.08});rv.forEach(function(e){io.observe(e);});}
})();
