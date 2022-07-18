import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { ADD_BUN, ADD_ITEM_CONSTRUCTOR } from '../../services/actions/burger-constructor';

const BurgerConstructor = () => {
	const { bun, items } = useSelector((state) => state.burgerConstructor);
	const dispatch = useDispatch();
	const [total, setTotal] = useState(0);

	const filling = useMemo(
		() => items.filter((item) => item.type !== 'bun'),
		[items])

	useEffect(() => {
		const totalPrice = filling.reduce((sum, item) => sum + item.price, bun.length === 0 ? 0 : (bun.price * 2))
		setTotal(totalPrice)
	}, [bun, filling])

	const itemsId = useMemo(
		() => items.map((item) => item._id),
		[items])

	const orderDetailsModal = (productsId) => {
		dispatch(getOrderDetails(itemsId));
	};

	const [, dropTarget] = useDrop({
		accept: "ingredients",
		drop(item) {
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
		<section className={`${burgerConstructorStyle.section} pl-10 pt-25`}>
			<div className={`${burgerConstructorStyle.container} pr-2`} ref={dropTarget}>
				{bun.length === 0
					? (<p className='text text_type_main-large pr-2'>Выберите булочку</p>)
					: (<ConstructorElement
						type="top"
						isLocked={true}
						text={bun.name + '(верх)'}
						price={bun.price}
						thumbnail={bun.image}
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
				{bun.length === 0
					? (<p className='text text_type_main-large pr-2'>Выберите булочку </p>)
					: (<ConstructorElement
						type="bottom"
						isLocked={true}
						text={bun.name + '(низ)'}
						price={bun.price}
						thumbnail={bun.image}
					/>)}
			</div>
			<div className={`${burgerConstructorStyle.order} pt-10 pr-5`}>
				<div className={`${burgerConstructorStyle.count_result} pr-10`}>
					<p className='text text_type_digits-medium pr-2'>{total}</p>
					<CurrencyIcon type="primary" />
				</div>
				{items.length === 0
					? (<Button
						type="primary"
						size="large"
						onClick={() => { orderDetailsModal(itemsId) }}
						disabled
					>
						Оформить заказ
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