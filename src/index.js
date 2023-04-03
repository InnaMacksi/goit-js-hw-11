import { PixabayAPI } from './fetch';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const divGallery = document.querySelector('.gallery');
const formEl = divGallery.previousElementSibling;
const loadMoreBtn = divGallery.nextElementSibling;

const pixabayApi = new PixabayAPI();

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

loadMoreBtn.classList.add('is-hidden');
const handleSearchImg = async event => {
  event.preventDefault();

  const searchTerm = formEl.elements.searchQuery.value;
  pixabayApi.q = searchTerm;
  try {
    const { data } = await pixabayApi.getImage();
    if (!data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    divGallery.innerHTML = '';
    Notiflix.Notify.info(`"Hooray! We found ${data.totalHits} images."`);
    data.hits.map(item => {
      markupGallery(item);
    });
    lightbox.refresh();
    loadMoreBtn.classList.toggle(
      'is-hidden',
      pixabayApi.page >= Math.ceil(data.totalHits / 40)
    );
  } catch (error) {
    console.log(error);
  }
};

const handleLoadMore = async () => {
  pixabayApi.page += 1;
  try {
    const { data } = await pixabayApi.getImage();
    if (pixabayApi.page >= Math.ceil(data.totalHits / 40)) {
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    data.hits.map(item => {
      markupGallery(item);
    });
    lightbox.refresh();
    loadMoreBtn.classList.toggle(
      'is-hidden',
      pixabayApi.page >= Math.ceil(data.totalHits / 40)
    );
    formEl.reset();

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .lastElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    Notiflix.Notify.failure(`${error}`);
  }
};

function markupGallery({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  divGallery.insertAdjacentHTML(
    'beforeend',
    `<a class = "gallery__item" href="${largeImageURL}">
  <div class="photo-card">
  <img class = "gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" title="${tags}" />
  <ul class="info">
    <li class="info-item"><p class="info-value">
      <b>Likes</b><span>${likes}</span></p></li>
    <li class="info-item"><p class="info-value">
      <b>Views</b><span>${views}</span></p></li>
    <li class="info-item"><p class="info-value">
      <b>Comments</b><span>${comments}</span></p></li>
    <li class="info-item"><p class="info-value">
      <b>Downloads</b><span>${downloads}</span></p></li>
  </ul>
  </div>
  </a>`
  );
}

formEl.addEventListener('submit', handleSearchImg);
loadMoreBtn.addEventListener('click', handleLoadMore);
