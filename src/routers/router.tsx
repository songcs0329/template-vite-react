import { createBrowserRouter } from 'react-router';
import Home from '@/pages/Home';
import Todos from '@/pages/Todos';
import TodoDetail from '@/pages/Todos/TodoDetail';

export const pageRouter = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
  },
  {
    name: 'Todos',
    path: '/todos',
    children: [
      {
        index: true,
        element: <Todos />,
      },
      {
        path: ':todoId',
        element: <TodoDetail />,
      },
    ],
  },
];

const router = createBrowserRouter(pageRouter);

export default router;
