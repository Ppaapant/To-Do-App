import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteToDoList } from './redux/operations'; // Операція для видалення списку

const DeleteToDoList = ({ listId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteToDoList(listId));
  };

  return (
    <button onClick={handleDelete}>
      Delete List
    </button>
  );
};

export default DeleteToDoList;