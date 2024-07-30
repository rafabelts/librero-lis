import { NavBar } from './components/NavBar/NavBar';
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { BackIcon } from './assets/backIcon';
import { useEffect, useMemo } from 'react';
import { Toaster } from 'sonner';
import { useAppContext } from './context/ctxt';

const titlePaths: Record<string, string> = {
  '/': 'Mis adeudos',
  '/admin': 'Libros en el librero',
  '/admin/prestamos': 'Libros en prestamo',
  '/admin/alumnos': 'Alumnos registrados',
  '/admin/agregar/libro': 'Agregar nuevo libro',
  '/configuracion': 'Configuracion',
};

const hideNavBarPaths = new Set([
  '/admin/agregar/libro',
  '/admin/libro/:isbn',
  '/admin/devolucion',
  '/agregar/prestamo',
]);

export default function Layout() {
  const { isAdmin } = useLoaderData();
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const { showNavBar, title, goBackPath } = useMemo(
    () => ({
      showNavBar:
        !hideNavBarPaths.has(path) && !path.startsWith('/admin/libro'),
      title:
        path.startsWith('/admin/libro') ||
        path.includes('devolucion') ||
        path.startsWith('/agregar/prestamo')
          ? ''
          : path.includes('configuracion')
          ? 'Configuracion'
          : titlePaths[path] || 'Not Found',

      goBackPath: path.includes('admin') ? '/admin' : '/',
    }),
    [path]
  );

  useEffect(() => {
    if (isAdmin) navigate('/admin', { replace: true });
    else navigate('/', { replace: true });
  }, [isAdmin]);

  return (
    <div>
      {showNavBar && <NavBar title={title} />}
      <main>
        {!showNavBar && (
          <>
            <BackIcon path={goBackPath} />
            <h1>{title}</h1>
          </>
        )}
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
}
