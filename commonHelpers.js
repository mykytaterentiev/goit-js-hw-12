import{i as c,S as L,a as w}from"./assets/vendor-5401a4b0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();const m="/goit-js-hw-12/assets/bi_x-octagon-ddf7add7.svg",s={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),btnLoadMore:document.querySelector(".btn-load-more")};let d="",u=1,p=0;const y=15;async function f(){const i="https://pixabay.com/api/?key=42132229-e88b92984f0d2a7001cb07c65";try{const{data:a}=await w.get(i,{params:{image_type:"photo",orientation:"horizontal",safesearch:"true",q:d,per_page:y,page:u}});return a}catch(a){console.error("Сталася помилка при отриманні зображень:",a.message)}}s.form.addEventListener("submit",v);s.btnLoadMore.addEventListener("click",C);async function v(e){if(e.preventDefault(),s.btnLoadMore.classList.add("hidden"),d===e.target.elements.query.value.trim()){e.target.reset(),g();return}else d=e.target.elements.query.value.trim();u=1,s.gallery.textContent="",n();try{const r=await f();if(d)parseInt(r.totalHits)>0?(g(),h(r.hits),p=r.totalHits,b(),n()):(c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"red",messageColor:"white",messageSize:"16px",iconColor:"white",iconUrl:m,color:"white",timeout:2e3}),n());else{c.warning({message:"Sorry, you forgot to enter a search term. Please try again!",position:"topRight",messageSize:"16px",timeout:2e3}),n();return}}catch{c.error({message:"Error",position:"topRight",backgroundColor:"red",messageColor:"white",messageSize:"16px",iconColor:"white",iconUrl:m,color:"white",timeout:2e3}),n()}e.target.reset()}function S({largeImageURL:e,webformatURL:r,tags:i,likes:a,views:t,comments:o,downloads:l}){return`<a class='gallery-link' href='${e}'><img class='gallery-image' src='${r}' alt='${i}'/>
  <div class='gallery-review'>
  <div class='gallery-review-item'><b>Likes</b> <span>${a}</span></div>
  <div class='gallery-review-item'><b>Views</b> <span>${t}</span></div>
  <div class='gallery-review-item'><b>Comments</b> <span>${o}</span></div>
  <div class='gallery-review-item'><b>Downloads</b> <span>${l}</span></div>
  </div></a>
    `}let P=new L(".gallery a",{showCounter:!1,captionDelay:250,captions:!0,captionsData:"alt",captionPosition:"bottom"});function h(e){const r=e.map(S).join("");s.gallery.insertAdjacentHTML("beforeend",r),P.refresh()}async function C(){n(),g(),u+=1;const e=await f();h(e.hits),g(),b(),n(),q()}function b(){Math.ceil(p/y)<=u&&(s.btnLoadMore.classList.add("hidden"),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",messageSize:"16px",timeout:2e3}))}function n(){s.loader.classList.toggle("hidden")}function g(){s.btnLoadMore.classList.toggle("hidden")}function q(){const e=document.querySelector(".gallery-link");if(e){const i=e.getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"})}else return}
//# sourceMappingURL=commonHelpers.js.map
