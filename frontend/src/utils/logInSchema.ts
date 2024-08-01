import { z } from 'zod';

export const logInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Por favor, ingresa un correo electrónico válido' })
    .min(1, { message: 'Por favor, ingresa tu correo electrónico' }),
  password: z.string().min(1, { message: 'Por favor, ingresa tu contraseña' }),
});
