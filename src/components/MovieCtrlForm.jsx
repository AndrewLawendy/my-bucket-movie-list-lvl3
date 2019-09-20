import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addMovie, editMovie, toggleModal } from '../actions/actions';

import FromValidation from './FormValidation';
import isMovieCtrlFormInputValid from '../helpers/helpers';

const mapStateToProps = (state) => {
  const { categories } = state.moviesReducer;
  return { categories };
};

const mapDispatchToProps = (dispatch) => ({
  addMovieAction: (movie) => {
    dispatch(addMovie(movie));
  },
  editMovieAction: (movie) => {
    dispatch(editMovie(movie));
  },
  toggleModalAction: (modalShow) => {
    dispatch(toggleModal(modalShow));
  },
});

function MovieCtrlForm(props) {
  const {
    movieState, categories, addMovieAction, editMovieAction, toggleModalAction,
  } = props;
  const initState = {
    title: '',
    year: '',
    budget: '',
    category_ids: [],
  };
  const {
    state,
    handleChange,
    reset,
    errors,
    handleSubmit,
    isSubmitted,
    isTouched,
  } = FromValidation((movieState || initState), isMovieCtrlFormInputValid);
  const {
    title, year, budget, category_ids: categoryIds,
  } = state;
  const {
    title: errorTitle, year: errorYear, budget: errorBudget, category_ids: categoriesError,
  } = errors;


  const handleSubmitAdd = () => {
    toggleModalAction(false);
    if (movieState) editMovieAction(state);
    else addMovieAction(state);
  };

  return (
    <div id="form-body">
      <h2 className="text-shadow">Add new movie to my list</h2>
      <form noValidate onSubmit={(e) => handleSubmit(e, handleSubmitAdd)}>
        <div className="form-group">
          <label htmlFor="title">
            Name:
            <span className="required">*</span>
            <input type="text" id="title" name="title" placeholder="Interstellar yaaay!!" value={title} onChange={handleChange} />
          </label>
          {isSubmitted && errorTitle && <span className="error-message">{errorTitle}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="year">
            Year:
            <span className="required">*</span>
            <input type="number" id="year" name="year" placeholder="Good times fellas" value={year} onChange={handleChange} />
          </label>
          {isSubmitted && errorYear && <span className="error-message">{errorYear}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="budget">
            Budget:
            <span className="required">*</span>
            <input type="number" id="budget" name="budget" placeholder="A GoT budget" value={budget} onChange={handleChange} />
          </label>
          {isSubmitted && errorBudget && <span className="error-message">{errorBudget}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="categories">
            Genres:
            <span className="required">*</span>
            {
              categories.map((cat) => (
                <label htmlFor={`${cat.title}-${cat.id}`} key={cat.id} className="checkbox">
                  <input type="checkbox" name="category_ids" checked={categoryIds.includes(cat.id)} value={cat.id} id={`${cat.title}-${cat.id}`} onChange={handleChange} />
                  {cat.title}
                </label>
              ))
            }
          </label>
          {isSubmitted && categoriesError && <span className="error-message">{categoriesError}</span>}
        </div>
        <div className="form-btns-ctrl">
          <button type="button" className="btn btn-red" onClick={reset}>Reset</button>
          <button type="submit" className="btn btn-green" disabled={!isTouched}>Submit Form</button>
        </div>
      </form>
    </div>
  );
}

MovieCtrlForm.defaultProps = {
  movieState: undefined,
};

MovieCtrlForm.propTypes = {
  addMovieAction: PropTypes.func.isRequired,
  editMovieAction: PropTypes.func.isRequired,
  toggleModalAction: PropTypes.func.isRequired,
  movieState: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCtrlForm);
