import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types"
import modalStyles from './modal.module.css'
import ModalOverlay from './modal-overlay/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.querySelector('#modal');

const Modal = ({ title, onClickClose, children }) => {

	useEffect(() => {
		function handleEscClose(evt) {
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
			<div className={modalStyles.container}>
				<h3 className={`${modalStyles.title} text text_type_main-large pl-10 pt-15 pb-1`}>{title}</h3>
				<button className={modalStyles.close_icon} >
					<CloseIcon onClick={onClickClose} />
				</button>
				{children}
			</div>
			<ModalOverlay onClickClose={onClickClose} />
		</>
		, modalRoot)

}

Modal.propTypes = {
	title: PropTypes.string,
	onClickClose: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired
}

export default Modal;