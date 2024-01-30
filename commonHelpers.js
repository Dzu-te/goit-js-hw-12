import{S as f,i as d,a as m}from"./assets/vendor-b52d9f5e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const p="https://pixabay.com/api/",h="42024454-8ed2ac239bcd0125bd4fa3d9e",c=document.querySelector(".handleSearchSubmit"),l=document.querySelector(".card_container"),i=document.createElement("div");i.classList.add("loader");i.textContent="Loading...";function u(n){d.error({title:"Error",message:n})}function g(n){d.warning({title:"Warning",message:n})}function y(){document.body.appendChild(i)}function L(){document.body.removeChild(i)}c.addEventListener("submit",w);function b(n){y();const r=new URLSearchParams({key:h,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0}),t=`${p}?${r.toString()}`;return m.get(t)}async function w(n){n.preventDefault();const t=c.elements.search.value.trim();if(!t){g("Please enter your search term.");return}try{const s=await b(t);S(s.data.hits),v(),console.log(s),s.data.hits.length===0&&u("No results were found for your request.")}catch{u("Error fetching images: An error occurred while fetching images. Please try again later.")}finally{L(),c.reset()}}function S(n){l.innerHTML="";const r=n.map(t=>`
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
  `).join("");l.innerHTML=r}function v(){new f(".card_container a").refresh()}
//# sourceMappingURL=commonHelpers.js.map
