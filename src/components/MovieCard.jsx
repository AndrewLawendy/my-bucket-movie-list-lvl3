// /* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteMovie, toggleModal } from '../actions/actions';

import MovieCtrlForm from './MovieCtrlForm';

import altImage from '../assets/alt-image.jpg';

const mapDispatchToProps = (dispatch) => ({
  deleteById: (id) => {
    dispatch(deleteMovie(id));
  },
  toggleModalAction: (modalShow, modalComponent) => {
    dispatch(toggleModal(modalShow, modalComponent));
  },
});

function MovieCard(props) {
  const { movie, deleteById, toggleModalAction } = props;

  function imageFallback(e) {
    const { target } = e;
    target.src = altImage;
  }


  return (
    <div className="movie-container" title={movie.title}>
      <img
        src={movie.poster || altImage}
        alt={`${movie.title} poster`}
        onError={imageFallback}
      />
      <div className="details">
        <span>Name:</span>
        <p>{movie.title}</p>
        <span>Budget:</span>
        <p>
          {new Intl.NumberFormat('en-US',
            {
              style: 'currency',
              currency: 'USD',
            }).format(movie.budget)}
        </p>
      </div>
      <span className="year">{movie.year}</span>
      <div className="card-ctrl-btn">
        <button type="button" className="movie-delete" onClick={() => deleteById(movie)}>x</button>
        <button type="button" className="movie-edit" onClick={() => toggleModalAction(true, <MovieCtrlForm movieState={movie} />)}>Edit</button>
      </div>
    </div>
  );
}


MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    budget: PropTypes.string,
    year: PropTypes.number,
    poster: PropTypes.string,
  }).isRequired,
  deleteById: PropTypes.func.isRequired,
  toggleModalAction: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(MovieCard);
