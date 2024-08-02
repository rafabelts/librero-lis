import { z } from 'zod';

export const recoverEmailSchema = z.object({
  email: z.string().email().min(1, {
    message:
      'Por favor, ingresa tu correo para enviar las instrucciones de recuperacion',
  }),
});

export const changeNameSchema = z.object({
  name: z.string().min(1, { message: 'Por favor, agrega un nuevo nombre' }),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: 'Por favor, ingresa tu contraseña actual' }),
    newPassword: z
      .string()
      .refine((password) => password.length <= 14 && password.length >= 8, {
        message:
          'La nueva contraseña debe tener una longitud de 8 a 14 caracteres',
      }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmNewPassword'],
  });

export const deleteUserSchema = z.object({
  password: z.string().min(1, { message: 'Por favor, ingresa tu contraseña' }),
});
