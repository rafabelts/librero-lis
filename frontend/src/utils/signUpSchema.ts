import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: 'Por favor, ingresa tu correo electrónico institucional',
      })
      .email({ message: 'Por favor, ingresa un correo electrónico válido' })
      .refine((email) => email.endsWith('@estudiantes.uv.mx'), {
        message: 'Por favor, usa tu correo institucional',
      }),
    name: z.string().min(1, { message: 'Por favor, ingresa tu nombre' }),
    studentId: z
      .string()
      .refine(
        (id) => id.length === 9 && (id.startsWith('s') || id.startsWith('S')),
        {
          message: 'Recuerda que la matrícula es sin la z',
        }
      ),
    password: z
      .string()
      .min(1, { message: 'Por favor, ingresa una contraseña' })
      .refine((password) => password.length <= 14 && password.length >= 8, {
        message: 'La contraseña debe tener una longitud de 8 a 14 carácteres',
      }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });
