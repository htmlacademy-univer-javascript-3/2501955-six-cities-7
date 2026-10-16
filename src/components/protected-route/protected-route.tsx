import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../enums/authorization-status';
import type { AppRoute } from '../../enums/app-route';

type ProtectedRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: ReactNode;
};

function ProtectedRoute({
  restrictedFor,
  redirectTo,
  children,
}: ProtectedRouteProps): ReactNode {
  return restrictedFor === AuthorizationStatus.NoAuth ? (
    <Navigate to={redirectTo} />
  ) : (
    children
  );
}

export default ProtectedRoute;
