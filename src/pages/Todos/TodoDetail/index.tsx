import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import apiManager from '@/libs/apis/apiManager';

function TodoDetail() {
  const { todoId } = useParams<{ todoId: string }>();
  const [todo, setTodo] = useState<ApiResponse.GetTodoResponse | null>(null);

  useEffect(() => {
    if (todoId) {
      apiManager.getTodo(Number(todoId)).then(({ data }) => {
        setTodo(data);
      });
    }
  }, [todoId]);

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
