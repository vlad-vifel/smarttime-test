import './App.css'
import { createBrowserRouter, RouterProvider, Router } from 'react-router-dom'

import Page404 from './components/pages/404/404'
import Schedule from './components/pages/schedule/Schedule'
import Root from './components/root/Root'

const routes = [
  {
    path: '/',
    exact: true,
    element: <Root />,
    errorElement: <Root />,
    children: [
      {
        path: '',
        element: <Page404 />,
      },
      {
        path: 'profile',
        element: <Page404 />,
      },
      {
        path: 'notifications',
        element: <Page404 />,
      },
      {
        path: 'schedule',
        element: <Schedule />,
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ]
  },
];

const router = createBrowserRouter(routes)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
