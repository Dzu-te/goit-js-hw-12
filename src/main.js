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
loadMoreButton.addEventListener('click', handleLoadMore);
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.card_container a');

let currentPage = 1;
let searchQuery = '';

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
  loader.classList.remove(hiddenClass);
}

function hideLoader() {
  loader.classList.add(hiddenClass);
}

function hideLoadMoreButton() {
  loadMoreButton.classList.add(hiddenClass);
}

function showLoadMoreButton() {
  loadMoreButton.classList.remove(hiddenClass);
}

form.addEventListener('submit', onSearchSubmit);

function fetchImages(q) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: currentPage,
  });
  const url = `${BASE_URL}?${params.toString()}`;
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

  await processImages(searchValue);
  form.reset();
}

function processSideEffects(responseLength) {
  if (responseLength === 0 && currentPage === 1) {
    showErrorMessage('No results were found for your request.');
    return;
  }

  if (responseLength < 15) {
    showInfo("We're sorry, but you've reached the end of search results.");
    return;
  }

  showLoadMoreButton();
}

async function processImages(q) {
  try {
    showLoader();
    hideLoadMoreButton();
    const response = await fetchImages(q);
    searchQuery = q;
    processSideEffects(response.data.hits.length);
    renderImages(response.data.hits);
  } catch (error) {
    showErrorMessage(
      'Error fetching images: An error occurred while fetching images. Please try again later.'
    );
  } finally {
    hideLoader();
  }
}

// ==============================================

async function handleLoadMore(event) {
  currentPage += 1;
  await processImages(searchQuery);
}
// ===============================================

function renderImages(images) {
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
  lightbox.refresh();
}
