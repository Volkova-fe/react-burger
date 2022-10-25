import React, { FC } from 'react';
import styles from './modal-overlay.module.css'
import { TModalOverlay } from '../../../services/types/data';

const ModalOverlay: FC<TModalOverlay> = ({ onClickClose }) => (
	<div className={styles.overlay} onClick={onClickClose}></div>
)

export default ModalOverlay;