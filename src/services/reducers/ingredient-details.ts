import { 
	CLOSE_INGREDIENT_MODAL
} from "../action-types";
import { TIngredientModalActions } from "../actions/ingredient-details";
import { TIngredient } from "../types/data";

export type TIngredientInitialState = {
	openModal: TIngredient | string | null;
}

const ingredientInitialState: TIngredientInitialState = {
	openModal: null
};

export const ingredientReducer = (
	state = ingredientInitialState, 
	action: TIngredientModalActions)
	: TIngredientInitialState => {
	switch (action.type) {
		case CLOSE_INGREDIENT_MODAL: {
			return {
				...state,
				openModal: null,
			};
		}
		default: {
			return state;
		}
	}
};