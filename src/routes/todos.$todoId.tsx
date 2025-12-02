import { createFileRoute } from '@tanstack/react-router';
import apiManager from '@/libs/apis/apiManager';
import TodoDetail from '@/pages/Todos/TodoDetail';

export const Route = createFileRoute('/todos/$todoId')({
  loader: async ({ params }) => {
    const { data } = await apiManager.getTodo(Number(params.todoId));
    return { todo: data };
  },
  component: TodoDetail,
});
