import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo } from 'react';
import uniqid from 'uniqid';
import { useSelector } from 'react-redux';

import { StackedImage } from '../../orders/orders-card/stacked-image/stacked-image';
import styles from './order-info-details.module.css';

export const OrdersInfoDetails = ({ details }) => {


	return (
		<div className={styles.container}>
			{details && details.map((item, index) => {
				return (
					<li key={uniqid()}>
						{item && (
							<>
								<StackedImage image={item.image} alt={item.name} key={uniqid()} />
								<p>{item.name}</p>
								<div>
									<p> 1 x {item.type === 'bun' ? item.price * 2 : item.price}</p>
									<CurrencyIcon type="primary" key={uniqid()} />
								</div>
							</>
						)}
					</li>
				)
			})
			}
		</div >)
}
