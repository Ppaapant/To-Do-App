import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/config'; 
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';


export interface Contact {
  id: string;
  title: string;
  description: string;
}

interface UpdateContactPayload {
  id: string;
  title: string;
  description: string;
}

export const fetchContacts = createAsyncThunk<Contact[], void>(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const snapshot = await getDocs(collection(db, 'contacts'));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Contact, 'id'>),
      }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);


export const addContact = createAsyncThunk<Contact, Omit<Contact, 'id'>>(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const docRef = await addDoc(collection(db, 'contacts'), newContact);
      return { id: docRef.id, ...newContact };
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
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
    { id, title, description },
    thunkAPI
  ): Promise<Contact | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    try {
      const contactRef = doc(db, 'contacts', id);
      await updateDoc(contactRef, { title, description });

      return { id, title, description };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

