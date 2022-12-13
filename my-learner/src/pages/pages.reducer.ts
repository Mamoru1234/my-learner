import { combineReducers } from "@reduxjs/toolkit"
import { dictionariesReducer } from "./dictionaries/dictionaries.reducer";

export const pagesReducer = combineReducers({
  dictionaries: dictionariesReducer,
});
