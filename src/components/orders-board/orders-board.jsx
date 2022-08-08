import React from 'react';
import { useSelector } from 'react-redux';
import styles from './orders-board.module.css';

export const OrdersBoard = () => {
	const { total, totalToday } = useSelector(store => store.wsFeed);

	return (
		<div className={styles.container}>
			Hello
		</div >)
}