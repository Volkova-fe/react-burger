import React from 'react';
import orderDetailsStyle from './order-details.module.css'
import orderAccepted from '../../images/order_accpeted.svg'

const OrderDetails = () => {
	return (
		<div className={`${orderDetailsStyle.container} pl-25 pr-25`}>
			<h1 className={`${orderDetailsStyle.title} text text_type_digits-large pt-15 pb-8`}>034536</h1>
			<p className={`${orderDetailsStyle.text} text text_type_main-medium pb-15`}>идентификатор заказа</p>
			<img className={`${orderDetailsStyle.icon} pb-15`} src={orderAccepted} alt={orderAccepted} />
			<p className={`${orderDetailsStyle.text} text text_type_main-default pb-2`}>Ваш заказ начали готовить</p>
			<p className={`${orderDetailsStyle.text} text text_type_main-default text_color_inactive pb-30`}>Дождитесь готовности на орбитальной станции</p>
		</div>
	)
}

export default OrderDetails;