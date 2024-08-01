import { BackIcon } from '../assets/backIcon';
import { RecoverEmailForm } from '../components/ChangeSettingsForm/RecoverEmailForm';

export default function SendRecoverEmailPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        padding: '1rem',
      }}
    >
      <BackIcon path="/auth/login" />
      <h1> Por favor, ingresa tu correo electrónico </h1>
      <RecoverEmailForm />
    </div>
  );
}
