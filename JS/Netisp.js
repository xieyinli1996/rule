// 2023-09-20 19:42:52
let pro={"内网":true,"本机":true,GPT:true,nw:true,"-----说明:可在持久化数据中更改是否在面板中显示":"开为:true, 关为:false ------"};let readd=$persistentStore.read("KeyNetisp");let data;try{data=readd?JSON.parse(readd):pro}catch(e){data=pro}let loca=data.内网;let bj=data.本机;let gptf=data.GPT;if(data.nw||typeof data.内网!=="boolean"||typeof data.GPT!=="boolean"||typeof data.本机!=="boolean"){console.log("无数据或数据错误");delete pro.nw;$persistentStore.write(JSON.stringify(pro),"KeyNetisp")}let pdldip="",outbli="",outgpt="Netisp Query",outld="",outik="",local="",nodeNames="";Promise.all([(async()=>{try{const e=await tKey("http://ip-api.com/json/?lang=zh-CN",1200);let t=new Date;let s="  "+(t.getMonth()+1)+"月"+t.getDate()+" "+t.getHours()+":"+t.getMinutes();if(e.status==="success"){let{country:t,countryCode:s,query:l,city:a,org:i,as:o,tk:n}=e;pdldip=l;ast=sK(o,3);o=sK(o,2);i=sK(i,1);let r=o.split(" ")[1];let c="";if(r.toLowerCase()===i.toLowerCase()){c=ast}else{c=o+" "+i}outld=t+" "+s+":   "+l+": "+n+"ms\n"+c}else{outld=e+"\n"}if(loca){let e=$network,t=e.dns,s="";let l=e["cellular-data"]&&e["cellular-data"].radio||"";let a=e.v4.primaryAddress,i=e.v6.primaryAddress!==null?": IPv6:":"";let o=e.wifi.ssid!==null?"WiFi: ":"";const n=await tKey(`http://connectivitycheck.platform.hicloud.com/generate_204`,500);if(o!==""){for(let e=0;e<t.length;e++){if(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(t[e])){s=t[e];break}}local="内网: "+o+i+"   "+a+": "+n.tk+"ms\n"}else{local="内网: "+l+i+"   "+a+": "+n.tk+"ms\n"}}if(bj){const e=await tKey("https://api.live.bilibili.com/ip_service/v1/ip_service/get_ip_addr",500);if(e.code===0){let{addr:t,province:s,city:l,isp:a}=e.data,i=e.tk;a=a.replace(/.*广电.*/g,"广电");outbli="本机: "+s+a+":   "+t+": "+i+"ms\n"}else{outbli="Biliapi "+e+"\n"}}if(gptf){const e=await tKey("http://chat.openai.com/cdn-cgi/trace",1e3);const t=["CN","TW","HK","IR","KP","RU","VE","BY"];if(typeof e!=="string"){let{loc:s,tk:l,warp:a,ip:i}=e,o=t.indexOf(s),n="";if(o==-1){n="GPT: "+s+" ✓"}else{n="GPT: "+s+" ×"}if(a="plus"){a="Plus"}outgpt=n+"       ➟     Priv: "+a+"   "+l+"ms"}else{outgpt="ChatGPT "+e}}const l=await httpAPI();let a;const i=l.requests.slice(0,6);let o=i.filter((e=>/ip-api\.com/.test(e.URL)));if(o.length>0){const e=o[0];nodeNames=": "+e.policyName;a=e.remoteAddress.replace(" (Proxy)","")}else{a="Noip"}let n=false,r="spe",c=false,d="edtest";isv6=false,cn=true,zl="";if(a==="Noip"){n=true}else if(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(a)){c=true}else if(/^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(a)){isv6=true}if(a==pdldip){cn=false;zl="直连: "}else{zl="落地: ";if(!n||c){const e=await tKey(`https://api-v3.${r}${d}.cn/ip?ip=${a}`,500);if(e.code===0&&e.data.country=="中国"){let{province:t,isp:s,city:l}=e.data,i=e.tk;s=sK(s,4);outik="入口: "+t+s+":   "+a+": "+i+"ms\n"}else{cn=false;outik="入口IPA"+e+"\n"}}if((!n||isv6)&&!cn){const e=await tKey(`http://ip-api.com/json/${a}?lang=zh-CN`,1e3);if(e.status==="success"){let{country:t,city:s,org:l,tk:i}=e;outik="入口: "+s+l+":   "+a+": "+i+"ms\n"}else{outik="入口IPB"+e+"\n"}}}$done({title:outgpt+nodeNames,content:local+outbli+outik+zl+outld+s})}catch(e){$done({title:outgpt+nodeNames,content:local+outbli+outik+outld+zl+day})}})()]);function sM(e,t){if(e.length>t){return e.slice(0,t)}else if(e.length<t){return e.toString().padEnd(t," ")}else{return e}}function sK(e,t){return e.split(" ",t).join(" ").replace(/\.|\,|com|\u4e2d\u56fd/g,"")}async function httpAPI(e="/v1/requests/recent",t="GET",s=null){return new Promise(((l,a)=>{$httpAPI(t,e,s,(e=>{l(e)}))}))}async function tKey(e,t){let s=1,l=1;const a=new Promise(((a,i)=>{const o=async r=>{try{const s=await Promise.race([new Promise(((t,s)=>{let l=Date.now();$httpClient.get({url:e},((e,a,i)=>{if(e){s(e)}else{let e=Date.now()-l;let s=a.status;switch(s){case 200:let s=a.headers["Content-Type"];switch(true){case s.includes("application/json"):let l=JSON.parse(i);l.tk=e;t(l);break;case s.includes("text/html"):t("text/html");break;case s.includes("text/plain"):let a=i.split("\n");let o=a.reduce(((t,s)=>{let[l,a]=s.split("=");t[l]=a;t.tk=e;return t}),{});t(o);break;case s.includes("image/svg+xml"):t("image/svg+xml");break;default:t("未知");break}break;case 204:let l={tk:e};t(l);break;case 429:console.log("次数过多");t("次数过多");break;case 404:console.log("404");t("404");break;default:t("nokey");break}}}))})),new Promise(((e,s)=>{setTimeout((()=>s(new Error("timeout"))),t)}))]);if(s){a(s)}else{a("超时");i(new Error(n.message))}}catch(e){if(r<s){l++;o(r+1)}else{a("检测失败, 重试次数"+l);i(e)}}};o(0)}));return a}
