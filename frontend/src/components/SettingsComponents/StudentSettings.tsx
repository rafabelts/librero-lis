import { LockIcon } from '../../assets/lockIcon';
import { PersonIcon } from '../../assets/personIcon';
import { signUserOut } from '../../utils/auth';
import styles from './StudentSettings.module.css';

export function StudentSettingsComponents() {
  const user = JSON.parse(localStorage.getItem('user')!);

  return (
    <div className={styles.configContainer}>
      <h2>Hola, {user.name}!</h2>
      <span className={styles.configItem}>
        <PersonIcon />
        <p>Cambiar nombre</p>
      </span>

      <span className={styles.configItem}>
        <LockIcon />
        <p>Cambiar contraseña</p>
      </span>

      <div className={styles.settingsButtons}>
        <button className={styles.signOutButton} onClick={() => signUserOut()}>
          Cerrar sesión
        </button>
        <button className={styles.deleteAccountButton}>Eliminar cuenta</button>
      </div>
    </div>
  );
}
