import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = '42024454-8ed2ac239bcd0125bd4fa3d9e';

const form = document.querySelector('.handleSearchSubmit');
const cardContainer = document.querySelector('.card_container');
const loadMoreButton = document.querySelector('.btn-show-more');
const hiddenClass = 'is-hidden';
loadMoreButton.addEventListener("click", handleLoadMore);
const loader = document.querySelector('.loader');


let currentPage = 1;
let searchQuery = '';
let maxPage = 0;

function showErrorMessage(message) {
  iziToast.error({
    title: 'Error',
    message,
  });
}

function showWarningMessage(message) {
  iziToast.warning({
    title: 'Warning',
    message,
  });
}

function showInfo(message) {
  iziToast.show({
    title: 'Alert',
    message,
});
}

function showLoader() {
  // document.body.appendChild(loader);
  loader.classList.remove(hiddenClass);
}

function hideLoader() {
  // document.body.removeChild(loader);
  loader.classList.add(hiddenClass);
}

form.addEventListener('submit', onSearchSubmit);

function fetchImages(q) {
  showLoader();

  const params = new URLSearchParams({
    key: API_KEY,
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: currentPage,
  });
  console.log({q})
  const url = `${BASE_URL}?${params.toString()}`;
  searchQuery = q;
  return axios.get(url);
}

async function onSearchSubmit(event) {
  event.preventDefault();
  
  const searchInput = form.elements.search;
  const searchValue = searchInput.value.trim();

  if (!searchValue) {
    showWarningMessage('Please enter your search term.');
    return;
  }
  if (searchValue !== searchQuery) {
    cardContainer.innerHTML = '';
    currentPage = 1;
  }
  try {
    const response = await fetchImages(searchValue);

    createMarkup(response.data.hits);
    
    initializeLightbox();
    console.log(response);
    console.log(response.data.hits);
    if (response.data.hits.length === 0) {
      loadMoreButton.classList.add(hiddenClass);
      
      showErrorMessage('No results were found for your request.');
    } else {
      loadMoreButton.classList.remove(hiddenClass);
      
    }
  } catch (error) {
    showErrorMessage(
      'Error fetching images: An error occurred while fetching images. Please try again later.'
    );
  } finally {
    hideLoader();
    form.reset();
  }
}

// ==============================================

async function handleLoadMore(event) {
  currentPage += 1;

  try {
    const response = await fetchImages(searchQuery);
    createMarkup(response.data.hits);
    if (response.data.hits.length < 15) {
      loadMoreButton.classList.add(hiddenClass);
      showInfo("We're sorry, but you've reached the end of search results.")
    }
  } catch (error) {
    showErrorMessage(
      'Error fetching images: An error occurred while fetching images. Please try again later.'
    );
  } finally {
    hideLoader();
    initializeLightbox();


  }
};
// ===============================================

  
function createMarkup(images) {
  

  const markup = images
    .map(
      image => `
    <a class="card" href="${image.largeImageURL}">
  <img src="${image.webformatURL}" alt="${image.tags}">
  <div class="info">
    <span class="info-item">
      <strong>Likes:</strong>
      <p class="info-item-count">${image.likes}</p>
    </span>

    <span class="info-item">
      <strong>Views:</strong>
      <p class="info-item-count">${image.views}</p>
    </span>

    <span class="info-item">
      <strong>Comments:</strong>
      <p class="info-item-count">${image.comments}</p>
    </span>

    <span class="info-item">
      <strong>Downloads:</strong>
      <p class="info-item-count">${image.downloads}</p>
    </span>
  </div>
</a>
  `
    )
    .join('');

  cardContainer.innerHTML += markup;
}

function initializeLightbox() {
  const lightbox = new SimpleLightbox('.card_container a');
  lightbox.refresh();
}
