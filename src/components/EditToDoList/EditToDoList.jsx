import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import css from './ToDoEditForm.module.css';
import { updateTodoList } from "../../redux/todoList/todoListOp";

const ToDoEditForm = ({ editId, setEditId }) => {
  const [editName, setEditName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setEditName('Current List Name'); 
  }, [editId]);

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editName.trim()) {
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