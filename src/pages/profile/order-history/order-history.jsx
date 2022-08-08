import React from 'react';
import { OrdersCard } from '../../../components/orders/orders-card/orders-card';
import styles from './order-history.module.css';

export const OrderHistory = () => {

	return (
		<article className={styles.container}>
			<h2 className="text text_type_main-medium">
				На данный момент вы не сделали ни одного заказа
			</h2 >
			<OrdersCard />
		</article >
	)
}