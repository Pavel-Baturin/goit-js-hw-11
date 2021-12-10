import Notiflix from 'notiflix';
const axios = require('axios').default;
const API_KEY = '24718571-b89adef17fa712da498043d20';
const BASE_URL = 'https://pixabay.com/api/';

export default class PhotoApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchApi() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

    const response = await axios.get(url);
    
    if (response.data.totalHits === 0) {
      return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else if (response.data.hits.length < 40) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
    }
    return response.data.hits;
  }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

  get query() {
        return this.searchQuery;
    }

  set query(newQuery) {
        this.searchQuery = newQuery;
    }
  
}