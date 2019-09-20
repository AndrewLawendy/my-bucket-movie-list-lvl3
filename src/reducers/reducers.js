import { combineReducers } from 'redux';
import * as constants from '../actions/actionTypes';

const moviesInitState = {
  allMovies: [],
  categories: [],
};

const commonInitState = {
  modalShow: false,
  modalComponent: null,
  isLoading: false,
};

const moviesReducer = (state = moviesInitState, action) => {
  switch (action.type) {
    case constants.UPDATE_MOVIES:
      return {
        ...state,
        allMovies: action.payload,
      };
    case constants.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

const commonReducer = (state = commonInitState, action) => {
  switch (action.type) {
    case constants.MODAL_TOGGLE:
      return {
        ...state,
        modalShow: action.payload.modalShow,
        modalComponent: action.payload.modalComponent,
      };
    case constants.LOADING_TOGGLE:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const allReducers = combineReducers({ moviesReducer, commonReducer });

export default allReducers;
