import { 
	CLOSE_INGREDIENT_MODAL, 
	OPEN_INGREDIENT_MODAL 
} from "../action-types";

export const openIngredientModal = (ingredient) => {
	return {
		type: OPEN_INGREDIENT_MODAL,
		ingredient: ingredient,
	};
}

export const closeIngredientModal = () => {
	return {
		type: CLOSE_INGREDIENT_MODAL,
	};
}