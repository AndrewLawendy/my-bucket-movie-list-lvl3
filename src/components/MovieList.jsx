/* eslint-env browser */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllMovies, getAllCategories } from '../actions/actions';

import FilterMovies from './FilterMovies';
import MovieCard from './MovieCard';

const mapStateToProps = (state) => {
  const { allMovies } = state.moviesReducer;
  const { isLoading } = state.commonReducer;
  return { allMovies, isLoading };
};

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => {
    dispatch(getAllCategories());
  },
  updateAllMovies: (name) => {
    dispatch(getAllMovies(name));
  },
});

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameFilter: '',
      yearFilter: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getCategories, updateAllMovies } = this.props;
    getCategories();
    updateAllMovies();
  }

  handleChange(e) {
    const { target } = e;
    const { name, value } = target;
    const { nameFilter } = this.state;
    this.setState({
      [name]: value,
    });
    if (name === 'nameFilter' && value !== nameFilter) {
      const { updateAllMovies } = this.props;
      updateAllMovies(value.length >= 2 ? value : '');
    }
  }

  render() {
    const {
      allMovies, isLoading,
    } = this.props;
    const { nameFilter, yearFilter } = this.state;
    return (
      <main id="movie-list-container">
        <div className="container">
          {isLoading && <p id="loading">Loading...</p>}
          {
            !isLoading && (
              allMovies.length ? (
                <div>
                  <FilterMovies handleChange={this.handleChange} allMovies={allMovies} nameFilter={nameFilter} yearFilter={yearFilter} />
                  <ul id="movie-list">
                    {allMovies.filter((movie) => (!yearFilter ? true : movie.year === Number(yearFilter))).map((movie) => (
                      <li
                        key={movie.id}
                      >
                        <MovieCard movie={movie} />
                      </li>
                    ))}
                  </ul>
                </div>
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
  getCategories: PropTypes.func.isRequired,
  updateAllMovies: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
