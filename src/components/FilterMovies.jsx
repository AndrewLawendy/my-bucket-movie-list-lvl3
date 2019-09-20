import React from 'react';
import PropTypes from 'prop-types';

function FilterMovies(props) {
  const {
    handleChange, allMovies, nameFilter, yearFilter,
  } = props;
  return (
    <form id="filter-panel">
      <div className="form-group">
        <label htmlFor="filter-name">
          Filter movies by name: (Minimum of two characters)
          <input type="text" name="nameFilter" value={nameFilter} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="filter-year">
          Filter movies by year:
          <select name="yearFilter" value={yearFilter} onChange={handleChange}>
            {
              [{ id: 'empty', year: '' }, ...allMovies].map((movie) => <option key={movie.id} value={movie.year}>{movie.year}</option>)
            }
          </select>
        </label>
      </div>
    </form>
  );
}

FilterMovies.propTypes = {
  handleChange: PropTypes.func.isRequired,
  allMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  nameFilter: PropTypes.string.isRequired,
  yearFilter: PropTypes.string.isRequired,
};

export default FilterMovies;
