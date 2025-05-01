
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoList } from '../../redux/todoList/todoListOp'; 
import { AppDispatch } from '../../redux/store';

interface NewTodoList {
  title: string; 
}

const CreateToDoList: React.FC = () => {
  const [listName, setListName] = useState<string>(''); 
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (listName.trim()) {
      const newTodoList: NewTodoList = { title: listName }; 
      dispatch(addTodoList(newTodoList)); 
      setListName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={listName} 
        onChange={(e) => setListName(e.target.value)} 
        placeholder="Enter To-Do List Name" 
      />
      <button type="submit">Create List</button>
    </form>
  );
};

export default CreateToDoList;