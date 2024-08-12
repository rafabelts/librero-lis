import { useForm } from 'react-hook-form';
import { deleteUserSchema } from '../../utils/settingsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormFieldProps } from '../../types';
import { FormField } from '../FormField/FormField';
import { deleteUserService } from '../../services/userServices';
import { useState } from 'react';
import { NotVisibleIcon, VisibleIcon } from '../../assets/visibiltyIcons';
import { useGetLoans } from '../../hooks/useGetLoans';
import { toast } from 'sonner';

type DeleteUser = { password: string };

export function DeleteUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof deleteUserSchema>>({
    resolver: zodResolver(deleteUserSchema),
  });
  useGetLoans();

  const { loans } = useGetLoans();

  const onSubmit = async (data: DeleteUser) => {
    const total_loans = loans!.length;
    if (total_loans > 0)
      return toast.error(
        'No se puede eliminar una cuenta con préstamos activos'
      );

    await deleteUserService(data.password);
  };

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const passwordField: Array<FormFieldProps<DeleteUser>> = [
    {
      type: passwordVisible ? 'text' : 'password',
      placeholder: 'Contraseña',
      name: 'password',
      register: register,
      error: errors.password,
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="formContainer"
      style={{ marginTop: '1rem' }}
    >
      <div style={{ marginBottom: '1rem' }}>
        {passwordField.map((field) => (
          <div key={field.name} className="passwordField">
            <FormField
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              register={field.register}
              error={field.error}
              valueAsNumber={field.valueAsNumber}
            />
            {passwordVisible ? (
              <VisibleIcon
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            ) : (
              <NotVisibleIcon
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            )}
          </div>
        ))}
      </div>

      <button className="dangerButton">Continuar</button>
    </form>
  );
}
