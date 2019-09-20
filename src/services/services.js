// /* eslint-env browser */
import 'babel-polyfill';

export const fetchPosters = async (movie) => {
  const { title } = movie;
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a55fe839a1e1940fce13c5be380581fa&query=${title}`).then((res) => res.json());
  if (response.results && response.results.length) return `https://image.tmdb.org/t/p/w500${response.results[0].poster_path}`;
  return '';
};

export const getAllMoviesService = async (name) => {
  const response = await fetch(`https://frontend-recruitment-challenge.herokuapp.com/movies?search=${name || ''}`).then((res) => res.json());
  const posters = await Promise.all(response.map((movie) => fetchPosters(movie)));
  const newCards = response.map((card, index) => ({ ...card, poster: posters[index] }));
  return newCards;
};
export const deleteMovieService = async (id) => fetch(`https://frontend-recruitment-challenge.herokuapp.com/movies/${id}`, {
  method: 'delete',
});

export const addMovieService = async (movie) => {
  const {
    title, budget, year, category_ids: categoryIds,
  } = movie;
  return fetch('https://frontend-recruitment-challenge.herokuapp.com/movies/', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title, budget, year, category_ids: categoryIds,
    }),
  });
};

export const editMovieService = async (movie) => {
  const {
    id, title, budget, year, category_ids: categoryIds,
  } = movie;
  return fetch(`https://frontend-recruitment-challenge.herokuapp.com/movies/${id}`, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title, budget, year, category_ids: categoryIds,
    }),
  });
};

export const getAllCategoriesService = async () => fetch('https://frontend-recruitment-challenge.herokuapp.com/categories')
  .then((res) => res.json());
