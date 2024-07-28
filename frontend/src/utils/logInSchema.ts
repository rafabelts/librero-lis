import { z } from 'zod';

export const logInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Por favor ingresa tu correo electronico' }),
  password: z.string().min(1, { message: 'Por favor ingresa tu contrasena' }),
});
