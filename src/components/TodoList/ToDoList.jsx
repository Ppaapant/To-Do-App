import { useDispatch, useSelector } from "react-redux";
import { deleteTodoList } from "../../redux/todoList/todoListOp"; // Імпортуємо дію для оновлення списку
import { selectTodoLists, selectLoading, selectError } from "../../redux/todoList/selectors";
import { useState } from "react"; // Для керування станом редагування
import List from "../ToDoItem/ToDoItem";
import ToDoEditForm from "../EditToDoList/EditToDoList"

const ListList = () => {
  const dispatch = useDispatch();
  const lists = useSelector(selectTodoLists);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [editId, setEditId] = useState(null); // Стан для збереження id списку для редагування

  const handleDelete = (id) => {
    dispatch(deleteTodoList(id));
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading lists</p>}
      {editId ? (
        // Якщо є editId, відображаємо форму редагування
        <ToDoEditForm editId={editId} setEditId={setEditId} />
      ) : (
        <ul>
  {lists.length > 0 ? (
    lists.map(({ id, title }) => (
      <List
        key={id}
        id={id}
        title={title}
        onDelete={handleDelete}
        onEdit={setEditId}
      />
    ))
  ) : (
    <p>No lists found</p>
  )}
</ul>
      )}
    </div>
  );
};

export default ListList;
