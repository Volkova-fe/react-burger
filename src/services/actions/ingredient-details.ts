import { 
	CLOSE_INGREDIENT_MODAL
} from "../action-types";

export interface IIngredientCloseModal {
	readonly type: typeof CLOSE_INGREDIENT_MODAL;
}

export type TIngredientModalActions = 
	| IIngredientCloseModal;

export const closeIngredientModal = (): IIngredientCloseModal => {
	return {
		type: CLOSE_INGREDIENT_MODAL,
	};
}