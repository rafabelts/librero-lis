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
  checkIfUserIsAdmin,
  checkIfUserVerified,
  checkUser,
} from './utils/routeLoaders.ts';
import LogInPage from './pages/LogIn.tsx';
import VerifyEmailPage from './pages/VerifyEmail.tsx';
import SettingsPage from './pages/Settings.tsx';
import ChangePasswordScreen from './pages/ChangePassword.tsx';
import ChangeNameScreen from './pages/ChangeName.tsx';
import SendRecoverEmailPage from './pages/SendRecoverEmail.tsx';
import DeleteUserPage from './pages/DeleteUser.tsx';

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
      {
        path: 'configuracion',
        element: <Outlet />,
        children: [
          {
            index: true,
            Component: SettingsPage,
          },
          {
            path: 'nombre',
            Component: ChangeNameScreen,
          },
          {
            path: 'contrasena',
            Component: ChangePasswordScreen,
          },
          {
            path: 'eliminar',
            Component: DeleteUserPage,
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    loader: checkIfUserIsAdmin,
    Component: Layout,
    ErrorBoundary: NotFoundPage,
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
        children: [
          {
            index: true,
            Component: SettingsPage,
          },
          {
            path: 'contrasena',
            Component: ChangePasswordScreen,
          },
        ],
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
      {
        path: 'recuperacion',
        Component: SendRecoverEmailPage,
      },
    ],
  },
  {
    path: '/verify',
    loader: checkIfUserVerified,
    Component: VerifyEmailPage,
  },
]);
