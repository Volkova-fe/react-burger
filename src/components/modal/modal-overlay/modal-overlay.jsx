import React from 'react';
import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css'

const ModalOverlay = ({ onClickClose }) => (
	<div className={modalOverlayStyles.overlay} onClick={onClickClose}></div>
)

ModalOverlay.propTypes = {
	onClickClose: PropTypes.func.isRequired
}

export default ModalOverlay;