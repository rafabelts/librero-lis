import { Link } from 'react-router-dom';
import { LockIcon } from '../../assets/lockIcon';
import { PersonIcon } from '../../assets/personIcon';
import { signUserOut } from '../../services/auth';
import styles from './SettingsComponent.module.css';

export function StudentSettingsComponents() {
  const user = JSON.parse(localStorage.getItem('user')!);

  return (
    <div className={styles.configContainer}>
      <h2>Hola, {user.name}!</h2>
      <Link to="/configuracion/nombre" className={styles.configItem}>
        <PersonIcon />
        <p>Cambiar nombre</p>
      </Link>

      <Link to="/configuracion/contrasena" className={styles.configItem}>
        <LockIcon />
        <p>Cambiar contraseña</p>
      </Link>

      <div className={styles.settingsButtons}>
        <button className={styles.signOutButton} onClick={() => signUserOut()}>
          Cerrar sesión
        </button>
        <button className={styles.deleteAccountButton}>Eliminar cuenta</button>
      </div>
    </div>
  );
}
