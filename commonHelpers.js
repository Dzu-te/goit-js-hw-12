import{S as y,i as l,a as L}from"./assets/vendor-b52d9f5e.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))f(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&f(i)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function f(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();const w="https://pixabay.com/api/",S="42024454-8ed2ac239bcd0125bd4fa3d9e",c=document.querySelector(".handleSearchSubmit"),m=document.querySelector(".card_container"),u=document.querySelector(".btn-show-more"),s="is-hidden";u.addEventListener("click",A);const h=document.querySelector(".loader"),b=new y(".card_container a");let a=1,d="";function p(e){l.error({title:"Error",message:e})}function v(e){l.warning({title:"Warning",message:e})}function E(e){l.show({title:"Alert",message:e})}function I(){h.classList.remove(s)}function M(){h.classList.add(s)}function $(){u.classList.add(s)}function P(){u.classList.remove(s)}c.addEventListener("submit",_);function q(e){const n=new URLSearchParams({key:S,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:a}),t=`${w}?${n.toString()}`;return L.get(t)}async function _(e){e.preventDefault();const t=c.elements.search.value.trim();if(!t){v("Please enter your search term.");return}t!==d&&(m.innerHTML="",a=1),await g(t),c.reset()}function k(e){if(e===0&&a===1){p("No results were found for your request.");return}if(e<15){E("We're sorry, but you've reached the end of search results.");return}P()}async function g(e){try{I(),$();const n=await q(e);d=e,k(n.data.hits.length),x(n.data.hits)}catch{p("Error fetching images: An error occurred while fetching images. Please try again later.")}finally{M()}}async function A(e){a+=1,await g(d)}function x(e){const n=e.map(t=>`
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
  `).join("");m.innerHTML+=n,b.refresh()}
//# sourceMappingURL=commonHelpers.js.map
