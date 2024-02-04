import{S as b,i as d,a as S}from"./assets/vendor-b52d9f5e.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}})();const v="https://pixabay.com/api/",E="42024454-8ed2ac239bcd0125bd4fa3d9e",l=document.querySelector(".handleSearchSubmit"),m=document.querySelector(".card_container"),i=document.querySelector(".btn-show-more"),a="is-hidden";i.addEventListener("click",k);const p=document.querySelector(".loader");let f=1,h="";function u(e){d.error({title:"Error",message:e})}function $(e){d.warning({title:"Warning",message:e})}function M(e){d.show({title:"Alert",message:e})}function P(){p.classList.remove(a)}function g(){p.classList.add(a)}l.addEventListener("submit",I);function y(e){P();const o=new URLSearchParams({key:E,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:f});console.log({q:e});const t=`${v}?${o.toString()}`;return h=e,S.get(t)}async function I(e){e.preventDefault();const t=l.elements.search.value.trim();if(!t){$("Please enter your search term.");return}t!==h&&(m.innerHTML="",f=1);try{const s=await y(t);L(s.data.hits),w(),console.log(s),console.log(s.data.hits),s.data.hits.length===0?(i.classList.add(a),u("No results were found for your request.")):i.classList.remove(a)}catch{u("Error fetching images: An error occurred while fetching images. Please try again later.")}finally{g(),l.reset()}}async function k(e){f+=1;try{const o=await y(h);L(o.data.hits),o.data.hits.length<15&&(i.classList.add(a),M("We're sorry, but you've reached the end of search results."))}catch{u("Error fetching images: An error occurred while fetching images. Please try again later.")}finally{g(),w()}}function L(e){const o=e.map(t=>`
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
  `).join("");m.innerHTML+=o}function w(){new b(".card_container a").refresh()}
//# sourceMappingURL=commonHelpers.js.map
