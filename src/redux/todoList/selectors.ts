import { RootState } from "../store"; 
export interface ListToDo {
    id: string;
    title: string;
  }

  export const selectTodoLists = (state: RootState): ListToDo[] =>
    state.todolists.items.filter((item): item is ListToDo => typeof item.title === "string");

export const selectLoading = (state: RootState): boolean => state.todolists.loading;

export const selectError = (state: RootState): string | null => state.todolists.error;

