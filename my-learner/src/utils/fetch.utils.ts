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
