import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { firebaseAuth } from '../firebase_options';
import { toast } from 'sonner';

export default function VerifyEmailPage() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer: number;
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
      await sendEmailVerification(firebaseAuth.currentUser!).catch((error) => {
        console.log(error.message);
        if (error.message.includes('too-many-requests')) {
          toast('Error');
        }
      });
    }
  };

  return (
    <div>
      <Outlet />
      <h1>Por favor verifica tu cuenta!</h1>
      <p>Checa tu correo electronico para obtener el enlace de verificacion</p>
      <button onClick={handleClick} disabled={isDisabled}>
        {isDisabled
          ? `Por favor espera: ${countdown} segundos`
          : 'Reenviar correo'}
      </button>
    </div>
  );
}
