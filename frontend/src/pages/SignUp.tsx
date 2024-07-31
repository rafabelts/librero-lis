import { Toaster } from 'sonner';
import { SignUpForm } from '../components/AuthForms/SignUpForm';

export default function SignUpPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
      }}
    >
      <h1> Bienvenido! Crea tu cuenta </h1>
      <SignUpForm />
      <Toaster />
    </div>
  );
}
