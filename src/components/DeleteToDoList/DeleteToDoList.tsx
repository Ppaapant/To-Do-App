import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodoList } from '../../redux/todoList/todoListOp'; 
import { AppDispatch } from '../../redux/store';

interface DeleteToDoListProps {
  listId: string; 
}

const DeleteToDoList: React.FC<DeleteToDoListProps> = ({ listId }) => {
   const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteTodoList(listId)); 
  };

  return (
    <button onClick={handleDelete}>
      Delete List
    </button>
  );
};

export default DeleteToDoList;