import React, { useState, useEffect } from 'react';
import { API, checkResponse } from '../api/api';
import page from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { DataContext } from '../../services/appContext';

function App() {
  const [data, setData] = useState([])
  const [orderNumber, setOrderNumber] = useState({
    name: '',
    order: {
      number: ''
    },
    success: false
  });

  function getData() {
    fetch(`${API.url}ingredients`)
      .then(checkResponse)
      .then((res) => { setData(res.data) })
      .catch(err => { console.log(err) });
  }

  useEffect(() => {
    getData()
  }, [])

  function getOrder(id) {
    fetch(`${API.url}orders`, {
      method: 'POST',
      body: JSON.stringify({
        ingredients: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(checkResponse)
      .then((res) => setOrderNumber(res))
      .catch(err => { console.log(err) });
  }

  const [openOrderDetailsModal, setOpenOrderDetailsModal] = useState(false)
  const [openIngredientDetailsModal, setOpenIngredientDetailsModal] = useState(false)
  const [ingredient, setIngredient] = useState(null)

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
      <DataContext.Provider value={{ data, setData }}>
        <AppHeader />
        <main className={page.content}>
          <BurgerIngredients ingredients={data} onClick={handleOpenIngredientDetailsModal} />
          <BurgerConstructor onClick={handleOpenOrderDetailsModal} getOrder={getOrder} />
        </main>
        {openOrderDetailsModal &&
          <Modal
            title=''
            active={openOrderDetailsModal}
            onClickClose={handleCloseModal}>
            <OrderDetails props={orderNumber} />
          </Modal>
        }
        {openIngredientDetailsModal &&
          <Modal
            title='Детали ингредиента'
            active={openIngredientDetailsModal}
            onClickClose={handleCloseModal}>
            <IngredientDetails item={ingredient} />
          </Modal>
        }
      </DataContext.Provider>
    </div>
  );
}

export default App;
