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
const hiddenClassBtn = 'is-hidden';

const loader = document.createElement('div');
loader.classList.add('loader');
loader.textContent = 'Loading...';

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

function showLoader() {
  document.body.appendChild(loader);
}

function hideLoader() {
  document.body.removeChild(loader);
}

form.addEventListener('submit', onSearchSubmit);

// Добавлен обработчик на кнопку "Load more"
loadMoreButton.addEventListener('click', handleLoadMore);

async function onSearchSubmit(event) {
  event.preventDefault();

  // Получаем значение поискового запроса и убираем лишние пробелы
  searchQuery = form.elements.search.value.trim();

  if (!searchQuery) {
    showWarningMessage('Please enter your search term.');
    return;
  }

  try {
    // Добавлено: Используем fetchImages для первоначальной загрузки изображений
    const response = await fetchImages(searchQuery);
    // Добавлено: Сбрасываем текущую страницу при новом поиске
    currentPage = 1;
    createMarkup(response.data.hits);

    initializeLightbox();

    if (response.data.hits.length === 0) {
      // Добавлено: Скрываем кнопку, если нет результатов
      loadMoreButton.classList.add(hiddenClassBtn);
      showErrorMessage('No results were found for your request.');
    } else {
      // Добавлено: Показываем кнопку, если есть результаты
      loadMoreButton.classList.remove(hiddenClassBtn);
    }
  } catch (error) {
    showErrorMessage('Error fetching images: ' + error.message);
  } finally {
    hideLoader();
    form.reset();
  }
}

// Добавлено: Асинхронная функция для обработки "Load more"
async function handleLoadMore() {
  currentPage += 1;

  try {
    // Добавлено: Используем fetchImages с указанием текущей страницы
    const response = await fetchImages(searchQuery, currentPage);

    if (response.data.hits.length === 0) {
      // Добавлено: Скрываем кнопку, если достигнут конец результатов
      loadMoreButton.classList.add(hiddenClassBtn);
      showWarningMessage("We're sorry, but you've reached the end of search results.");
    } else {
      // Добавлено: Добавляем новые изображения к текущему контейнеру
      createMarkup(response.data.hits);
      initializeLightbox();
    }
  } catch (error) {
    showErrorMessage('Error fetching more images: ' + error.message);
  }
}

function fetchImages(q, page = 1) {
  showLoader();

  const params = new URLSearchParams({
    key: API_KEY,
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  });

  const url = `${BASE_URL}?${params.toString()}`;

  // Изменено: Используем axios.get вместо fetch и возвращаем его результат
  return axios.get(url);
}

function createMarkup(images) {
  // Изменено: Не перезаписываем весь HTML, добавляем новые изображения
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

  cardContainer.innerHTML += markup; // Изменено: Добавляем новый HTML вместо перезаписи
}

function initializeLightbox() {
  const lightbox = new SimpleLightbox('.card_container a');
  lightbox.refresh();
}