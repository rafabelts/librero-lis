import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z
      .string()
      .email()
      .refine((email) => email.endsWith('@estudiantes.uv.mx'), {
        message: 'Por favor usa tu correo institucional',
      }),
    name: z.string().min(1, { message: 'Por favor ingresa tu nombre' }),
    studentId: z.string().refine((id) => id.length === 9, {
      message: 'Recuerda que la matricula es sin la z',
    }),
    password: z
      .string()
      .refine((password) => password.length <= 14 && password.length >= 8, {
        message: 'La contrasena debe tener una longitud de 8 a 14 caracteres',
      }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contrasenas no coinciden',
    path: ['confirmPassword'],
  });
