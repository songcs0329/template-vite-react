import { useLoaderData } from '@tanstack/react-router';

function TodoDetail() {
  const { todo } = useLoaderData({ from: '/todos/$todoId' });

  if (!todo) return null;

  return (
    <ul>
      <li>Title: {todo.title}</li>
      <li>ID: {todo.id}</li>
      <li>User ID: {todo.userId}</li>
      <li>Completed: {todo.completed.toString()}</li>
    </ul>
  );
}

export default TodoDetail;
