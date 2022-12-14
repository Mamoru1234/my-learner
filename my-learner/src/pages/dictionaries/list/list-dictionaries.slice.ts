import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DictionaryEntity } from "../../../store/entities/dictionary.entity";
import { dictionaryRepository } from "../../../store/repositories/dictionary.repository";
import { FetchData, FetchState } from "../../../utils/fetch.utils";
export interface ListDictionariesPageState {
  dictionariesData: FetchData<DictionaryEntity[]>;
};

const initialState: ListDictionariesPageState = {
  dictionariesData: {
    state: FetchState.IDLE,
  },
};

export const loadDictionaries = createAsyncThunk('pages/dictionaries/list/loadDictionaries', () => dictionaryRepository.getAll());

export const deleteDictionary = createAsyncThunk('pages/dictionaries/list/deleteDictionary', async (id: string, { dispatch }) => {
  await dictionaryRepository.delete(id);
  return dispatch(loadDictionaries());
});

export const listDictionariesSlice = createSlice({
  name: 'pages/dictionaries/list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadDictionaries.pending, (state) => {
      state.dictionariesData = {
        state: FetchState.LOADING,
      };
    });
    builder.addCase(loadDictionaries.fulfilled, (state, action) => {
      state.dictionariesData = {
        state: FetchState.LOADED,
        data: action.payload,
      };
    });
    builder.addCase(loadDictionaries.rejected, (state, action) => {
      state.dictionariesData = {
        state: FetchState.FAILED,
        err: action.error,
      };
    });
  },
});
