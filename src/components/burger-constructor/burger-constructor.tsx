import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import {
	ConstructorElement,
	CurrencyIcon,
	Button,
}
	from '@ya.praktikum/react-developer-burger-ui-components'

import ConstructorItems from './constructor-items/constructor-items'
import styles from './burger-constructor.module.css'

import { getOrderDetails } from '../../services/actions/order-details';
import { ADD_BUN, ADD_ITEM_CONSTRUCTOR } from '../../services/action-types';
import { getCookie } from '../../utils/utils';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/hooks';
import { TIngredient, TLocation } from '../../services/types/data';

interface DropItem {
	ingredient: TIngredient;
}

const BurgerConstructor: FC = () => {
	const { bun, items, itemsId, bunRequestSuccess } = useSelector((state) => state.burgerConstructor);
	const { orderDetailsRequest } = useSelector((state) => state.order);
	const dispatch = useDispatch();
	const [total, setTotal] = useState(0);
	const cookie = getCookie('token');
	const history = useHistory<TLocation>();

	const filling = useMemo(
		() => items.filter((item) => item.type !== 'bun'),
		[items]);

	useEffect(() => {
		const totalPrice = items.reduce((sum, item) => sum + item.price, !bun ? 0 : (bun.price * 2));
		setTotal(totalPrice);
	}, [bun, filling]);


	const orderDetailsModal = (itemsId: string[]) => {
		cookie && dispatch(getOrderDetails(itemsId));
		!cookie && history.push('/login');
	};

	const [, dropTarget] = useDrop({
		accept: "ingredients",
		drop(item: DropItem) {
			if (item.ingredient.type === "bun") {
				dispatch({
					type: ADD_BUN,
					data: item.ingredient,
				});
			} else {
				dispatch({
					type: ADD_ITEM_CONSTRUCTOR,
					data: { ...item.ingredient, id: Date.now() },
				});
			}
		},
	});

	return (
		<section className={`${styles.section} pl-10 pt-15`}>
			<div className={`${styles.container} pr-2 pt-4`} ref={dropTarget}>
				{!bunRequestSuccess
					? (<p className={`${styles.empty_ingredient} ${styles.empty_ingredient_top} pr-2`}>Выберите булочку</p>)
					: (<ConstructorElement
						type="top"
						isLocked={true}
						text={bun.name + '(верх)'}
						price={bun.price}
						thumbnail={bun.image}
						key={bun._id}
					/>)}
				{items.length === 0
					? (<p 
						className={`${styles.list} ${styles.empty_ingredient} ${styles.empty_ingredient_middle} pr-2`}>
							&#8592; Выберите начинку
							</p>)
					: <ul className={`${styles.list} pr-2`}>
						{items.map((elem, index) => {
							if (elem.type === 'sauce' || elem.type === 'main') {
								return (
									<ConstructorItems
										key={elem.id}
										items={elem}
										index={index}
									/>)
							}
						})}
					</ul>
				}
				{!bunRequestSuccess
					? (<p className={`${styles.empty_ingredient} ${styles.empty_ingredient_bottom} pr-2`}>Выберите булочку </p>)
					: (<ConstructorElement
						type="bottom"
						isLocked={true}
						text={bun.name + '(низ)'}
						price={bun.price}
						thumbnail={bun.image}
						key={`bottom: ${bun._id}`}
					/>)}
			</div>
			<div className={`${styles.order} pt-10 pr-5`}>
				<div className={`${styles.count_result} pr-10`}>
					<p className='text text_type_digits-medium pr-2'>{total}</p>
					<CurrencyIcon type="primary" />
				</div>
				{items.length === 0 || !!orderDetailsRequest
					? (<Button
						type="primary"
						size="large"
						disabled
					>
						{orderDetailsRequest ? '...Заказ оформляется' : 'Оформить заказ'}
					</Button>)
					: (<Button
						type="primary"
						size="large"
						onClick={() => { orderDetailsModal(itemsId) }}
					>
						Оформить заказ
					</Button>)}
			</div>
		</section>
	)
}

export default BurgerConstructor