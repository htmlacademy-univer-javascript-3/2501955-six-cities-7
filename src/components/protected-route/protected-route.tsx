import type { PropsWithChildren, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../enums/authorization-status';
import { AppRoute } from '../../enums/app-route';

type ProtectedRouteProps = PropsWithChildren<{
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
}>;

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
