import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../../components/FormField/FormField.tsx';
import { LogInFormData, logIn } from '../../utils/auth.ts';
import { FormFieldProps } from '../../types/index.ts';
import { logInSchema } from '../../utils/logInSchema.ts';

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
      <div>
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

      <p
        style={{
          marginBottom: '2rem',
          textAlign: 'right',
          fontSize: '1.2rem',
        }}
      >
        Olvido su contrasena?{' '}
      </p>
      <button className="appButton">Iniciar sesion</button>
    </form>
  );
}
