import React from 'react';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon
}
	from '@ya.praktikum/react-developer-burger-ui-components'
import header from './app-header.module.css';

const AppHeader = () => {
	return (
		<header className={header.header}>
			<nav className={header.container}>
				<ul className={header.list}>
					<li className={`${header.item} ${header.item_left}`}>
						<a className={`${header.link} pl-5 pr-5 pb-4 pt-4`} href='#constructor'>
							<BurgerIcon type="primary" />
							<p className='text text_type_main-default pl-2'>Конструктор</p>
						</a>
					</li>
					<li className={`${header.item} ${header.item_left} ml-2`}>
						<a className={`${header.link} pl-5 pr-5 pb-4 pt-4`} href='#orderFeed'>
							<ListIcon type="secondary" />
							<p className='text text_type_main-default text_color_inactive pl-2'>Лента заказов</p>
						</a>
					</li>
					<li className={`${header.item} ${header.logo}`}>
						<Logo />
					</li>
					<li className={`${header.item} ${header.item_right}`}>
						<a className={`${header.link} pl-5 pr-5 pb-4 pt-4`} href='#userAccount'>
							<ProfileIcon type="secondary" />
							<p className='text text_type_main-default text_color_inactive pl-2'>Личный кабинет</p>
						</a>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default AppHeader