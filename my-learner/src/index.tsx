import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { RootPage } from './pages/root';
import { MainPage } from './pages/main/main';
import { ErrorPage } from './pages/error';
import { NewWordPage } from './pages/new-word/new-word';
import { dictionaryRoutes } from './pages/dictionaries';

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <MainPage/>
      },
      {
        path: '/dictionaries',
        element: <Outlet/>,
        children: dictionaryRoutes,
      },
      {
        path: '/words/new',
        element: <NewWordPage/>
      },
    ],
  },
]);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
