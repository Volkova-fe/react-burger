import React from 'react';
import { useState, useEffect } from 'react';
import { API, responseCheck } from '../api/api';
import page from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details'
import IngredientDetails from '../ingredient-details/ingredient-details'

function App() {
  const [data, setData] = useState([])

  function getData() {
    fetch(`${API.url}`)
      .then(responseCheck)
      .then((res) => { setData(res.data) })
      .catch(err => { console.log(err) });
  }

  useEffect(() => {
    getData()
  }, [])

  const [openOrderDetailsModal, setOpenOrderDetailsModal] = React.useState(false)
  const [openIngredientDetailsModal, setOpenIngredientDetailsModal] = React.useState(false)
  const [Ingredient, setIngredient] = React.useState(null)

  const handleOpenOrderDetailsModal = () => {
    setOpenOrderDetailsModal(true);
  }

  const handleOpenIngredientDetailsModal = (item) => {
    setOpenIngredientDetailsModal(true);
    setIngredient(item);
  }

  const handleCloseModal = () => {
    setOpenOrderDetailsModal(false);
    setOpenIngredientDetailsModal(false);
  }

  return (
    <div className={page.app}>
      <AppHeader />
      <main className={page.content}>
        <BurgerIngredients ingridients={data} onClick={handleOpenIngredientDetailsModal} />
        <BurgerConstructor ingridients={data} onClick={handleOpenOrderDetailsModal} />
      </main>
      {openOrderDetailsModal &&
        <Modal
          title=''
          active={openOrderDetailsModal}
          onClickClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      }
      {openIngredientDetailsModal &&
        <Modal
          title='Детали ингредиента'
          active={openIngredientDetailsModal}
          onClickClose={handleCloseModal}>
          <IngredientDetails item={Ingredient} />
        </Modal>
      }
    </div>
  );
}

export default App;
