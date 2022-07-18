import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

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
      <main className={page.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
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
