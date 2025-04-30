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


export interface TodoList {
  id: string;
  title: string;
}

export interface NewTodoList {
  title: string;
}


export const fetchTodoLists = createAsyncThunk<TodoList[]>(
  "todolists/fetchAll",
  async (_, thunkAPI) => {
    try {
      const snapshot = await getDocs(collection(db, "todoLists"));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as TodoList));
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const addTodoList = createAsyncThunk<TodoList, NewTodoList>(
  "todolists/add",
  async (newList, thunkAPI) => {
    try {
      const docRef = await addDoc(collection(db, "todoLists"), {
        title: newList.title,
      });
      return { id: docRef.id, title: newList.title };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const deleteTodoList = createAsyncThunk<string, string>(
  "todolists/delete",
  async (id, thunkAPI) => {
    try {
      if (!id) throw new Error("Missing ID for deletion");
      await deleteDoc(doc(db, "todoLists", id));
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTodoList = createAsyncThunk<TodoList, { id: string; updatedName: string }>(
  "todolists/update",
  async ({ id, updatedName }, thunkAPI) => {
    try {
      await updateDoc(doc(db, "todoLists", id), { title: updatedName });
      return { id, title: updatedName };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
