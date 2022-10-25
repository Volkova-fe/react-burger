import React, { FC } from 'react';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon
}
	from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { TLocation } from '../../services/types/data';


const AppHeader: FC = () => {
	const location = useLocation<TLocation>();

	return (
		<header className={styles.header}>
			<nav className={styles.container}>
				<ul className={styles.list}>
					<li className={`${styles.item} ${styles.item_left}`}>
						<NavLink
							to='/'
							exact
							className={`${styles.link} text text_type_main-default `}
							activeClassName={`${styles.linkActive} text text_type_main-default`}
						>
							<BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
							<p className={`${styles.text} pl-2`}>Конструктор</p>
						</NavLink>
					</li>
					<li className={`${styles.item} ${styles.item_left} ml-2`}>
						<NavLink
							to='/feed'
							exact
							className={`${styles.link} text text_type_main-default`}
							activeClassName={`${styles.linkActive} text text_type_main-default`}
						>
							<ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'} />
							<p className={`${styles.text} pl-2`}>Лента заказов</p>
						</NavLink>
					</li>
					<li className={`${styles.item} ${styles.logo} pt-6 pb-6`}>
						<Link to='/'>
							<Logo />
						</Link>
					</li>
					<li className={`${styles.item} ${styles.item_right}`}>
						<NavLink
							to='/profile'
							className={`${styles.link} text text_type_main-default`}
							activeClassName={`${styles.linkActive} text text_type_main-default`}
						>
							<ProfileIcon type={location.pathname === '/profile' || location.pathname === '/profile/orders' ? 'primary' : 'secondary'} />
							<p className={`${styles.text} pl-2 `}>Личный кабинет</p>
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default AppHeader