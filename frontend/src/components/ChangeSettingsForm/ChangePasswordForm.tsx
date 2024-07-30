import { useForm } from 'react-hook-form';
import {
  changeNameSchema,
  changePasswordSchema,
} from '../../utils/settingsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormFieldProps } from '../../types';
import { FormField } from '../FormField/FormField';
import { changeNameService } from '../../services/userServices';
import { changePassword } from '../../services/auth';

interface ChangePasswordType {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordType) => {
    await changePassword(data.currentPassword, data.confirmNewPassword);
  };

  const bookFields: Array<FormFieldProps<ChangePasswordType>> = [
    {
      type: 'text',
      placeholder: 'Contraseña actual',
      name: 'currentPassword',
      register: register,
      error: errors.currentPassword,
    },
    {
      type: 'text',
      placeholder: 'Contraseña nueva',
      name: 'newPassword',
      register: register,
      error: errors.newPassword,
    },
    {
      type: 'text',
      placeholder: 'Confirmar contraseña nueva',
      name: 'confirmNewPassword',
      register: register,
      error: errors.confirmNewPassword,
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formContainer">
      <div style={{ marginBottom: '1rem' }}>
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

      <button className="appButton">Cambiar contraseña</button>
    </form>
  );
}
