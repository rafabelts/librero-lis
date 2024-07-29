import { createBrowserRouter, Outlet } from 'react-router-dom';
import NotFoundPage from './pages/NotFound.tsx';
import AdminPage from './pages/Admin.tsx';
import LoansPage from './pages/Loans.tsx';
import Layout from './layout.tsx';
import UserDebtsPage from './pages/UserLoans.tsx';
import AddBookPage from './pages/AddBook.tsx';
import BookInfoPage from './pages/BookInfo.tsx';
import StudentsPage from './pages/Students.tsx';
import BookScanner from './pages/Scanner.tsx';
import SignUpPage from './pages/SignUp.tsx';
import {
  authLoader,
  checkIfUserVerified,
  checkUser,
} from './utils/routeLoaders.ts';
import LogInPage from './pages/LogIn.tsx';
import VerifyEmailPage from './pages/VerifyEmail.tsx';
import SettingsPage from './pages/Settings.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: checkUser,
    Component: Layout,
    ErrorBoundary: NotFoundPage,
    children: [
      {
        index: true,
        Component: UserDebtsPage,
      },
      {
        path: '/agregar/prestamo',
        Component: BookScanner,
      },
      { path: 'configuracion', Component: SettingsPage },

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
            path: 'alumnos',
            Component: StudentsPage,
          },
          {
            path: 'configuracion',
            Component: SettingsPage,
          },
          {
            path: 'agregar/libro',
            Component: AddBookPage,
          },
          {
            path: 'libro/:isbn',
            Component: BookInfoPage,
          },
          {
            path: 'devolucion',
            Component: BookScanner,
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    loader: authLoader,
    element: <Outlet />,
    ErrorBoundary: NotFoundPage,
    children: [
      {
        path: 'signup',
        Component: SignUpPage,
      },
      {
        path: 'login',
        Component: LogInPage,
      },
    ],
  },
  {
    path: '/verify',
    loader: checkIfUserVerified,
    Component: VerifyEmailPage,
  },
]);
