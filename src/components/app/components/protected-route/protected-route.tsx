import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import type { AuthorizationStatus } from '../../../../enums/authorization-status';
import type { AppRoute } from '../../../../enums/app-route';

type ProtectedRouteProps = {
  authorizationStatus: AuthorizationStatus;
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: ReactNode;
};

function ProtectedRoute({
  authorizationStatus,
  restrictedFor,
  redirectTo,
  children,
}: ProtectedRouteProps): ReactNode {
  return restrictedFor === authorizationStatus ? (
    <Navigate to={redirectTo} />
  ) : (
    children
  );
}

export default ProtectedRoute;
