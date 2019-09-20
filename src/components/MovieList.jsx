/* eslint-env browser */
import 'babel-polyfill';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllMovies, getAllCategories } from '../actions/actions';

import MovieCard from './MovieCard';

const mapStateToProps = (state) => {
  const { allMovies } = state.moviesReducer;
  const { isLoading } = state.commonReducer;
  return { allMovies, isLoading };
};

const mapDispatchToProps = (dispatch) => ({
  initAllMovies: () => {
    dispatch(getAllCategories());
    dispatch(getAllMovies());
  },
});

class MovieList extends Component {
  componentDidMount() {
    const { initAllMovies } = this.props;
    initAllMovies();
  }

  render() {
    const { allMovies, isLoading } = this.props;
    return (
      <main id="movie-list-container">
        <div className="container">
          {isLoading && <p id="loading">Loading...</p>}
          {
            !isLoading && (
              allMovies.length ? (
                <ul id="movie-list">
                  {allMovies.map((movie) => (
                    <li
                      key={movie.id}
                    >
                      <MovieCard movie={movie} />
                    </li>
                  ))}
                </ul>
              ) : <p id="loading">One does not simply have a movie list, you have to create your own!</p>
            )
          }
        </div>
      </main>
    );
  }
}

MovieList.propTypes = {
  allMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  initAllMovies: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
