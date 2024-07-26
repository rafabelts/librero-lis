import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/NotFound.tsx';
import AdminPage from './pages/Admin.tsx';
import LoansPage from './pages/Loans.tsx';
import Layout from './layout.tsx';
import UserDebtsPage from './pages/UserDebts.tsx';
import AddBookPage from './pages/AddBook.tsx';
import BookInfoPage from './pages/BookInfo.tsx';
import StudentsPage from './pages/Students.tsx';
import BookScanner from './pages/Scanner.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        ErrorBoundary: NotFoundPage,
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
                        path: 'alumnos',
                        Component: StudentsPage,
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
                path: '/agregar/prestamo',
                Component: BookScanner,
            },
        ],
    },
]);
