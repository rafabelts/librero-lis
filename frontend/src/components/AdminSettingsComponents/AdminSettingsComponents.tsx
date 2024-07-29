import { firebaseAuth } from '../../firebase_options';
import { signUserOut } from '../../utils/auth';

export function AdminSettingsComponents() {
  return (
    <div>
      <p>Cambiar contrasena</p>
      <p onClick={() => signUserOut()}>Cerrar sesion</p>
    </div>
  );
}
