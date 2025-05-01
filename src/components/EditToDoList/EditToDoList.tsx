import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import css from './ToDoEditForm.module.css';
import { updateTodoList } from "../../redux/todoList/todoListOp";
import { AppDispatch } from "../../redux/store";

interface ToDoEditFormProps {
  editId: string | null;
  setEditId: React.Dispatch<React.SetStateAction<string | null>>;
  currentName: string;
}

const ToDoEditForm: React.FC<ToDoEditFormProps> = ({ editId, setEditId, currentName }) => {
  const [editName, setEditName] = useState<string>(currentName);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setEditName(currentName); // Оновлення при зміні currentName
  }, [currentName]);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editName.trim() && editId) { 
      dispatch(updateTodoList({ id: editId, updatedName: editName }));
      setEditId(null); 
      setEditName(''); 
    }
  };

  return (
    <form onSubmit={handleSaveEdit} className={css.form}>
      <input
        type="text"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        placeholder="Edit list name"
        className={css.input}
      />
      <button type="submit" className={css.button}>Save</button>
    </form>
  );
};

export default ToDoEditForm;

