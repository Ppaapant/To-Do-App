import { useDispatch, useSelector } from "react-redux";
import { Contact, deleteContact } from "../../redux/contacts/operations";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import Task from "./Task";
import ContactForm from "./TaskForm";
import { useState } from "react";
import { AppDispatch } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";

const ContactList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useAppSelector(selectFilteredContacts);

  const [editTask, setEditTask] = useState<Contact | null>(null);  
  const [isEditMode, setIsEditMode] = useState<boolean>(false);  

  const handleDelete = (id: string): void => {
    dispatch(deleteContact(id));
  };

  const handleEdit = (task: Contact): void => {
    setEditTask(task);
    setIsEditMode(true);
  };

  return (
    <div>
      {isEditMode && editTask ? (
        <ContactForm
          task={editTask}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
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
              <button onClick={() => handleEdit({ id, title, description })}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
