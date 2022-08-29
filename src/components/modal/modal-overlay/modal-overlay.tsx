import React, { FC } from 'react';
import modalOverlayStyles from './modal-overlay.module.css'
import { TModalOverlay } from '../../../services/types/data';

const ModalOverlay: FC<TModalOverlay> = ({ onClickClose }) => (
	<div className={modalOverlayStyles.overlay} onClick={onClickClose}></div>
)

export default ModalOverlay;