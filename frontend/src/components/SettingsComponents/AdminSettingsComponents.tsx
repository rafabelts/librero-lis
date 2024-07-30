import { LockIcon } from '../../assets/lockIcon';
import { signUserOut } from '../../utils/auth';
import styles from './StudentSettings.module.css';

export function AdminSettingsComponents() {
  return (
    <div className={styles.configContainer}>
      <span className={styles.configItem}>
        <LockIcon />
        <p>Cambiar contraseña</p>
      </span>

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
