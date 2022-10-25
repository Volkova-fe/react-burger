import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css'
import ModalOverlay from './modal-overlay/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TModal } from '../../services/types/data';

const modalRoot = document.querySelector('#modal') as HTMLElement;

const Modal: FC<TModal> = ({ title, onClickClose, children }) => {

	useEffect(() => {
		function handleEscClose(evt: {key: string}) {
			if (evt.key === 'Escape') {
				onClickClose();
			}
		}
		document.addEventListener('keydown', handleEscClose);
		return () => {
			document.removeEventListener('keydown', handleEscClose);

		}
	}, [])

	return ReactDOM.createPortal(
		<>
			<div className={styles.container}>
				<h3 className={`${styles.title} text text_type_main-large pl-10 pt-15 pb-1`}>{title}</h3>
				<button className={styles.close_icon} >
					<CloseIcon onClick={onClickClose} type='primary'/>
				</button>
				{children}
			</div>
			<ModalOverlay onClickClose={onClickClose} />
		</>
		, modalRoot)

}

export default Modal;