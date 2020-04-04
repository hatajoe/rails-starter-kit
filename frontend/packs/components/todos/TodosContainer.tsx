import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { RootState } from '../../app/rootReducer';

import { fetchTodos } from '../../features/todoSlice';

import TodoCard from './TodoCard';

const TodosContainer = ({ rootPath }: { rootPath: string }) => {
  const dispatch: AppDispatch = useDispatch();

  const { todos } = useSelector((state: RootState) => ({
    todos: state.todos.todos,
  }));

  React.useEffect(() => {
    (async () => {
      const action = await fetchTodos();
      if (action.error && 'message' in action.payload) {
        console.log(action.payload);
      } else {
        dispatch(action);
      }
    })();
  }, [dispatch]);

  return (
    <>
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default TodosContainer;
