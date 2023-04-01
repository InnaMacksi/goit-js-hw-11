import { getImage } from './fetch';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const divGallery = document.querySelector('.gallery');
const formEl = divGallery.previousElementSibling;
const loadMoreBtn = divGallery.nextElementSibling;
let pageNumber = 1;
// let lightbox;

loadMoreBtn.classList.add('is-hidden');

formEl.addEventListener('submit', handleSearchImg);

function handleSearchImg(e) {
    e.preventDefault();
    
  let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
    
  let searchTerm = '';
  searchTerm = formEl.elements.searchQuery.value;

  getImage(searchTerm, pageNumber).then(({ hits, totalHits }) => {
    divGallery.innerHTML = '';
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    totalHits = totalHits;
    Notiflix.Notify.info(`"Hooray! We found ${totalHits} images."`);
    hits.map(item => {
      markupGallery(item);
    });
    loadMoreBtn.classList.toggle(
      'is-hidden',
      pageNumber >= Math.ceil(totalHits / 40)); // ховаємо кнопку, якщо більше немає картинок
  });
  loadMoreBtn.addEventListener('click', handleLoadMore);
  function handleLoadMore() {
    pageNumber += 1;
    getImage(searchTerm, pageNumber)
      .then(({ hits, totalHits }) => {
        if (pageNumber >= Math.ceil(totalHits / 40)) {
          loadMoreBtn.classList.add('is-hidden');
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        } else {
          hits.map(item => {
            markupGallery(item);
          });
        }
        lightbox.refresh();
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .lastElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      })
      .catch(console.warn);
  }

  //       var lightbox = $('.gallery a', {
  //     captionsData: 'alt',
  //     captionPosition: 'bottom',
  //     captionDelay: 250,
  //   }).simpleLightbox();
    
  // let lightbox = new SimpleLightbox('.gallery a', {
  //     captionsData: 'alt',
  //     captionPosition: 'bottom',
  //     captionDelay: 250,
  //   });
}

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
    `
  <a class = "gallery__item" href="${largeImageURL}">
  <div class="photo-card">
  <img class = "gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" title="${tags}" />
  <ul class="info">
    <li class="info-item"><p>
      <b>Likes ${likes}</b>
    </p></li>
    <li class="info-item"><p>
      <b>Views ${views}</b>
    </p></li>
    <li class="info-item"><p>
      <b>Comments ${comments}</b>
    </p></li>
    <li class="info-item"><p>
      <b>Downloads ${downloads}</b>
    </p></li>
  </ul>
  </div>
  </a>`
  );
}
