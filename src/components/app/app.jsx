import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Switch, Route, useLocation, useHistory, useRouteMatch } from 'react-router-dom';

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
import { RESET_ITEM } from '../../services/action-types';

import { Feed, ForgotPassword, Login, NotFound404, Profile, Register, ResetPassword } from '../../pages';
import { getUser, updateToken } from '../../services/actions/auth';
import { getCookie } from '../../utils/utils';
import { ProtectedRoute } from '../protected-route/protected-route';
import { OrdersInfo } from '../order-info/order-info';
import { closeOrderInfoModal } from '../../services/actions/order-info-detailsTypes';

function App() {
  const dispatch = useDispatch();
  const idOrderInfo = useRouteMatch([
    '/profile/orders/:id',
    '/feed/:id',
  ])?.params?.id;
  const orderNumber = useSelector(store => store.order.number);

  const token = localStorage.getItem('refreshToken');
  const cookie = getCookie('token');

  const location = useLocation();
  const history = useHistory();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);



  useEffect(() => {
    if (!cookie && token) {
      dispatch(updateToken());
    }
    if (cookie && token) {
      dispatch(getUser());
    }
  }, [dispatch, token, cookie]);


  const handleCloseOrderDetailsModal = useCallback(() => {
    dispatch(closeOrderModal());
    dispatch({ type: RESET_ITEM });
  }, [dispatch]);

  const handleCloseIngredientDetailsModal = useCallback(() => {
    dispatch(closeIngredientModal());
    history.replace('/');
  }, [dispatch]);

  const handleCloseOrderInfoDetailsModal = useCallback(() => {
    dispatch(closeOrderInfoModal());
    history.goBack();
  }, [dispatch]);


  return (
    <div className={page.app}>
      <AppHeader />
      <>
        <Switch location={background || location}>
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
          <Route path='/ingredients/:id' exact>
            <IngredientDetails />
          </Route>
          <Route path='/feed' exact>
            <Feed />
          </Route>
          <Route path='/feed/:id' exact>
            <OrdersInfo />
          </Route>
          <ProtectedRoute path='/profile'>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders/:id'>
            <OrdersInfo />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
        {background && (
          <Route path='/ingredients/:id' exact>
            <Modal
              title='Детали ингредиента'
              onClickClose={handleCloseIngredientDetailsModal}>
              <IngredientDetails />
            </Modal>
          </Route>
        )
        }
        {background && idOrderInfo && (
          <ProtectedRoute path='/profile/orders/:id' exact>
            <Modal
              title=''
              onClickClose={handleCloseOrderInfoDetailsModal}>
              <OrdersInfo />
            </Modal>
          </ProtectedRoute>
        )
        }
        {background && idOrderInfo && (
          <Route path='/feed/:id' exact>
            <Modal
              title=''
              onClickClose={handleCloseOrderInfoDetailsModal}>
              <OrdersInfo />
            </Modal>
          </Route>
        )
        }
      </>
      {!!orderNumber &&
        <Modal
          title=''
          onClickClose={handleCloseOrderDetailsModal}>
          <OrderDetails />
        </Modal>
      }
    </div>
  );
}

export default App;
