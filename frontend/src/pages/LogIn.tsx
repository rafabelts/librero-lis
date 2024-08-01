import { Toaster } from 'sonner';
import { LogInForm } from '../components/AuthForms/LogInForm';

export default function LogInPage() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Iniciar sesión</h1>
      <LogInForm />
      <Toaster />
    </div>
  );
}
