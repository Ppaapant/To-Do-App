import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./operations";
import { AuthPayload } from "./types";

const initialState = {
  user: null as AuthPayload["user"] | null,
  token: null as string | null,
  loading: false,
  error: null as string | null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action: any) => {  
        state.loading = false;
        state.error = action.payload?.message ?? 'Unknown error'; 
      })
      .addCase(logIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(logIn.rejected, (state, action: any) => {  
        state.loading = false;
        state.error = action.payload?.message ?? 'Unknown error';  
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(refreshUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(refreshUser.rejected, (state, action: any) => {  
        state.loading = false;
        state.error = action.payload?.message ?? 'Unknown error';  
      });
  },
});

export default authSlice.reducer;