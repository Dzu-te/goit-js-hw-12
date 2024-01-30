import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = '42024454-8ed2ac239bcd0125bd4fa3d9e';

const form = document.querySelector('.handleSearchSubmit');
const cardContainer = document.querySelector('.card_container');

const loader = document.createElement('div');
loader.classList.add('loader');
loader.textContent = 'Loading...';

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
  })
}

function showLoader() {
  document.body.appendChild(loader);
}

function hideLoader() {
  document.body.removeChild(loader);
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
  try {
    const response = await fetchImages(searchValue);

    createMarkup(response.data.hits);
    initializeLightbox();
    console.log(response);
    if (response.data.hits.length === 0) {
      showErrorMessage('No results were found for your request.');
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

function createMarkup(images) {
  cardContainer.innerHTML = '';

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

  cardContainer.innerHTML = markup;
}

function initializeLightbox() {
  const lightbox = new SimpleLightbox('.card_container a');
  lightbox.refresh();
}
