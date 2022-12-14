import { FetchData, FetchState } from "../utils/fetch.utils";

export interface FetchContainerProps<T> {
  entity: string;
  data: FetchData<T>;
  children: (props: T) => React.ReactElement;
}

export function FetchContainer<T>({ children, data, entity }: FetchContainerProps<T>) {
  if (data.state === FetchState.IDLE || data.state === FetchState.LOADING) {
    return (
      <div>Loading {entity}</div>
    );
  }
  if (data.state === FetchState.FAILED) {
    console.log(data.err);
    return (
      <div>Failed to load {entity}</div>
    );
  }
  return children(data.data);
}
