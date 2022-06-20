import React from 'react';
import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css'

const ModalOverlay = ({ onClickClose }) => (
	<div className={modalOverlayStyles.overlay} onClick={onClickClose}></div>
)

ModalOverlay.propTypes = {
	onClick: PropTypes.func
}

export default ModalOverlay;