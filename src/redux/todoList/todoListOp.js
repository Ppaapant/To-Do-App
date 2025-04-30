import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

// Отримати всі списки
export const fetchTodoLists = createAsyncThunk(
  "todolists/fetchAll",
  async (_, thunkAPI) => {
    try {
      const snapshot = await getDocs(collection(db, "todoLists"));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const addTodoList = createAsyncThunk(
    "todolists/add",
    async (newList, thunkAPI) => {
      try {
       
        const docRef = await addDoc(collection(db, "todoLists"), {
          title: newList.title,  
        });
        return { id: docRef.id, ...newList };
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );


export const deleteTodoList = createAsyncThunk(
  "todolists/delete",
  async (id, thunkAPI) => {
    try {
      if (!id) throw new Error("Missing ID for deletion");
      await deleteDoc(doc(db, "todoLists", id));
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const updateTodoList = createAsyncThunk(
    "todolists/update",
    async ({ id, updatedName }, thunkAPI) => {
      try {
        if (!id || !updatedName) {
          throw new Error("Missing ID or name for update");
        }
        await updateDoc(doc(db, "todoLists", id), { title: updatedName });
        return { id, title: updatedName };
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
