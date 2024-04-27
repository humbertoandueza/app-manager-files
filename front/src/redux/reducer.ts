
import { createReducer } from '@reduxjs/toolkit';
import { setUser, clearUser } from './auth/actions';
import { User } from '../interfaces';

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(clearUser, (state) => {
      state.user = null;
    });
});

export default authReducer;