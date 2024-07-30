import { RecoverEmailForm } from '../components/ChangeSettingsForm/RecoverEmailForm';

export default function SendRecoverEmailPage() {
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
      <RecoverEmailForm />
    </div>
  );
}
