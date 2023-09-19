const scriptName="入口落地查询";(async()=>{try{const n=$loon.split(" ");let e=parseInt($persistentStore.read("入口查询超时时间ms")??2e3);let o=parseInt($persistentStore.read("落地查询超时时间ms")??5e3);let r=$environment.params;let s=r.node;let i=r.nodeInfo.address;let l=false,a="",f="",b="";let c=`⟦ 中转 <font style="text-decoration:line-through;">防火墙</font> ⟧`;let p=serverTF(i);if(p==="domain"){const t=await tKey(`http://223.5.5.5/resolve?name=${i}&type=A&short=1`,"",e);if(t?.length>0){console.log("Ali inIp: "+t[0]);i=t[0];p=serverTF(i)}else{console.log("Ali Dns Failed: "+JSON.stringify(t,"",2))}}const g=await tKey("http://ip-api.com/json/?lang=zh-CN",s,o);if(g?.status==="success"){LDTF=true;console.log("LD: "+JSON.stringify(g,"",2));let{country:n,countryCode:e,regionName:o,city:r,query:s,isp:i,as:l,tk:a}=g;var t=s;b=`<b><font>落地国家</font>:</b>\n        <font>${getflag(e)}${n}&nbsp; ${a}ms</font><br><br>\n    \n        <b><font>落地国家</font>:</b>\n        <font>${e} ${o} ${r}</font><br><br>\n        \n        <b><font>落地IP地址</font>:</b>\n        <font>${s}</font><br><br>\n    \n        <b><font>落地ISP</font>:</b>\n        <font>${i}</font><br><br>\n    \n        <b><font>落地ASN</font>:</b>\n        <font>${l}</font><br>`}else{let t="LD: "+JSON.stringify(g);b=`<br>LDFailed 查询超时<br><br>`;console.log(t)}if(i==t){c=`⟦ 直连 防火墙 ⟧`;const t=await tKey("https://api.live.bilibili.com/ip_service/v1/ip_service/get_ip_addr","",e);if(t.code===0){let{addr:n,province:e,city:o,isp:r,country:s}=t.data,i=t.tk;e==o&&(e="");s=="中国"&&(s="🇨🇳中国");r=r.replace(/.*广电.*/g,"广电");f=`<b><font>本机国家</font>:</b>\n        <font>${s}&nbsp; ${i}ms</font><br><br>\n        \n        <b><font>本机入口</font>:</b>\n        <font>${r}</font><br><br>\n      \n        <b><font>本机IP</font>:</b>\n        <font>${n}</font><br><br>\n    \n        <b><font>本机位置</font>:</b>\n        <font>${e} ${o} </font><br><br>`}else{console.log("BIli api Failed: "+JSON.stringify(t,"",2));f=`<br>BIli Api Failed 查询超时<br><br>`}}else{if(p==="v4"){console.log("v4");const t=await tKey(`https://api-v3.speedtest.cn/ip?ip=${i}`,"",e);if(t?.data?.country==="中国"){console.log("SP: "+JSON.stringify(t.data,"",2));let{country:n,city:e,province:o,district:r,countryCode:s,isp:i,ip:l}=t.data,a=t.tk;e==r&&(e="");s!=="CN"&&(c=`⟦ 防火墙 ⟧`);f=`<b><font>入口ISP</font>:</b>\n        <font>${i}</font><br><br>\n      \n        <b><font>入口国家</font>:</b>\n        <font>${getflag(s)}${n}&nbsp; ${a}ms</font><br><br>\n \n        <b><font>入口CNAPI</font>:</b>\n        <font>${l}</font><br><br>\n    \n        <b><font>入口位置</font>:</b>\n        <font>${o} ${e} ${r}</font><br><br>`}else{a="SP Api Failed: "+JSON.stringify(t);f=`<br>SPFailed 查询超时<br><br>`;l=true;console.log(a)}}else{l=true;console.log("v6")}if(l){const t=await tKey(`http://ip-api.com/json/${i}?lang=zh-CN`,"",o);if(t?.status==="success"){console.log("IO: "+JSON.stringify(t,"",2));let{country:n,city:e,regionName:o,countryCode:r,isp:s,query:i}=t,l=t.tk;o==e&&(e="");r!=="CN"&&(c=`⟦ 防火墙 ⟧`);f=`<b><font>入口国家</font>:</b>\n          <font>${getflag(r)}${n}&nbsp; ${l}ms</font><br><br>\n      \n          <b><font>入口ISP</font>:</b>\n          <font>${s}</font><br><br>\n      \n          <b><font>入口IPAPI</font>:</b>\n          <font>${i}</font><br><br>\n      \n          <b><font>入口位置</font>:</b>\n          <font>${o} ${e}</font><br><br>`}else{a="IPApi Failed: "+JSON.stringify(t);f=`<br>INFailed 查询超时<br><br>`;console.log(a)}}}let d=`<p \n    style="text-align: center; \n    font-family: -apple-system; \n    font-size: large; \n    font-weight: thin">\n    <br>-------------------------------<br><br>\n    ${f}\n    -------------------<br>\n    <b><font>${c}</font></b>\n    <br>-------------------<br><br>\n    ${b}\n    <br>-------------------------------<br><br>\n    <b>节点</b>  ➟  ${s} <br>\n    <b>设备</b>  ➟ ${n[1]} ${n[2]}</p>`;$done({title:scriptName,htmlMessage:d})}catch(t){console.log("Errk: "+t.message);$done({title:scriptName,htmlMessage:t.message+"<br><br> 查询失败 反馈@Key"})}finally{$done({title:scriptName,htmlMessage:message})}})();

function serverTF(t){if(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(t)){return"v4"}else if(/^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(t)){return"v6"}else{return"domain"}}
function getflag(t){const n=t.toUpperCase().split("").map((t=>127397+t.charCodeAt()));return String.fromCodePoint(...n).replace(/🇹🇼/g,"🇨🇳")}
async function tKey(t,e,o){let r=1,s=1;const i=new Promise(((i,l)=>{const a=async f=>{try{const r=await Promise.race([new Promise(((n,o)=>{let r=Date.now();$httpClient.get({url:t,node:e},((t,e,s)=>{if(t){o(t)}else{let t=Date.now()-r;let o=e.status;switch(o){case 200:let o=e.headers["Content-Type"];switch(true){case o.includes("application/json"):let e=JSON.parse(s);e.tk=t;n(e);break;case o.includes("text/html"):n("text/html");break;case o.includes("text/plain"):let r=s.split("\n");let i=r.reduce(((n,e)=>{let[o,r]=e.split("=");n[o]=r;n.tk=t;return n}),{});n(i);break;case o.includes("image/svg+xml"):n("image/svg+xml");break;default:n("未知");break}break;case 204:let r={tk:t};n(r);break;default:n("nokey");break}}}))})),new Promise(((t,n)=>{setTimeout((()=>n(new Error("timeout"))),o)}))]);if(r){i(r)}else{i("超时");l(new Error(n.message))}}catch(t){if(f<r){s++;a(f+1)}else{i("检测失败, 重试次数"+s);l(t)}}};a(0)}));return i}