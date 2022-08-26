import React, { FC, useRef } from 'react';
import constructorItemStyles from './constructor-items.module.css'
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import {
	DragIcon,
	ConstructorElement,
}
	from '@ya.praktikum/react-developer-burger-ui-components';

import { DELETE_ITEM, MOVE_ITEM } from '../../../services/action-types';
import { TIngredient } from '../../../utils/types'

type TConstructorItems = {
	index: number;
	items: TIngredient & {id: string};
}

type TDragItem = {
	index: number;
	id: string;
	type: string;
};

const ConstructorItems: FC<TConstructorItems>= ({ index, items }) => {
	const dispatch = useDispatch();
	const { image, id, price, name } = items;
	const ref = useRef(null);

	const onDelete = (id: string) => {
		dispatch({
			type: DELETE_ITEM,
			id: id,
		});
	};

	const [, drop] = useDrop<TDragItem>({
		accept: "item",
		hover(items) {
			if (!ref.current) {
				return;
			}
			const dragIndex = items.index;
			const hoverIndex = index;
			dispatch({
				type: MOVE_ITEM,
				data: { dragIndex, hoverIndex },
			});
			items.index = hoverIndex;
		},
	});

	const [{ opacity }, drag] = useDrag({
		type: "item",
		item: { id, index },
		collect: (monitor) => {
			return {
				opacity: monitor.isDragging() ? 0.5 : 1,
			};
		},
	});

	drag(drop(ref));

	return (
		<>
			<li className={`${constructorItemStyles.item} pt-4 pr-3`} style={{ opacity }} ref={ref}>
				<DragIcon type="primary" />
				<ConstructorElement
					text={name}
					price={price}
					thumbnail={image}
					handleClose={(() => onDelete(id))}
				/>
			</li>
		</>
	)
}

export default ConstructorItems;