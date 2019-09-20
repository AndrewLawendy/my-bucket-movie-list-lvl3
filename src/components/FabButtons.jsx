import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleModal } from '../actions/actions';

import MovieCtrlForm from './MovieCtrlForm';

const mapDispatchToProps = (dispatch) => ({
  handleToggleModal: (modalShow, modalComponent) => {
    dispatch(toggleModal(modalShow, modalComponent));
  },
});

function FabButtons(props) {
  const { handleToggleModal } = props;
  return (
    <div id="fab-buttons-container">
      <button
        type="button"
        onClick={() => handleToggleModal(true, <MovieCtrlForm />)}
        id="add-new-movie"
      >
+
      </button>
    </div>
  );
}

FabButtons.propTypes = {
  handleToggleModal: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(FabButtons);
