import { RouteObject } from "react-router-dom";
import { ListWordsPage } from "./list/list-words";
import { NewWordPage } from './new-word/new-word';

export const wordsRoutes: RouteObject[] = [
  {
    path: '/words/list',
    element: <ListWordsPage/>,
  },
  {
    path: '/words/new',
    element: <NewWordPage/>
  },
];