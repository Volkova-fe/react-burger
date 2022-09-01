import { FC, ReactNode } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { TLocation } from '../../services/types/data';
import { getCookie } from '../../utils/utils';

interface Props {
	children: ReactNode;
	path: string;
	exact?: boolean;
}

export const ProtectedRoute: FC<Props> = ({ children, ...rest }) => {
	const cookie = getCookie('token');
	const location = useLocation<TLocation>();

	return (
		<Route
			{...rest}
			render={() =>
				cookie ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
} 