
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToDoList } from './redux/operations'; // Імпорт вашої операції для додавання списку завдань

const CreateToDoList = () => {
  const [listName, setListName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim()) {
      dispatch(addToDoList(listName));
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
