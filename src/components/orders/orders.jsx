import React from 'react';
import { useSelector } from 'react-redux';
import { OrdersCard } from './orders-card/orders-card';
import styles from './orders.module.css';

export const Orders = () => {
	const orders = useSelector(store => store.wsFeed.orders);

	return (
		<div className={styles.container}>
			{orders && orders.map((order) => {
				return (
					<OrdersCard order={order} key={order.number} />
				)
			})}
		</div >
	)
}