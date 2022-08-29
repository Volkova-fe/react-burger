import { 
	CLOSE_INGREDIENT_MODAL
} from "../action-types";


const ingredientInitialState = {
	openModal: null
};

export const ingredientReducer = (state = ingredientInitialState, action) => {
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