import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;

export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;


export const selectFilteredContacts = createSelector(
  [selectContacts], 
  (contacts) => {
    if (Array.isArray(contacts)) { 
      return contacts;
    }
    return []; 
  }
);