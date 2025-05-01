import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store"; 


export const selectIsLoggedIn = (state: RootState): boolean => !!state.auth.user;


export const selectUser = (state: RootState) => state.auth.user;
const adminEmails = ["andriy.chornenko@ukr.net"];

export const selectIsAdmin = createSelector(
    [selectUser],
    (user) => {
      return user?.email && adminEmails.includes(user.email);
    }
  );

export const selectIsRefreshing = (state: RootState): boolean => state.auth.loading;