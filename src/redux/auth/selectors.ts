import { RootState } from "../store"; 


export const selectIsLoggedIn = (state: RootState): boolean => !!state.auth.user;


export const selectUser = (state: RootState) => state.auth.user;


export const selectIsRefreshing = (state: RootState): boolean => state.auth.loading;