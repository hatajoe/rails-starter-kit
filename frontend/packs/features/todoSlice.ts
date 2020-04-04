import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TodoState = {
  todos: Array<Todo>;
};

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    fetchTodos: {
      reducer: (
        state: TodoState,
        action: PayloadAction<
          | {
              todos: Array<Todo>;
            }
          | Error,
          string,
          never,
          boolean
        >
      ) => {
        console.log('action');
        if ('todos' in action.payload) {
          console.log(action.payload);
          state.todos = action.payload.todos;
        }
      },
      prepare: (
        payload:
          | {
              todos: Array<Todo>;
            }
          | Error
      ) => {
        return {
          payload,
          error: true,
        };
      },
    },
  },
});

export const fetchTodos = async (): Promise<
  ReturnType<typeof todoSlice.actions.fetchTodos>
> => {
  const todos: Array<Todo> = [
    { id: 1, title: '卵を買う', dueDate: '2020-05-11' },
    { id: 2, title: '机を片付ける', dueDate: '2020-05-11' },
    { id: 3, title: '電話を掛ける', dueDate: '2020-05-12' },
  ];
  return todoSlice.actions.fetchTodos({ todos: todos });
};

export default todoSlice.reducer;
