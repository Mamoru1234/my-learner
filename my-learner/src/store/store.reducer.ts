import { combineReducers } from "@reduxjs/toolkit";
import { dictionariesSlice } from "./slices/dictionaries.slice";
import { settingsSlice } from "./slices/settings.slice";

export const storeReducer = combineReducers({
  dictionaries: dictionariesSlice.reducer,
  settings: settingsSlice.reducer,
});
