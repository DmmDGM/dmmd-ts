var h=Object.create;var{getPrototypeOf:u,defineProperty:J,getOwnPropertyNames:B,getOwnPropertyDescriptor:c}=Object,R=Object.prototype.hasOwnProperty;var v=(x,f,S)=>{S=x!=null?h(u(x)):{};let F=f||!x||!x.__esModule?J(S,"default",{value:x,enumerable:!0}):S;for(let L of B(x))if(!R.call(F,L))J(F,L,{get:()=>x[L],enumerable:!0});return F},O=new WeakMap,d=(x)=>{var f=O.get(x),S;if(f)return f;if(f=J({},"__esModule",{value:!0}),x&&typeof x==="object"||typeof x==="function")B(x).map((F)=>!R.call(f,F)&&J(f,F,{get:()=>x[F],enumerable:!(S=c(x,F))||S.enumerable}));return O.set(x,f),f};var q=(x,f)=>{for(var S in f)J(x,S,{get:f[S],enumerable:!0,configurable:!0,set:(F)=>f[S]=()=>F})};var t={};q(t,{web:()=>C,vanilla:()=>H,node:()=>Y});module.exports=d(t);var Y={};q(Y,{constant:()=>X});var X={};q(X,{commitHash:()=>E});var b=(()=>({})),E=b.default.execSync("git rev-parse --short HEAD").toString().trim();var H={};q(H,{time:()=>M,queue:()=>T,prototype:()=>A,object:()=>z,math:()=>$,fetch:()=>_,color:()=>Z});var Z={};q(Z,{hello:()=>m});function m(){console.log("Hello!")}var _={};q(_,{text:()=>g});async function g(x){return await(await fetch(x,{headers:{Accept:"text/plain"}})).text()}var $={};q($,{clamp:()=>p});function p(x,f,S){return Math.min(Math.max(x,f),S)}var z={};q(z,{deepMerge:()=>j,deepAssign:()=>o});function o(x,...f){for(let S=0;S<f.length;S++)j(x,f[S]);return x}function j(x,f){let S=[[x,f]];while(S.length>0){let[F,L]=S.pop(),D=Object.getOwnPropertyNames(L);for(let w=0;w<D.length;w++){let U=D[w],G=L[U];if(typeof F[U]==="object"&&typeof G==="object")S.push([F[U],G]);else F[U]=G}}return x}var A={};q(A,{testParentPrototype:()=>l,parsePrototypeChain:()=>Q,findCommonPrototype:()=>i});function i(x,f){let S=Q(x),F=Q(f),L=S.values(),D=L.next();while(!D.done){if(F.has(D.value))return D.value;D=L.next()}return null}function Q(x){if(typeof x==="undefined")throw new Error("Prototype chain does not exists on undefined");let f=new Set;if(x===null)return f;let S=Object.getPrototypeOf(x);while(S!==null)f.add(S),S=Object.getPrototypeOf(S);return f}function l(x,f){return Q(x).has(f)}var T={};q(T,{hello:()=>r});function r(){console.log("Hello!")}var M={};q(M,{sleep:()=>n,ping:()=>s,beep:()=>k});function k(){let x=performance.now();return()=>performance.now()-x}function s(x="default"){let f=k();return()=>{let F=f();return console.log(x+": "+String(F)+" ms"),F}}function n(x){return new Promise((f)=>{setTimeout(()=>{f()},x)})}var C={};q(C,{element:()=>P});var P={};q(P,{modify:()=>y,create:()=>a});function a(x,f){return y(document.createElement(x),f)}function y(x,f){let S=Object.getOwnPropertyNames(f);for(let F=0;F<S.length;F++){let L=S[F];switch(L){case"attributes":{for(let U=x.attributes.length-1;U>=0;U--){let G=x.attributes.item(U);if(G===null)continue;x.removeAttribute(G.name)}let D=f[L]??{},w=Object.getOwnPropertyNames(D);for(let U=0;U<w.length;U++){let G=w[U],I=D[G];x.setAttribute(G,I)}break}case"children":{let D=f[L]??[];Array.isArray(D)?x.replaceChildren(...D):x.replaceChildren(D);break}case"classes":{x.classList="";let D=f[L]??[];if(Array.isArray(D))for(let w=0;w<D.length;w++){let U=D[w];x.classList.add(U)}else x.classList.add(D);break}case"events":{let D=x.cloneNode(),w=x.children;x.replaceWith(D),x.replaceChildren(...Array.from(w));let U=f[L]??{},G=Object.getOwnPropertyNames(U);for(let I=0;I<G.length;I++){let V=G[I],K=U[V]??(()=>{});if(Array.isArray(K))for(let W=0;W<K.length;W++){let N=K[W];x.addEventListener(V,N)}else x.addEventListener(V,K)}break}case"html":{let D=f[L]??"";x.innerHTML=D;break}case"parent":{let D=f[L]??null;if(D===null&&x.parentElement!==null)x.parentElement.removeChild(x);else if(D!==null)D.appendChild(x);break}case"style":{x.style="";let D=f[L]??{};Object.assign(x.style,D);break}case"text":{let D=f[L]??"";x.innerText=D;break}default:{let D=f[L];x[L]=D;break}}}return x}
