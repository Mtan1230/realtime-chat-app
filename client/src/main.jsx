import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

import App from './App.jsx';
import HomePage from './pages/HomePage';
import WorkspacePage from './pages/WorkspacePage';
import ErrorPage from './pages/ErrorPage';
import ChannelPage from './pages/ChannelPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'workspace/:id',
        element: <WorkspacePage />,
        children: [
          {
            index: true,
            element: <ChannelPage />,
          },
          {
            path: ':channelId',
            element: <ChannelPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
