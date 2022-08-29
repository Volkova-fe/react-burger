import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { IBurgerIngredientsSuccess } from '../actions/burger-ingredients';
import { IOrderDetailsSuccess } from '../actions/order-details';
import { TIngredientModalActions } from '../actions/ingredient-details';
import { TOrderInfoDetailsModalActions } from '../actions/order-info-details';


type TApplicationActions =
	| IBurgerIngredientsSuccess
	| IOrderDetailsSuccess;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
	ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;