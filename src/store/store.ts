// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import dogReducer from './features/dogSlicce';

export const store = configureStore({
  reducer: {
    dogs: dogReducer,
  },
 // devTools: import.meta.env.MODE !== 'production',
 devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;