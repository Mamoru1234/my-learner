import { combineReducers } from "@reduxjs/toolkit";
import { dictionariesSlice } from "./slices/dictionaries.slice";
import { settingsSlice } from "./slices/settings.slice";
import { wordsSlice } from "./slices/words.slice";

export const storeReducer = combineReducers({
  dictionaries: dictionariesSlice.reducer,
  settings: settingsSlice.reducer,
  words: wordsSlice.reducer,
});
