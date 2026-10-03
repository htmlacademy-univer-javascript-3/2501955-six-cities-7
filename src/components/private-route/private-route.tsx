import { PropsWithChildren, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../enums/authorization-status';
import { AppRoute } from '../../enums/app-route';

type PrivateRouteProps = PropsWithChildren<{
  authorizationStatus: AuthorizationStatus;
}>;

function PrivateRoute({ authorizationStatus, children }: PrivateRouteProps): ReactNode {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
