import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../../components/FormField/FormField.tsx';
import { SignUpFormData, signUp } from '../../utils/auth.ts';
import { FormFieldProps } from '../../types/index.ts';
import { signUpSchema } from '../../utils/signUpSchema.ts';

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    await signUp({
      email: data.email,
      name: data.name,
      studentId: data.studentId,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };

  const bookFields: Array<FormFieldProps<SignUpFormData>> = [
    {
      type: 'email',
      placeholder: 'Correo electronico',
      name: 'email',
      register: register,
      error: errors.email,
    },
    {
      type: 'text',
      placeholder: 'Nombre',
      name: 'name',
      register: register,
      error: errors.name,
    },
    {
      type: 'text',
      placeholder: 'Matricula',
      name: 'studentId',
      register: register,
      error: errors.studentId,
    },
    {
      type: 'text',
      placeholder: 'Contrasena',
      name: 'password',
      register: register,
      error: errors.password,
    },
    {
      type: 'text',
      placeholder: 'Confirmar contrasena',
      name: 'confirmPassword',
      register: register,
      error: errors.confirmPassword,
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <button>Crear cuenta</button>
    </form>
  );
}
