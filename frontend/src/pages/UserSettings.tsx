import { signUserOut } from '../utils/auth';

export default function UserSettingsPage() {
  return <button onClick={() => signUserOut()}> Cerrar sesion </button>;
}
