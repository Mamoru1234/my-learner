import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { FetchData, FetchState } from "../../utils/fetch.utils";
import { DictionaryEntity } from "../entities/dictionary.entity";
import { dictionaryRepository } from "../repositories/dictionary.repository";

const sliceName = 'store/dictionaries';

export interface DictionariesStoreState {
  dictionaries: FetchData<DictionaryEntity[]>;
}

const initialState: DictionariesStoreState = {
  dictionaries: {
    state: FetchState.IDLE,
  },
};
export const loadDictionaries = createAsyncThunk(`${sliceName}/loadDictionaries`, () => dictionaryRepository.getAll());

export const deleteDictionary = createAsyncThunk(`${sliceName}/deleteDictionary`, async (id: string, { dispatch }) => {
  await dictionaryRepository.delete(id);
  return dispatch(loadDictionaries());
});

export const dictionariesSelector = (state: RootState) => state.store.dictionaries.dictionaries;

export const dictionariesSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadDictionaries.pending, (state) => {
      state.dictionaries = {
        state: FetchState.LOADING,
      };
    });
    builder.addCase(loadDictionaries.fulfilled, (state, action) => {
      state.dictionaries = {
        state: FetchState.LOADED,
        data: action.payload,
      };
    });
    builder.addCase(loadDictionaries.rejected, (state, action) => {
      state.dictionaries = {
        state: FetchState.FAILED,
        err: action.error,
      };
    });
  },
});
