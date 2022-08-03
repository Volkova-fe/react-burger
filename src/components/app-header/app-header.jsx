import React from 'react';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon
}
	from '@ya.praktikum/react-developer-burger-ui-components'
import header from './app-header.module.css';
import { Link, NavLink, useLocation } from 'react-router-dom';


const AppHeader = () => {
	const location = useLocation();

	return (
		<header className={header.header}>
			<nav className={header.container}>
				<ul className={header.list}>
					<li className={`${header.item} ${header.item_left}`}>
						<NavLink
							to='/'
							exact
							className={`${header.link} text text_type_main-default `}
							activeClassName={`${header.linkActive} text text_type_main-default`}
						>
							<BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
							<p className={`${header.text} pl-2`}>Конструктор</p>
						</NavLink>
					</li>
					<li className={`${header.item} ${header.item_left} ml-2`}>
						<NavLink
							to='/feed'
							exact
							className={`${header.link} text text_type_main-default`}
							activeClassName={`${header.linkActive} text text_type_main-default`}
						>
							<ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'} />
							<p className={`${header.text} pl-2`}>Лента заказов</p>
						</NavLink>
					</li>
					<li className={`${header.item} ${header.logo} pt-6 pb-6`}>
						<Link to='/'>
							<Logo />
						</Link>
					</li>
					<li className={`${header.item} ${header.item_right}`}>
						<NavLink
							to='/profile'
							className={`${header.link} text text_type_main-default`}
							activeClassName={`${header.linkActive} text text_type_main-default`}
						>
							<ProfileIcon type={location.pathname === '/profile' || location.pathname === '/profile/orders' ? 'primary' : 'secondary'} />
							<p className={`${header.text} pl-2 `}>Личный кабинет</p>
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default AppHeader