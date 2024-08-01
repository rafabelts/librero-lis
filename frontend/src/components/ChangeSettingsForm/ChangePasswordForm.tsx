import { useForm } from 'react-hook-form';
import { changePasswordSchema } from '../../utils/settingsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormFieldProps } from '../../types';
import { FormField } from '../FormField/FormField';
import { changePassword } from '../../services/auth';
import { NotVisibleIcon, VisibleIcon } from '../../assets/visibiltyIcons';
import { Dispatch, SetStateAction, useState } from 'react';

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

  const [actualPasswordVisible, setActualPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] =
    useState(false);

  const changePasswordFields: Array<FormFieldProps<ChangePasswordType>> = [
    {
      type: actualPasswordVisible ? 'text' : 'password',
      placeholder: 'Contraseña actual',
      name: 'currentPassword',
      register: register,
      error: errors.currentPassword,
    },
    {
      type: newPasswordVisible ? 'text' : 'password',
      placeholder: 'Contraseña nueva',
      name: 'newPassword',
      register: register,
      error: errors.newPassword,
    },
    {
      type: confirmNewPasswordVisible ? 'text' : 'password',
      placeholder: 'Confirmar contraseña nueva',
      name: 'confirmNewPassword',
      register: register,
      error: errors.confirmNewPassword,
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="formContainer"
      style={{ marginTop: '1rem' }}
    >
      <div
        style={{
          marginBottom: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.4rem',
        }}
      >
        {changePasswordFields.map((field) => {
          const passwordStates: {
            [key: string]: [boolean, Dispatch<SetStateAction<boolean>>];
          } = {
            currentPassword: [actualPasswordVisible, setActualPasswordVisible],
            newPassword: [newPasswordVisible, setNewPasswordVisible],
            confirmNewPassword: [
              confirmNewPasswordVisible,
              setConfirmNewPasswordVisible,
            ],
          };

          const [passwordVisible, setPasswordVisible] =
            passwordStates[field.name];
          return (
            <div key={field.name} className="passwordField">
              <FormField
                type={passwordVisible ? 'text' : field.type}
                placeholder={field.placeholder}
                name={field.name}
                register={field.register}
                error={field.error}
                valueAsNumber={field.valueAsNumber}
              />
              {passwordVisible !== undefined &&
                (passwordVisible ? (
                  <VisibleIcon
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                ) : (
                  <NotVisibleIcon
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                ))}
            </div>
          );
        })}
      </div>

      <button className="appButton">Cambiar contraseña</button>
    </form>
  );
}
