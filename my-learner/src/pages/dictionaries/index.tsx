import { RouteObject } from "react-router-dom";
import { ListDictionariesPage } from "./list/list";
import { NewDictionaryPage } from "./new/new";

export const dictionaryRoutes: RouteObject[] = [
  {
    path: '/dictionaries/list',
    element: <ListDictionariesPage/>
  },
  {
    path: '/dictionaries/new',
    element: <NewDictionaryPage/>
  }
];
