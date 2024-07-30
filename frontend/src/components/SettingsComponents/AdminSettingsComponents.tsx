import { Link } from 'react-router-dom';
import { LockIcon } from '../../assets/lockIcon';
import { signUserOut } from '../../services/auth';
import styles from './SettingsComponent.module.css';

export function AdminSettingsComponents() {
  return (
    <div className={styles.configContainer}>
      <Link to="/admin/configuracion/contrasena" className={styles.configItem}>
        <LockIcon />
        <p>Cambiar contraseña</p>
      </Link>

      <button
        style={{ marginTop: '38rem' }}
        className={styles.signOutButton}
        onClick={() => signUserOut()}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
