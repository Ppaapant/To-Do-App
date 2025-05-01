import { useDispatch, useSelector } from "react-redux";
import { deleteTodoList } from "../../redux/todoList/todoListOp"; 
import { selectTodoLists, selectLoading, selectError } from "../../redux/todoList/selectors";
import { useState } from "react"; 
import List from "../ToDoItem/ToDoItem";
import ToDoEditForm from "../EditToDoList/EditToDoList";
import { AppDispatch } from "../../redux/store";
import { selectUser } from "../../redux/auth/selectors";

interface TodoList {
  id: string;
  title: string;
  
}

const ListList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const lists = useSelector(selectTodoLists) as TodoList[]; 
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const user = useSelector(selectUser);

  const [editId, setEditId] = useState<string | null>(null); 

  const handleDelete = (id: string) => {
   
    if (user?.role === "admin") {
      dispatch(deleteTodoList(id)); 
    }
  };

 
  const isAdmin = user?.role === "admin";

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading lists</p>}
      {editId ? (
        <ToDoEditForm editId={editId} setEditId={setEditId} currentName={""} />
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
                isAdmin={isAdmin} 
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