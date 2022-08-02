import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Switch, Route } from 'react-router-dom';

import page from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { closeOrderModal } from '../../services/actions/order-details';
import { getBurgerIngredients } from '../../services/actions/burger-ingredients';
import { closeIngredientModal } from '../../services/actions/ingredient-details';
import { RESET_ITEM } from '../../services/actions/burger-constructor';
import { ForgotPassword, Login, NotFound404, Profile, Register, ResetPassword } from '../../pages';

function App() {
  const dispatch = useDispatch();
  const orderNumber = useSelector(store => store.order.number);
  const openIngredientDetailsModal = useSelector(store => store.ingredientDetails.openModal);

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  const handleCloseOrderDetailsModal = useCallback(() => {
    dispatch(closeOrderModal())
    dispatch({ type: RESET_ITEM });
  }, [dispatch]);

  const handleCloseIngredientDetailsModal = useCallback(() => {
    dispatch(closeIngredientModal());
  }, [dispatch]);

  return (
    <div className={page.app}>
      <AppHeader />
      <Switch>
        <Route path='/' exact>
          <main className={page.content}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/register' exact>
          <Register />
        </Route>
        <Route path='/forgot-password' exact>
          <ForgotPassword />
        </Route>
        <Route path='/reset-password' exact>
          <ResetPassword />
        </Route>
        <Route path='/profile' exact>
          <Profile />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {!!orderNumber &&
        <Modal
          title=''
          onClickClose={handleCloseOrderDetailsModal}>
          <OrderDetails />
        </Modal>
      }
      {!!openIngredientDetailsModal &&
        <Modal
          title='Детали ингредиента'
          onClickClose={handleCloseIngredientDetailsModal}>
          <IngredientDetails ingredient={openIngredientDetailsModal} />
        </Modal>
      }
    </div>
  );
}

export default App;
