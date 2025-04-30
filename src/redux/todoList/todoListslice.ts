import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTodoLists, addTodoList, deleteTodoList, updateTodoList } from "./todoListOp";

export interface TodoList {
  id: string;
  title?: string;
}

interface TodoListsState {
  items: TodoList[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoListsState = {
  items: [],
  loading: false,
  error: null,
};

const todolistsSlice = createSlice({
  name: 'todolists',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTodoLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodoLists.fulfilled, (state, action: PayloadAction<TodoList[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodoLists.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addTodoList.fulfilled, (state, action: PayloadAction<TodoList>) => {
        state.items.push(action.payload);
      })

      .addCase(deleteTodoList.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })

      .addCase(updateTodoList.fulfilled, (state, action: PayloadAction<{ id: string; title: string }>) => {
        const { id, title } = action.payload;
        const index = state.items.findIndex(item => item.id === id);
        if (index !== -1) {
          state.items[index].title = title;
        }
      });
  },
});

export const todolistsReducer = todolistsSlice.reducer;

