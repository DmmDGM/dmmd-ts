var{defineProperty:X,getOwnPropertyNames:b,getOwnPropertyDescriptor:R}=Object,j=Object.prototype.hasOwnProperty;var f=new WeakMap,k=(x)=>{var _=f.get(x),D;if(_)return _;if(_=X({},"__esModule",{value:!0}),x&&typeof x==="object"||typeof x==="function")b(x).map((Q)=>!j.call(_,Q)&&X(_,Q,{get:()=>x[Q],enumerable:!(D=R(x,Q))||D.enumerable}));return f.set(x,_),_};var J=(x,_)=>{for(var D in _)X(x,D,{get:_[D],enumerable:!0,configurable:!0,set:(Q)=>_[D]=()=>Q})};var c={};J(c,{web:()=>M,vanilla:()=>T});module.exports=k(c);var T={};J(T,{time:()=>I,queue:()=>z,prototype:()=>$,object:()=>Z,math:()=>Y});var Y={};J(Y,{clamp:()=>u});function u(x,_,D){return Math.min(Math.max(x,_),D)}var Z={};J(Z,{deepMerge:()=>O,deepAssign:()=>N});function N(x,..._){for(let D=0;D<_.length;D++)O(x,_[D]);return x}function O(x,_){let D=[[x,_]];while(D.length>0){let[Q,q]=D.pop(),S=Object.getOwnPropertyNames(q);for(let F=0;F<S.length;F++){let w=S[F],G=q[w];if(typeof Q[w]==="object"&&typeof G==="object")D.push([Q[w],G]);else Q[w]=G}}return x}var $={};J($,{testParentPrototype:()=>v,parsePrototypeChain:()=>U,findCommonPrototype:()=>y});function y(x,_){let D=U(x),Q=U(_),q=D.values(),S=q.next();while(!S.done){if(Q.has(S.value))return S.value;S=q.next()}return null}function U(x){if(typeof x==="undefined")throw new Error("Prototype chain does not exists on undefined");let _=new Set;if(x===null)return _;let D=Object.getPrototypeOf(x);while(D!==null)_.add(D),D=Object.getPrototypeOf(D);return _}function v(x,_){return U(x).has(_)}var z={};J(z,{Queue:()=>C});class C{_array;_set;constructor(){this._array=null,this._set=new Set}clear(){}delete(x){}pull(){return null}push(x=!1){}test(x){return!1}}var I={};J(I,{sleep:()=>d,ping:()=>h,beep:()=>P});function P(){let x=performance.now();return()=>performance.now()-x}function h(x="default"){let _=P();return()=>{let Q=_();return console.log(x+": "+String(Q)+" ms"),Q}}function d(x){return new Promise((_)=>{setTimeout(()=>{_()},x)})}var M={};J(M,{element:()=>A});var A={};J(A,{modify:()=>B,create:()=>E});function E(x,_){return B(document.createElement(x),_)}function B(x,_){let D=Object.getOwnPropertyNames(_);for(let Q=0;Q<D.length;Q++){let q=D[Q];switch(q){case"attributes":{for(let w=x.attributes.length-1;w>=0;w--){let G=x.attributes.item(w);if(G===null)continue;x.removeAttribute(G.name)}let S=_[q]??{},F=Object.getOwnPropertyNames(S);for(let w=0;w<F.length;w++){let G=F[w],K=S[G];x.setAttribute(G,K)}break}case"children":{let S=_[q]??[];Array.isArray(S)?x.replaceChildren(...S):x.replaceChildren(S);break}case"classes":{x.classList="";let S=_[q]??[];if(Array.isArray(S))for(let F=0;F<S.length;F++){let w=S[F];x.classList.add(w)}else x.classList.add(S);break}case"events":{let S=x.cloneNode(),F=x.children;x.replaceWith(S),x.replaceChildren(...Array.from(F));let w=_[q]??{},G=Object.getOwnPropertyNames(w);for(let K=0;K<G.length;K++){let V=G[K],L=w[V]??(()=>{});if(Array.isArray(L))for(let W=0;W<L.length;W++){let H=L[W];x.addEventListener(V,H)}else x.addEventListener(V,L)}break}case"html":{let S=_[q]??"";x.innerHTML=S;break}case"parent":{let S=_[q]??null;if(S===null&&x.parentElement!==null)x.parentElement.removeChild(x);else if(S!==null)S.appendChild(x);break}case"style":{x.style="";let S=_[q]??{};Object.assign(x.style,S);break}case"text":{let S=_[q]??"";x.innerText=S;break}default:{let S=_[q];x[q]=S;break}}}return x}
