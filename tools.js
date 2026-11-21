(function(){
var en=document.documentElement.lang==='en',app=document.getElementById('pl-app');if(!app)return;
var L=en?{t:'Instalment planner',p:'Plan your payments: 30% advance to confirm, the rest in equal monthly instalments, fully paid 15 days before departure.',pp:'Package price per person (PKR)',n:'Number of travellers',d:'Departure date',go:'Show my plan',adv:'Advance today (30%)',inst:'Instalment',due:'by',tot:'Total',bad:'Enter a price and a departure date at least 20 days away.',note:'This is a planning aid only. Final amounts are on your booking receipt.'}
:{t:'قسطوں کا منصوبہ',p:'اپنی ادائیگی کا حساب لگائیں: تصدیق کے لیے 30 فیصد ایڈوانس، باقی برابر ماہانہ قسطوں میں، اور روانگی سے 15 دن پہلے مکمل ادائیگی۔',pp:'پیکج کی قیمت فی کس (روپے)',n:'مسافروں کی تعداد',d:'روانگی کی تاریخ',go:'میرا منصوبہ دکھائیں',adv:'آج ایڈوانس (30 فیصد)',inst:'قسط',due:'تک',tot:'کل',bad:'قیمت اور کم از کم 20 دن بعد کی روانگی کی تاریخ لکھیں۔',note:'یہ صرف منصوبہ بندی کے لیے ہے۔ حتمی رقم آپ کی بکنگ رسید پر ہوگی۔'};
app.innerHTML='<h2>'+L.t+'</h2><p>'+L.p+'</p><div class="pl-g"><label>'+L.pp+'<input id="pl-p" type="number" min="0" dir="ltr" placeholder="350000"></label><label>'+L.n+'<input id="pl-n" type="number" min="1" value="1" dir="ltr"></label><label>'+L.d+'<input id="pl-d" type="date" dir="ltr"></label></div><button type="button" class="pp-b go" id="pl-go">'+L.go+'</button><div id="pl-o"></div><p class="pp-n">'+L.note+'</p>';
var fm=function(x){return Math.round(x).toLocaleString('en-US');},fd=function(d){return d.toLocaleDateString(en?'en-GB':'ur-PK',{day:'numeric',month:'short',year:'numeric'});};
document.getElementById('pl-go').onclick=function(){
  var p=+document.getElementById('pl-p').value,n=+document.getElementById('pl-n').value||1,dv=document.getElementById('pl-d').value,o=document.getElementById('pl-o');
  var dep=dv?new Date(dv+'T00:00:00'):null,now=new Date();
  if(!p||!dep||(dep-now)/864e5<20){o.innerHTML='<div class="pp-m err">'+L.bad+'</div>';return;}
  var total=p*n,adv=total*.3,rest=total-adv,last=new Date(dep.getTime()-15*864e5),k=Math.max(1,Math.min(10,Math.floor((last-now)/(30*864e5))));
  var rows='<tr><td>'+L.adv+'</td><td dir="ltr">PKR '+fm(adv)+'</td></tr>';
  for(var i=1;i<=k;i++){var dd=new Date(now.getTime()+(last-now)*i/k);rows+='<tr><td>'+L.inst+' '+i+' ('+L.due+' '+fd(dd)+')</td><td dir="ltr">PKR '+fm(rest/k)+'</td></tr>';}
  rows+='<tr class="t"><td>'+L.tot+'</td><td dir="ltr">PKR '+fm(total)+'</td></tr>';
  o.innerHTML='<table class="pl-t">'+rows+'</table>';
};
})();
