import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRoute, AuthStatus } from '../const';
import { getAuthorizationStatus } from '../store/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
