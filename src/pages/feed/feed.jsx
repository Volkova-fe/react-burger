import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { OrdersBoard } from '../../components/orders-board/orders-board';
import { Orders } from '../../components/orders/orders';
import { wsConnectionClosed, wsConnectionOpen } from '../../services/actions/wsActions';
import styles from './feed.module.css';

export const Feed = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(wsConnectionOpen());
		return () => {
			dispatch(wsConnectionClosed())
		}
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<h2>Лента заказов</h2>
			<div>
				<Orders />
			</div>
			<OrdersBoard />
		</div >)
}