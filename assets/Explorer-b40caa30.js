import{d as P,r as N,o as _,c as u,b as T,w as R,a as e,n as S,t as f,_ as q,e as h,u as z,f as H,g as U,h as l,i as V,v as E,j as F,k as I,F as O,l as A}from"./index-f18f3378.js";import{c as j}from"./imgCopyright-ed163f95.js";const G={class:"carditem"},J={class:"carditem_imgcontainer"},K=["src"],Q={class:"carditem__title"},W={class:"carditem__subtitle"},X=P({__name:"CardItem",props:{obra:{type:Object,required:!0}},setup(w){const a=w,p=()=>{const c=a.obra.isPublicDomain?a.obra.primaryImageSmall:j,r=new Image;return r.src=c,r.width/r.height>1?"horizontal-image":"vertical-image"},n=()=>a.obra.isPublicDomain?a.obra.primaryImageSmall:j,m=c=>c.length<=64?c:c.substring(0,64-3)+"...";function g(){window.scrollTo({top:0,behavior:"smooth"})}return(c,r)=>{var v;const x=N("router-link");return _(),u("div",G,[T(x,{to:"/Detail/"+((v=a.obra)==null?void 0:v.objectID),onClick:g},{default:R(()=>{var i,b;return[e("div",J,[e("img",{class:S([p(),"carditem__img"]),src:n(),alt:""},null,10,K)]),e("h1",Q,f(m((i=a.obra)==null?void 0:i.title)),1),e("h2",W,f((b=a.obra)==null?void 0:b.artistDisplayName),1)]}),_:1},8,["to"])])}}});const Y=q(X,[["__scopeId","data-v-5bc75f7e"]]),Z={class:"explorer"},ee={key:0},te={key:1,class:"explorer__filters"},se={class:"explorer__search"},ae=e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",class:"bi bi-search",viewBox:"0 0 16 16"},[e("path",{d:"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"})],-1),oe=[ae],ne={key:2,class:"explorer__total"},ie={class:"explorer__gallery"},ce={key:0,class:"explorer__wrapexp"},re={key:3,class:"explorer__pagination"},le=["disabled"],_e={class:"pagination__texts"},ue={class:"pagination__text"},pe={class:"pagination__text"},de=["disabled"],y=20,ge=P({__name:"Explorer",setup(w){let a=h({total:0,objectIDs:[0]}),p=h(!0);const n=h(1);let m,g=h([]),c=h([]),r=h({}),v=z().params.artist,i=h("");H(()=>{b(i.value)});async function b(s){try{let t='https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=""';v&&(t=`https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=${v}`),s&&(t=`https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=${encodeURIComponent(s)}`);const d=await(await fetch(t)).json();a.value=d,m=Math.ceil(a.value.objectIDs.length/y),g.value=C(),k(),p.value=!1}catch(t){console.error("Fetch error:",t)}}function C(){const s=(n.value-1)*y,t=s+y;return a.value.objectIDs.slice(s,t)}async function k(){var t;const s=await Promise.all((t=g.value)==null?void 0:t.map(o=>$(o)));c.value=s.filter(o=>o&&o.objectID&&o.isHighlight!==void 0)}async function $(s){if(r.value[s])return r.value[s];{const o=await(await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${s}`)).json();return r.value[s]=o,o}}function B(){i.value.trim()!==""&&b(i.value)}U(n,()=>{g.value=C(),k()});function L(){n.value>1&&(n.value--,D())}function M(){n.value<m&&(n.value++,D())}function D(){window.scrollTo({top:0,behavior:"smooth"})}return(s,t)=>{var o;return _(),u("div",Z,[l(p)?(_(),u("h1",ee,"Cargando...")):(_(),u("div",te,[e("div",se,[V(e("input",{type:"text",class:"search__input",name:"search",id:"search",placeholder:"Search","onUpdate:modelValue":t[0]||(t[0]=d=>F(i)?i.value=d:i=d)},null,512),[[E,l(i)]]),e("button",{type:"submit",on:"",class:"search__button",onClick:B},oe)])])),l(p)?I("",!0):(_(),u("h1",ne,f((o=l(a))==null?void 0:o.total)+" results",1)),e("div",ie,[l(p)?I("",!0):(_(),u("ul",ce,[(_(!0),u(O,null,A(l(c),d=>(_(),u("li",{key:d.objectID,class:"wrapexp__item"},[T(Y,{obra:d},null,8,["obra"])]))),128))]))]),l(p)?I("",!0):(_(),u("div",re,[e("button",{onClick:L,disabled:n.value===1,class:"pagination__button"},"Previous",8,le),e("div",_e,[e("p",ue,f(n.value)+" / ",1),e("p",pe,f(l(m)),1)]),e("button",{onClick:M,disabled:n.value===l(m),class:"pagination__button"},"Next",8,de)]))])}}});export{ge as default};