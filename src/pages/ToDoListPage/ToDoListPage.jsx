;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoLists } from "../../redux/todoList/todoListOp";
import { selectLoading, selectError } from "../../redux/todoList/selectors";
import css from "./ToDoListPage.module.css";
import TaskForm from "../../components/ToDoForm/ToDoForm";
import ToDoList from "../../components/TodoList/ToDoList";

const ToDoListPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTodoLists());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1>To-Do Lists</h1>
      <TaskForm/>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading lists</p>}
      <ToDoList />
    </div>
  );
};

export default ToDoListPage;
