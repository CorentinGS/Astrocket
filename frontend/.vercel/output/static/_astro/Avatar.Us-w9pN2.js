import{d as b,c as f,o as h,g as p,a as w,r as v,s as $,t as S}from"./web.sxJfj93P.js";import{p as l}from"./pocketbase.q8DPaofU.js";var _=S('<div class="dropdown dropdown-end"><label tabindex=0 class="btn btn-ghost btn-circle avatar"><div class="w-10 rounded-full"><img alt="mock image"loading=lazy width=64 height=64></div></label><ul tabindex=0 class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"><li><a class=justify-between>Profile<span class=badge>New</span></a></li><li><a>Settings</a></li><li><a>Logout');function C(){let a={};const[t,i]=f("");h((async()=>{console.log("Avatar mounted"),a=JSON.parse(localStorage.getItem("auth")?.toString()||""),a||(window.location.href="/login"),i(l.getFileUrl(a,a.avatar,{thumb:"64x64"}))}));const o=async()=>{await l.authStore.clear(),localStorage.removeItem("auth"),window.location.href="/login"};return e=p(_),s=e.firstChild,n=s.firstChild.firstChild,s.nextSibling.firstChild.nextSibling.nextSibling.firstChild.$$click=o,w((()=>$(n,"src",t()))),v(),e;var e,s,n}b(["click"]);export{C as default};