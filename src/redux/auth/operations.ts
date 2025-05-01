import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthCredentials, AuthPayload, RegisterCredentials } from "./types";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { doc, getDoc } from "@firebase/firestore";

export const register = createAsyncThunk<
  AuthPayload,  
  RegisterCredentials,  
  { rejectValue: string }  
>(
  "auth/register",
  async ({ email, password, name }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      const user = userCredential.user;
      return {
        user: { name: user.displayName, email: user.email, role: "admin" }, 
        token: await user.getIdToken(),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// Логін користувача
export const logIn = createAsyncThunk<
  AuthPayload,
  AuthCredentials,
  { rejectValue: string }
>(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      return {
        user: { name: user.displayName, email: user.email, role: "viewer" }, 
        token: await user.getIdToken(),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// Логаут
export const logOut = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);


export const refreshUser = createAsyncThunk<
  AuthPayload,
  void,
  { rejectValue: string }
>(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      return await new Promise<AuthPayload>((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          unsubscribe();

          if (user) {
            const token = await user.getIdToken();

            
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();

            resolve({
              user: {
                name: user.displayName, 
                email: user.email,
                role: userData?.role || "viewer",  
              },
              token,
            });
          } else {
            reject("Unable to fetch user");
          }
        });
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);