import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import uniqid from 'uniqid';
import propTypes from "prop-types";
import { StackedImage } from '../../orders/orders-card/stacked-image/stacked-image';
import styles from './order-info-details.module.css';

export const OrdersInfoDetails = ({ details }) => {


	return (
		<div className={styles.container}>
			{details && details.map((item) => {
				return (
					<li className={`${styles.item} pb-3`} key={uniqid()}>
						{item && (
							<>
								<div className={styles.info}>
									<StackedImage image={item.image} alt={item.name} key={uniqid()} />
									<p className={`${styles.text} text text_type_main-default pl-4`}>{item.name}</p>
								</div>
								<div className={styles.price}>
									<p className='text text_type_digits-default pr-2'> 1 x {item.type === 'bun' ? item.price * 2 : item.price}</p>
									<CurrencyIcon type="primary" key={uniqid()} />
								</div>

							</>
						)}
					</li>
				)
			})}
		</div>
	)
}

OrdersInfoDetails.propTypes = {
	details: propTypes.array.isRequired,
};
