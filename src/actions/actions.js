// /* eslint-env browser */
import * as constants from './actionTypes';
import {
  getAllMoviesService, fetchPosters, deleteMovieService, addMovieService, editMovieService, getAllCategoriesService,
} from '../services/services';

const toggleLoading = (isLoading) => ({
  type: constants.LOADING_TOGGLE,
  payload: isLoading,
});

const updateMovies = (movies) => ({
  type: constants.UPDATE_MOVIES,
  payload: movies,
});


export const getAllMovies = () => async (dispatch) => {
  dispatch(toggleLoading(true));
  getAllMoviesService().then((newMovies) => {
    dispatch(updateMovies(newMovies));
    dispatch(toggleLoading(false));
  });
};

export const deleteMovie = (movie) => async (dispatch, getState) => {
  const { id } = movie;
  deleteMovieService(id)
    .then(() => {
      const { allMovies } = getState().moviesReducer;
      const index = allMovies.indexOf(movie);
      if (index > -1) dispatch(updateMovies([...allMovies.slice(0, index), ...allMovies.slice(index + 1)]));
    });
};

export const addMovie = (movie) => async (dispatch, getState) => {
  addMovieService(movie)
    .then((res) => res.json())
    .then(async (res) => {
      const { allMovies } = getState().moviesReducer;
      const poster = await fetchPosters(res);
      dispatch(updateMovies([...allMovies, { ...res, poster }]));
    });
};

export const editMovie = (movie) => async (dispatch, getState) => {
  editMovieService(movie)
    .then((res) => res.json())
    .then((res) => {
      const { allMovies } = getState().moviesReducer;
      const allMoviesEdited = allMovies.map((movieObj) => {
        if (movieObj.id !== res.id) return movieObj;
        return { ...movieObj, ...res };
      });
      dispatch(updateMovies(allMoviesEdited));
    });
};

export const getAllCategories = () => async (dispatch) => {
  getAllCategoriesService().then((res) => {
    dispatch({
      type: constants.GET_CATEGORIES,
      payload: res,
    });
  });
};


export const toggleModal = (modalShow, modalComponent) => (dispatch) => {
  let timeOut = 0;
  if (!modalShow) {
    document.getElementById('modal-container').classList.add('fade-out');
    timeOut = 300;
  }
  setTimeout(() => {
    dispatch({
      type: constants.MODAL_TOGGLE,
      payload: {
        modalShow, modalComponent,
      },
    });
  }, timeOut);
};
