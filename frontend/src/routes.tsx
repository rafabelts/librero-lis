import { createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound.tsx';
import AdminPage from './pages/Admin.tsx';
import LoansPage from './pages/Loans.tsx';
import Layout from './layout.tsx';
import UserDebtsPage from './pages/UserDebts.tsx';
import AddBookPage from './pages/AddBook.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    ErrorBoundary: NotFound,
    children: [
      {
        index: true,
        Component: UserDebtsPage,
      },
      {
        path: '/admin',

        children: [
          {
            index: true,
            Component: AdminPage,
          },
          {
            path: 'prestamos',
            Component: LoansPage,
          },
          {
            path: 'agregar/libro',
            Component: AddBookPage,
          },
        ],
      },
    ],
  },
]);
