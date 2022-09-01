import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import {
	ConstructorElement,
	CurrencyIcon,
	Button,
}
	from '@ya.praktikum/react-developer-burger-ui-components'

import ConstructorItems from './constructor-items/constructor-items'
import burgerConstructorStyle from './burger-constructor.module.css'

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
	const { bun, items, itemsId } = useSelector((state) => state.burgerConstructor);
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
		<section className={`${burgerConstructorStyle.section} pl-10 pt-15`}>
			<div className={`${burgerConstructorStyle.container} pr-2 pt-4`} ref={dropTarget}>
				{!bun
					? (<p className='text text_type_main-large pr-2'>Выберите булочку</p>)
					: (<ConstructorElement
						type="top"
						isLocked={true}
						text={bun.name + '(верх)'}
						price={bun.price}
						thumbnail={bun.image}
						key={bun._id}
					/>)}
				{items.length === 0
					? (<p className={`${burgerConstructorStyle.list} ${burgerConstructorStyle.text} pr-2 text text_type_main-large`}>&#8592; Выберите начинку</p>)
					: <ul className={`${burgerConstructorStyle.list} pr-2`}>
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
				{!bun
					? (<p className='text text_type_main-large pr-2'>Выберите булочку </p>)
					: (<ConstructorElement
						type="bottom"
						isLocked={true}
						text={bun.name + '(низ)'}
						price={bun.price}
						thumbnail={bun.image}
						key={`bottom: ${bun._id}`}
					/>)}
			</div>
			<div className={`${burgerConstructorStyle.order} pt-10 pr-5`}>
				<div className={`${burgerConstructorStyle.count_result} pr-10`}>
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