// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import groupReducer from './groupsTravelSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    group: groupReducer
  },
});

// Inferimos los tipos de state y dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
