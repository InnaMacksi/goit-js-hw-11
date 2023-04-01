import { getImage } from './fetch';
import Notiflix from 'notiflix';


const formEl = document.querySelector('#search-form');
const divGallery = formEl.nextElementSibling;
console.log("🚀 ~ file: index.js:4 ~ divGallery:", divGallery)

formEl.addEventListener('submit', handleSearchImg);

function handleSearchImg(e) {
    e.preventDefault();
   searchTerm = formEl.elements.searchQuery.value;
    getImage().then(data => { console.log(data); console.log("🚀searchQuery.value:", searchTerm); }).catch(console.warn);
}

