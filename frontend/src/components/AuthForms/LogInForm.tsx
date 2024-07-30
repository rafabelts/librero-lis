import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../FormField/FormField.tsx';
import { LogInFormData, logIn } from '../../services/auth.ts';
import { FormFieldProps } from '../../types/index.ts';
import { logInSchema } from '../../utils/logInSchema.ts';
import styles from './AuthForms.module.css';
import { Link } from 'react-router-dom';
export function LogInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
  });

  const onSubmit = (data: LogInFormData) => {
    logIn({
      email: data.email,
      password: data.password,
    });
  };

  const bookFields: Array<FormFieldProps<LogInFormData>> = [
    {
      type: 'email',
      placeholder: 'Correo electronico',
      name: 'email',
      register: register,
      error: errors.email,
    },
    {
      type: 'text',
      placeholder: 'Contrasena',
      name: 'password',
      register: register,
      error: errors.password,
    },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formContainer">
      <div className={styles.fieldsContainer}>
        {bookFields.map((field) => (
          <FormField
            key={field.name}
            type={field.type}
            placeholder={field.placeholder}
            name={field.name}
            register={field.register}
            error={field.error}
            valueAsNumber={field.valueAsNumber}
          />
        ))}
      </div>

      <Link to="/auth/recuperacion" className={styles.forgotPassword}>
        ¿Olvido su contraseña?{' '}
      </Link>
      <button className="appButton">Iniciar sesion</button>
      <Link to="/auth/signup" className={styles.navigate2}>
        ¿Aún no tienes una cuenta? Crea una!
      </Link>
    </form>
  );
}
