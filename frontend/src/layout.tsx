import { NavBar } from './components/NavBar/NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import { BackIcon } from './assets/backIcon';
import { useMemo } from 'react';
import { Toaster } from 'sonner';

const titlePaths: Record<string, string> = {
    '/': 'Mis préstamos',
    '/admin': 'Libros',
    '/admin/prestamos': 'En préstamo',
    '/admin/alumnos': 'Alumnos',
    '/admin/agregar/libro': 'Agregar nuevo libro',
    '/configuracion/nombre': 'Cambiar nombre',
    '/configuracion/eliminar': 'Eliminación de cuenta',
};

const hideNavBarPaths = new Set([
    '/admin/agregar/libro',
    '/admin/libro/:isbn',
    '/admin/devolucion',
    '/agregar/prestamo',
    '/configuracion/nombre',
    '/configuracion/contrasena',
    '/configuracion/eliminar',
    '/admin/configuracion/contrasena',
]);

const pathMappings = {
    '/admin/configuracion': '/admin/configuracion',
    '/configuracion': '/configuracion',
    '/admin/libro': '/admin',
};

const defaultPath = '/';

function getGoBackPath(currentPath: string) {
    for (const [pathFragment, goBackPath] of Object.entries(pathMappings)) {
        if (currentPath.includes(pathFragment)) {
            return goBackPath;
        }
    }
    return defaultPath;
}

export default function Layout() {
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
                    : path === '/configuracion' || path === '/admin/configuracion'
                        ? 'Configuración'
                        : path.includes('/configuracion/contrasena')
                            ? 'Cambiar contraseña'
                            : titlePaths[path] || 'Not Found',

            goBackPath: getGoBackPath(path),
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
                        <h1>{title}</h1>
                    </>
                )}
                <Outlet />
                <Toaster />
            </main>
        </div>
    );
}
