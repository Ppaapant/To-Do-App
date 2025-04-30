import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import Task from "./Task";
import ContactForm from "./TaskForm";
import { useState } from "react";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const [editTask, setEditTask] = useState(null);  
  const [isEditMode, setIsEditMode] = useState(false);  

  const handleDelete = (id) => {
    dispatch(deleteContact(id));  
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setIsEditMode(true);  
  };

  return (
    <div>
      {isEditMode ? (
        <ContactForm task={editTask} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
      ) : (
        <ul>
          {contacts.map(({ id, title, description }) => (
            <li key={id}>
              <Task
                id={id}
                name={title}
                description={description}
                onDelete={handleDelete}
              />
              <button onClick={() => handleEdit({ id, title, description })}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
