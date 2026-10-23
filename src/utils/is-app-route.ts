import { AppRoute } from '../enums/app-route';

export function isAppRoute(pathname: string): pathname is AppRoute {
  return Object.values(AppRoute).some((route) => route as string === pathname);
}
