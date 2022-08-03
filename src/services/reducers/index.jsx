import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { constructorReducer } from "./burger-constructor";
import { ingredientsReducer } from "./burger-ingredients";
import { ingredientReducer } from "./ingredient-details";
import { orderReducer } from "./order-details";

export const rootReducer = combineReducers({
	order: orderReducer,
	burgerIngredients: ingredientsReducer,
	ingredientDetails: ingredientReducer,
	burgerConstructor: constructorReducer,
	auth: authReducer,
});