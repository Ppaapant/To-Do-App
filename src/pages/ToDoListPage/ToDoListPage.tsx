;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoLists } from "../../redux/todoList/todoListOp";
import { selectLoading, selectError } from "../../redux/todoList/selectors";
import css from "./ToDoListPage.module.css";
import TaskForm from "../../components/ToDoForm/ToDoForm";
import ToDoList from "../../components/TodoList/ToDoList";
import { AppDispatch, RootState } from "../../redux/store";

const ToDoListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  
  const loading = useSelector((state: RootState) => selectLoading(state));
  const error = useSelector((state: RootState) => selectError(state));

  useEffect(() => {
    dispatch(fetchTodoLists());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1>To-Do Lists</h1>
      <TaskForm />

      {loading && <p>Loading your to-do lists...</p>}

      {error && <p className={css.error}>Error loading lists: {error}</p>}

      
      {!loading && !error && <ToDoList />}
    </div>
  );
};

export default ToDoListPage;
