import { useDispatch, useSelector } from "react-redux";
import {  deleteContact, updateContact } from "../../redux/contacts/operations";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import Task from "./Task";
import ContactForm from "./TaskForm";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../redux/store";
import { Contact } from "../../redux/contacts/types";
import { selectUser } from "../../redux/auth/selectors";
import { useParams } from "react-router-dom";

const ContactList = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector(selectFilteredContacts);
  const user = useSelector(selectUser);

  const [editTask, setEditTask] = useState<Contact | null>(null);  
  const [isEditMode, setIsEditMode] = useState<boolean>(false);  

  useEffect(() => {
    if (id) {
      const task = contacts.find((c) => c.id === id);
      if (task) {
        setEditTask(task);
        setIsEditMode(true);
      }
    }
  }, [id, contacts]);

  const handleDelete = (id: string): void => {
    dispatch(deleteContact(id));
  };

  const handleEdit = (task: Contact): void => {
    setEditTask(task);
    setIsEditMode(true);
  };

  const handleToggleComplete = (id: string, newCompleted: boolean): void => {
    const contact = contacts.find(contact => contact.id === id);
    if (contact) {
      dispatch(updateContact({ ...contact, completed: newCompleted }));
    }
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
          {contacts.map(({ id, title, description, completed }) => (
            <div key={id}> 
              <Task
                id={id}
                name={title}
                description={description}
                completed={completed}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
                isAdmin={user?.role === "admin"}  
              />
              {user?.role === "admin" && (
                <button onClick={() => handleEdit({ id, title, description, completed })}>
                  Edit
                </button>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;