import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import { TOrderDetailsActions } from '../actions/order-details';
import { TIngredientModalActions } from '../actions/ingredient-details';
import { TOrderInfoDetailsModalActions } from '../actions/order-info-details';


type TApplicationActions =
	| TBurgerIngredientsActions
	| TOrderDetailsActions
	| TIngredientModalActions
	| TOrderInfoDetailsModalActions;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
	ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;