import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { OrdersCard } from './orders-card/orders-card';
import styles from './orders.module.css';

export const Orders = () => {
	const location = useLocation();
	const orders = useSelector(store => store.wsFeed.orders);

	return (
		<div className={styles.container}>
			{orders && orders.map((order, index) => {
				return (
					<Link
						to={{ pathname: `/feed/${order._id}`, state: { background: location } }}
						className={`${styles.link}`} key={order._id}
					>
						<OrdersCard order={order} status={false} key={index} />
					</Link>
				)
			})}
		</div >
	)
}