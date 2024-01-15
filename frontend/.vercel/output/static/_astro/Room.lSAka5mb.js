import{d as b,c as f,o as y,g as p,i as E,e as v,a as _,r as $,f as k,t as w,S,l as C}from"./web.sxJfj93P.js";import{p as i}from"./pocketbase.q8DPaofU.js";const L="modulepreload",I=function(e){return"/"+e},x={},T=function(e,t,r){let s=Promise.resolve();if(t&&t.length>0){const e=document.getElementsByTagName("link");s=Promise.all(t.map((t=>{if((t=I(t))in x)return;x[t]=!0;const s=t.endsWith(".css"),a=s?'[rel="stylesheet"]':"";if(r)for(let r=e.length-1;r>=0;r--){const a=e[r];if(a.href===t&&(!s||"stylesheet"===a.rel))return}else if(document.querySelector(`link[href="${t}"]${a}`))return;const o=document.createElement("link");return o.rel=s?"stylesheet":L,s||(o.as="script",o.crossOrigin=""),o.href=t,document.head.appendChild(o),s?new Promise(((e,r)=>{o.addEventListener("load",e),o.addEventListener("error",(()=>r(new Error(`Unable to preload CSS for ${t}`))))})):void 0})))}return s.then((()=>e())).catch((e=>{const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}))};var B=w('<section class="py-2 flex flex-col max-w-6xl mx-auto px-4 sm:px-6 h-[calc(100vh-5rem)]"><div class="overflow-y-scroll overscroll-contain rounded-box basis-7/10"id=chat></div><form class="form-control basis-2/10"><div class="input-group w-full"><input id=messageInput type=text placeholder="Type your message"class="input input-bordered w-[90%]"><button class="btn btn-ghost rounded-box"><svg xmlns=http://www.w3.org/2000/svg class="h-6 w-6"width=24 height=24 viewBox="0 0 24 24"stroke-width=2 stroke=currentColor fill=none stroke-linecap=round stroke-linejoin=round><path stroke=none d="M0 0h24v24H0z"fill=none></path><path d="M10 14l11 -11"></path><path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5">'),P=w("<div>Loading...");const R=C((()=>T((()=>import("./Chat.T5mipyWx.js")),__vite__mapDeps([0,1]))));function H(){const[e,t]=f([]),[r,s]=f("");y((async()=>{const r={items:[]};(!i.authStore.isValid||!localStorage.getItem("auth"))&&(window.location.href="/login");const s=await i.collection("messages").getList(1,50,{sort:"-created",expand:"author"});for(const e of s.items){const t=e.expand.author,s=i.getFileUrl(t,t.avatar,{thumb:"64x64"});r.items.push({id:e.id,text:e.content,createdAt:e.created,user:{id:t.id,name:t.name,avatar:s}})}r.items.reverse(),t(r.items);const a=document.getElementById("chat");a&&(a.scrollTop=a.scrollHeight),await i.realtime.subscribe("messages",(async r=>{if("create"===r.action){const s=await i.collection("users").getOne(r.record.author),a=i.getFileUrl(s,s.avatar,{thumb:"64x64"}),o={id:r.record.id,text:r.record.content,createdAt:r.record.created,user:{id:s.id,name:s.name,avatar:a}};t([...e(),o]);const n=document.getElementById("chat");n&&(n.scrollTop=n.scrollHeight)}}))}));const a=async()=>{const e={content:r(),author:localStorage.getItem("authID")};await i.collection("messages").create(e),s("");const t=document.getElementById("chat");t&&(t.scrollTop=t.scrollHeight)},o=e=>{e.preventDefault(),a()};return n=p(B),l=n.firstChild,c=l.nextSibling,d=c.firstChild.firstChild,u=d.nextSibling,E(l,v(S,{get fallback(){return p(P)},get children(){return e().map((e=>v(R,{get id(){return e.id},get user(){return e.user},get text(){return e.text},get createdAt(){return e.createdAt}})))}})),c.addEventListener("submit",o),d.$$input=e=>s(e.currentTarget.value),u.$$click=a,_((()=>k(d,"value",r()))),$(),n;var n,l,c,d,u}b(["input","click"]);export{H as default};function __vite__mapDeps(e){return __vite__mapDeps.viteFileDeps||(__vite__mapDeps.viteFileDeps=["_astro/Chat.T5mipyWx.js","_astro/web.sxJfj93P.js"]),e.map((e=>__vite__mapDeps.viteFileDeps[e]))}