// src/redux/auth/actions.ts
import { createAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces';

export const setUser = createAction<User>('SET_USER');
export const clearUser = createAction('CLEAR_USER');


