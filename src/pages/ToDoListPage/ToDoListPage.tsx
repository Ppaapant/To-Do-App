
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoLists } from "../../redux/todoList/todoListOp";
import { selectLoading, selectError } from "../../redux/todoList/selectors";
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">To-Do Lists</h1>
      <TaskForm />

      {loading && <p className="text-gray-500">Loading your to-do lists...</p>}

      {error && <p className="text-red-500">Error loading lists: {error}</p>}

      {!loading && !error && <ToDoList />}
    </div>
  );
};

export default ToDoListPage;
