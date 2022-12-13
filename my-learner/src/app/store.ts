import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { pagesReducer } from '../pages/pages.reducer';
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    pages: pagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
