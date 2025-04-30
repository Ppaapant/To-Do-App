import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthCredentials, AuthPayload, RegisterCredentials } from "./types";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";

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
        user: { name: user.displayName, email: user.email },
        token: await user.getIdToken(),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);


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
        user: { name: user.displayName, email: user.email },
        token: await user.getIdToken(),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);


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
            resolve({
              user: { name: user.displayName, email: user.email },
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