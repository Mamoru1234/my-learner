import { combineReducers } from "@reduxjs/toolkit";
import { listDictionariesSlice } from "./list/list-dictionaries.slice";

export const dictionariesReducer = combineReducers({
  list: listDictionariesSlice.reducer,
});
