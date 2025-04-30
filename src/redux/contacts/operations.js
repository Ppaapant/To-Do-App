import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/config'; 
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';

// Функція для отримання контактів
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const contactsRef = collection(db, 'contacts'); 
      const snapshot = await getDocs(contactsRef);
      const contacts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(contacts);
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Функція для додавання нового контакту

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const contactsRef = collection(db, 'contacts');  
      const docRef = await addDoc(contactsRef, newContact); 
      const addedContact = { id: docRef.id, ...newContact };  
      return addedContact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);  
    }
  }
);

// Функція для видалення контакту
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const contactRef = doc(db, 'contacts', contactId); 
      await deleteDoc(contactRef);
      return { id: contactId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/update",
  async ({ id, title, description }, thunkAPI) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, { title, description });
      return { id, title, description }; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

