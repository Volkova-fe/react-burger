import { 
	CLOSE_INGREDIENT_MODAL, 
	OPEN_INGREDIENT_MODAL 
} from "../actions/ingredient-details";


const ingredientInitialState = {
	openModal: null
};

export const ingredientReducer = (state = ingredientInitialState, action) => {
	switch (action.type) {
		case OPEN_INGREDIENT_MODAL: {
			return {
				...state,
				openModal: action.ingredient,
			};
		}
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