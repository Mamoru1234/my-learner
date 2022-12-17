import { RouteObject } from "react-router-dom";
import { ListWordsPage } from "./list/list-words-page";
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