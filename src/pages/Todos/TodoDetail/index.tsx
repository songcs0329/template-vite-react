import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import apiManager from '@/libs/apis/apiManager';

function TodoDetail() {
  const { todoId } = useParams();

  const [todo, setTodo] = useState<TemplateType.Todo | null>(null);

  const fetchTodo = useCallback(async () => {
    try {
      const { data } = await apiManager.getTodo(Number(todoId));
      setTodo(data);
    } catch (error) {
      console.error(error);
    }
  }, [todoId]);

  useEffect(() => {
    if (todoId) {
      fetchTodo();
    }
  }, [fetchTodo, todoId]);

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
