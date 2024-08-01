import { AddIcon } from '../assets/addIcon';
import { HomeIcon } from '../assets/homeIcon';
import { LoansIcon } from '../assets/loanBookIcon';
import { PersonIcon } from '../assets/personIcon';
import { QrIcon } from '../assets/qrIcon';
import { SettingsIcon } from '../assets/settingsIcon';
import { NavItemType } from '../types';
import styles from '../components/NavBar/NavBar.module.css';

const navItems: Record<string, Array<NavItemType>> = {
  student: [
    { text: 'Inicio', path: '/', icon: <HomeIcon /> },
    {
      text: 'Configuración',
      path: '/configuracion',
      icon: <SettingsIcon />,
    },
    {
      text: 'Agregar Préstamo',
      path: '/agregar/prestamo',
      icon: <QrIcon />,
      className: styles.addLoanButton,
    },
  ],
  admin: [
    { text: 'Inicio', path: '/admin', icon: <HomeIcon /> },
    { text: 'Prestamos', path: '/admin/prestamos', icon: <LoansIcon /> },
    { text: 'Alumnos', path: '/admin/alumnos', icon: <PersonIcon /> },
    {
      text: 'Configuración',
      path: '/admin/configuracion',
      icon: <SettingsIcon />,
    },
    {
      text: 'Agregar libro',
      path: '/admin/agregar/libro',
      icon: <AddIcon />,
      className: styles.addLoanButton,
    },
    {
      text: 'Devolver Préstamo',
      path: '/admin/devolucion',
      icon: <QrIcon />,
      className: styles.addLoanButton,
    },
  ],
};

export function getOrderedNavItems(
  inPhone: boolean,
  location: string
): Array<NavItemType> {
  const isAdmin = location.startsWith('/admin');

  const adminButton =
    location === '/admin' ? (
      navItems.admin[4]
    ) : location === '/admin/prestamos' ? (
      navItems.admin[5]
    ) : (
      <></>
    );

  const adminNavItems = [...navItems.admin.slice(0, 4), adminButton];

  const items = isAdmin ? adminNavItems : navItems.student;

  if (!inPhone) return items;

  return isAdmin
    ? [items[0], items[1], adminButton, items[2], items[3]]
    : [items[0], items[2], items[1]];
}
