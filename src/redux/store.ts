import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/slice";
import contactsSlice from "./contacts/slice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { todolistsReducer } from "./todoList/todoListslice";

 


const persistedAuthReducer = persistReducer(
    {
    key: 'user-token',
    storage,
    whitelist:['token'],
  },
   authSlice)





export const store = configureStore({
    reducer: {
        contacts: contactsSlice,
        auth: persistedAuthReducer,
        todolists: todolistsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);