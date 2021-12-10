import '../css/styles.css';
import PhotoApiService from './fetchApi';
import SimpleLightbox  from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import photoCard from '../templates/photoCard.hbs';

const inputRef = document.querySelector('#search-form');
const buttonMoreRef = document.querySelector('.load-more');
const galleryPictures = document.querySelector('.gallery');

inputRef.addEventListener('submit', onFormSubmit);
buttonMoreRef.addEventListener('click', fetchPhoto);
galleryPictures.addEventListener('click', onPhotoClick);

const photoApiService = new PhotoApiService();

function onFormSubmit(e) {
    e.preventDefault();
    photoApiService.query = e.currentTarget.elements.searchQuery.value;
     if (photoApiService.query === '') {
    return
    }

    enableLoadMoreBtn();
    photoApiService.resetPage();
    removeMarkup();
    fetchPhoto(); 
}

function createGalleryPictures(pictures) {
    galleryPictures.insertAdjacentHTML('beforeend', photoCard(pictures));
}

function onPhotoClick(e) {
    e.preventDefault();
    if (!e.target.classList.contains('gallery__link')) {
        return;
    }
    
    var lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, });
    lightbox.open();
}

function fetchPhoto() {
    try {
        disableLoadMoreBtn();
        photoApiService.fetchApi().then(pictures => {
            if (!pictures) {
                return
            } else if (pictures.length === 40) {
                enableLoadMoreBtn(); 
            }
            createGalleryPictures(pictures);
            photoApiService.incrementPage();
        })
    } catch (error) {
        onFetchError(error);
    }
    
}

function onFetchError(error) {
    removeMarkup();
    console.log(error.message);
    
}

function removeMarkup() {
    galleryPictures.innerHTML = "";
}

function enableLoadMoreBtn() {
  buttonMoreRef.classList.remove("is-hidden");
}

function disableLoadMoreBtn() {
  buttonMoreRef.classList.add("is-hidden");
}

