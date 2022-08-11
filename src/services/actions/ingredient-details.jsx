import { 
	CLOSE_INGREDIENT_MODAL
} from "../action-types";


export const closeIngredientModal = () => {
	return {
		type: CLOSE_INGREDIENT_MODAL,
	};
}