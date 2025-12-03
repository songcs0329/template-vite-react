import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import GlobalStyles from '@/GlobalStyles';

export const Route = createRootRoute({
  component: () => (
    <>
      <GlobalStyles />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
