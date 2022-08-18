import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { OrdersCard } from '../../../components/orders/orders-card/orders-card';
import styles from './order-history.module.css';

export const OrderHistory = () => {
	const location = useLocation();
	const orders = useSelector(store => store.wsAuthFeed.orders).slice();
	orders.reverse();

	return (
		<div className={styles.container}>
			{orders &&
				(orders?.map((order) => {
					return (
						<Link
							to={{ pathname: `/profile/orders/${order._id}`, state: { background: location } }}
							className={`${styles.link}`} key={order._id}
						>
							<OrdersCard order={order} status={true} />
						</Link>
					)
				}))
			}
		</div >
	)
}