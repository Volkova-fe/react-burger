import React, { useEffect } from 'react';
import { useDispatch } from '../../services/hooks';
import { OrdersStats } from '../../components/orders-stats/orders-stats';
import { Orders } from '../../components/orders/orders';
import { wsConnectionClosed, wsConnectionOpen } from '../../services/actions/wsActions';
import styles from './feed.module.css';

export const Feed = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(wsConnectionOpen());
		return () => {
			dispatch(wsConnectionClosed());
		}
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<h2 className={`${styles.text} text text_type_main-large pt-10 pb-5`}>Лента заказов</h2>
			<div className={styles.feedOrder}>
				<Orders />
				<OrdersStats />
			</div>
		</div >)
}