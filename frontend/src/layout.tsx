import { NavBar } from './components/NavBar/NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import { BackIcon } from './assets/backIcon';
import { useMemo } from 'react';
import { Toaster } from 'sonner';

const titlePaths: Record<string, string> = {
  '/': 'Mis adeudos',
  '/admin': 'Libros en el librero',
  '/admin/prestamos': 'Libros en prestamo',
  '/admin/alumnos': 'Alumnos registrados',
  '/admin/agregar/libro': 'Agregar nuevo libro',
  '/admin/devolucion': ' ',
  '/agregar/prestamo': ' ',
  '/configuracion': 'Configuracion',
};

const hideNavBarPaths = new Set([
  '/admin/agregar/libro',
  '/admin/libro/:isbn',
  '/admin/devolucion',
  '/agregar/prestamo',
]);

export default function Layout() {
  const path = useLocation().pathname;

  const { showNavBar, title, goBackPath } = useMemo(
    () => ({
      showNavBar:
        !hideNavBarPaths.has(path) && !path.startsWith('/admin/libro'),
      title: path.startsWith('/admin/libro')
        ? ''
        : titlePaths[path] || 'Not Found',

      goBackPath: path.includes('admin') ? '/admin' : '/',
    }),
    [path]
  );

  return (
    <div>
      {showNavBar && <NavBar title={title} />}
      <main>
        {!showNavBar && (
          <>
            <BackIcon path={goBackPath} />
            <h1>{title}</h1>{' '}
          </>
        )}
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
}
