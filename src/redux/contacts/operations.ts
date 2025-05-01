import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/config'; 
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Contact } from './types';




interface UpdateContactPayload {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const fetchContacts = createAsyncThunk<Contact[], void>(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const snapshot = await getDocs(collection(db, 'contacts'));
      const contacts: Contact[] = snapshot.docs.map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          title: typeof data.title === 'string' ? data.title : 'Untitled',
          description: typeof data.description === 'string' ? data.description : '',
          completed: typeof data.completed === 'boolean' ? data.completed : false, 
    }});

      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);


export const addContact = createAsyncThunk<Contact, Omit<Contact, 'id'>>(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const contactWithDefault = {
        ...newContact,
        completed: false, 
      };

      const docRef = await addDoc(collection(db, 'contacts'), contactWithDefault);
      return { id: docRef.id, ...contactWithDefault };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);


export const deleteContact = createAsyncThunk<{ id: string }, string>(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await deleteDoc(doc(db, 'contacts', contactId));
      return { id: contactId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);


export const updateContact = createAsyncThunk<
  Contact,
  UpdateContactPayload,
  {
    rejectValue: string;
  }
>(
  'contacts/update',
  async (
    { id, title, description, completed },
    thunkAPI
  ): Promise<Contact | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    try {
      const contactRef = doc(db, 'contacts', id);
      await updateDoc(contactRef, { title, description, completed }); 

      return { id, title, description, completed };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

