import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { firebaseAuth } from '../firebase_options';
import { toast, Toaster } from 'sonner';

export default function VerifyEmailPage() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsDisabled(false);
      setCountdown(10);
    }
    return () => clearTimeout(timer);
  }, [isDisabled, countdown]);

  const handleClick = async () => {
    if (!isDisabled) {
      setIsDisabled(true);

      await sendEmailVerification(firebaseAuth.currentUser!)
        .then(() => {
          toast.success('Correo enviado');
        })
        .catch((error) => {
          if (error.message.includes('too-many-requests')) {
            toast('Error');
          }
        });
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Outlet />
      <h1>Por favor verifica tu cuenta!</h1>
      <p style={{ marginTop: '1rem', marginBottom: '3rem' }}>
        Checa tu correo electronico para obtener el enlace de verificacion
      </p>

      <p style={{ marginTop: '0.3rem', marginBottom: '3rem' }}>
        Nota!! Si al verificar no ves ningun cambio, por favor refresca la
        página
      </p>

      <button className="appButton" onClick={handleClick} disabled={isDisabled}>
        {isDisabled
          ? `Por favor espera: ${countdown} segundos`
          : 'Reenviar correo'}
      </button>
      <Toaster />
    </div>
  );
}
