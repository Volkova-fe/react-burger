import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import { TOrderDetailsActions } from '../actions/order-details';
import { TIngredientModalActions } from '../actions/ingredient-details';
import { TOrderInfoDetailsModalActions } from '../actions/order-info-details';
import { TAuthActions } from '../actions/auth';
import { TBurgerConstructorActions } from '../actions/burger-constructor';
import { IWsActions } from '../actions/wsActions';
import { IWsAuthActions } from '../actions/wsAuthActions';
import { rootReducer } from '../reducers';


type TApplicationActions =
	| TBurgerIngredientsActions
	| TBurgerConstructorActions
	| TOrderDetailsActions
	| TIngredientModalActions
	| TOrderInfoDetailsModalActions
	| TAuthActions
	| IWsActions
	| IWsAuthActions;


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
	ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;