import { createSlice } from "@reduxjs/toolkit";
import { fetchTodoLists, addTodoList, deleteTodoList, updateTodoList } from "./todoListOp";

const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodoLists.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchTodoLists.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodoLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addTodoList.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(deleteTodoList.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })

      .addCase(updateTodoList.fulfilled, (state, action) => {
        const { id, title } = action.payload;
        const index = state.items.findIndex(item => item.id === id);
        if (index !== -1) {
          state.items[index].title = title;
        }
      })
  }
});

export const todolistsReducer = todolistsSlice.reducer;
