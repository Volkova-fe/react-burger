import {
	ADD_BUN,
	ADD_ITEM_CONSTRUCTOR,
	DELETE_ITEM,
	MOVE_ITEM,
	RESET_ITEM
} from "../action-types";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { TIngredient } from "../types/data";

export type TInitialState = {
	items: Array<TIngredient>;
	bun?: TIngredient;
	itemsId?: TIngredient;
}

const initialState: TInitialState = {
	items: [],
	bun: undefined,
	itemsId: undefined,
};

export const constructorReducer = (
	state = initialState,
	action: TBurgerConstructorActions)
	: TInitialState => {
	switch (action.type) {
		case DELETE_ITEM: {
			return {
				...state,
				items: [...state.items].filter(
					(item) => {
						return item.id !== action.id;
					}
				),
			};
		}
		case ADD_BUN: {
			return {
				...state,
				bun: action.data,
				itemsId: [...state.itemsId, action.data._id]
			};
		}
		case ADD_ITEM_CONSTRUCTOR: {
			return {
				...state,
				items: [...state.items, action.data],
				itemsId: [...state.itemsId, action.data._id]
			};
		}
		case RESET_ITEM: {
			return {
				...state,
				items: [],
				bun: [],
			};
		}
		case MOVE_ITEM: {
			const dragConstructor = [...state.items];
			dragConstructor.splice(
				action.data.dragIndex,
				0,
				dragConstructor.splice(action.data.hoverIndex, 1)[0]
			);

			return {
				...state,
				items: dragConstructor
			};
		}
		default: {
			return state;
		}
	}
};