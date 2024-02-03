import{S as w,i as d,a as b}from"./assets/vendor-b52d9f5e.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}})();const S="https://pixabay.com/api/",v="42024454-8ed2ac239bcd0125bd4fa3d9e",l=document.querySelector(".handleSearchSubmit"),m=document.querySelector(".card_container"),i=document.querySelector(".btn-show-more"),a="is-hidden";i.addEventListener("click",I);const p=document.querySelector(".loader");let f=1,h="";function u(e){d.error({title:"Error",message:e})}function E(e){d.warning({title:"Warning",message:e})}function $(e){d.show({title:"Alert",message:e})}function M(){p.classList.remove(a)}function g(){p.classList.add(a)}l.addEventListener("submit",P);function y(e){M();const o=new URLSearchParams({key:v,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:f});console.log({q:e});const t=`${S}?${o.toString()}`;return h=e,b.get(t)}async function P(e){e.preventDefault();const t=l.elements.search.value.trim();if(!t){E("Please enter your search term.");return}t!==h&&(m.innerHTML="",f=1);try{const s=await y(t);L(s.data.hits),k(),console.log(s),console.log(s.data.hits),s.data.hits.length===0?(i.classList.add(a),u("No results were found for your request.")):i.classList.remove(a)}catch{u("Error fetching images: An error occurred while fetching images. Please try again later.")}finally{g(),l.reset()}}async function I(e){f+=1;try{const o=await y(h);L(o.data.hits),o.data.hits.length<15&&(i.classList.add(a),$("We're sorry, but you've reached the end of search results."))}catch{u("Error fetching images: An error occurred while fetching images. Please try again later.")}finally{g()}}function L(e){const o=e.map(t=>`
    <a class="card" href="${t.largeImageURL}">
  <img src="${t.webformatURL}" alt="${t.tags}">
  <div class="info">
    <span class="info-item">
      <strong>Likes:</strong>
      <p class="info-item-count">${t.likes}</p>
    </span>

    <span class="info-item">
      <strong>Views:</strong>
      <p class="info-item-count">${t.views}</p>
    </span>

    <span class="info-item">
      <strong>Comments:</strong>
      <p class="info-item-count">${t.comments}</p>
    </span>

    <span class="info-item">
      <strong>Downloads:</strong>
      <p class="info-item-count">${t.downloads}</p>
    </span>
  </div>
</a>
  `).join("");m.innerHTML+=o}function k(){new w(".card_container a").refresh()}
//# sourceMappingURL=commonHelpers.js.map
