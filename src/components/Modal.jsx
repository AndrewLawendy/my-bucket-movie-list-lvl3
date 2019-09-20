/* eslint-env browser */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleModal } from '../actions/actions';

const mapStateToProps = (state) => {
  const { modalShow, modalComponent } = state.commonReducer;
  return { modalShow, modalComponent };
};

const mapDispatchToProps = (dispatch) => ({
  handleToggleModal: (modalShow, modalComponent) => {
    dispatch(toggleModal(modalShow, modalComponent));
  },
});

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleCloseForm = this.handleCloseForm.bind(this);
    this.handleCloseKyePress = this.handleCloseKyePress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleCloseKyePress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleCloseKyePress);
  }

  handleCloseKyePress(e) {
    const { handleToggleModal } = this.props;
    if (e.keyCode === 27) {
      handleToggleModal();
    }
  }

  handleCloseForm(e) {
    const { handleToggleModal } = this.props;
    if (e.target === e.currentTarget) {
      handleToggleModal();
    }
  }

  render() {
    const { modalShow, modalComponent } = this.props;
    return modalShow && (
    <div id="modal-container" onClick={this.handleCloseForm} role="presentation">
      <div id="modal-body">
        <button type="button" id="modal-close" onClick={this.handleCloseForm}>x</button>
        {modalComponent}
      </div>
    </div>
    );
  }
}

Modal.defaultProps = {
  modalShow: false,
  modalComponent: null,
};

Modal.propTypes = {
  modalShow: PropTypes.bool,
  modalComponent: PropTypes.node,
  handleToggleModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
