import { ADD_BUN, ADD_ITEM_CONSTRUCTOR, DELETE_ITEM, MOVE_ITEM, RESET_ITEM } from "../action-types";
import { TIngredient } from "../types/data";


export interface IAddBun {
	data: TIngredient | null;
	readonly type: typeof ADD_BUN;
	itemsId: TIngredient;
}

export interface IAddItems {
	readonly type: typeof ADD_ITEM_CONSTRUCTOR;
	data: Array<TIngredient>;
}

export interface IDeleteItem {
	readonly type: typeof DELETE_ITEM;
	data: Array<TIngredient>;
	id: string;
}

export interface IMoveItem {
	data: any;
	readonly type: typeof MOVE_ITEM;
	dragIndex: number;
	hoverIndex: number;
}

export interface IResetItem {
	readonly type: typeof RESET_ITEM;
	data: Array<TIngredient>;
}

export type TBurgerConstructorActions = 
| IAddBun
| IAddItems
| IDeleteItem
| IMoveItem
| IResetItem;