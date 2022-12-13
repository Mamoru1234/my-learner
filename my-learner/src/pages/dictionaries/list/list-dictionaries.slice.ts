import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DictionaryEntity } from "../../../store/entities/dictionary.entity";
import { dictionaryRepository } from "../../../store/repositories/dictionary.repository";

export enum FetchState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  FAILED = 'FAILED',
}

export interface IdleData {
  state: FetchState.IDLE;
}

export interface LoadingData {
  state: FetchState.LOADING;
}

export interface LoadedData<T> {
  state: FetchState.LOADED;
  data: T;
}

export interface FailedData {
  state: FetchState.FAILED;
  err: any;
}

export type FetchData<T> = IdleData | LoadingData | LoadedData<T> | FailedData;

export interface ListDictionariesPageState {
  dictionariesData: FetchData<DictionaryEntity[]>;
};

const initialState: ListDictionariesPageState = {
  dictionariesData: {
    state: FetchState.IDLE,
  },
};

export const loadDictionaries = createAsyncThunk('pages/dictionaries/list/loadDictionaries', () => dictionaryRepository.getAll());

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
