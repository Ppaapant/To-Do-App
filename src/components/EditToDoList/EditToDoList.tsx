import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTodoList } from "../../redux/todoList/todoListOp";
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";

interface ToDoEditFormProps {
  editId: string | null;
  setEditId: React.Dispatch<React.SetStateAction<string | null>>;
  currentName: string;
}

const ToDoEditForm: React.FC<ToDoEditFormProps> = ({ editId, setEditId, currentName }) => {
  const [editName, setEditName] = useState<string>(currentName);
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    setEditName(currentName);
  }, [currentName]);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editName.trim() && editId) {
      dispatch(updateTodoList({ id: editId, updatedName: editName }));
      setEditId(null);
      setEditName('');
    }
  };

  if (!isAdmin) {
    return <div className="text-center text-red-600 mt-4">You do not have permission to edit lists.</div>;
  }

  return (
    <form onSubmit={handleSaveEdit} className="flex justify-center mt-5">
      <input
        type="text"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        placeholder="Edit list name"
        className="p-2 text-lg mr-2 border rounded"
      />
      <button type="submit" className="p-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
    </form>
  );
};

export default ToDoEditForm;
