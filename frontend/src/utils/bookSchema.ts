import { z, ZodType } from 'zod';
import { BookFormData } from '../types';

export const BookSchema: ZodType<BookFormData> = z.object({
  isbn: z
    .string()
    .refine(
      (val) => {
        const withoutHyphens = val.replace(/-/g, '');
        return withoutHyphens.length === 10 || withoutHyphens.length === 13;
      },
      { message: 'El ISBN debe tener 10 o 13 carácteres (sin contar guiones)' }
    )
    .transform((val) => {
      const withoutHyphens = val.replace(/-/g, '');
      if (withoutHyphens.length === 10) {
        return `${withoutHyphens.slice(0, 1)}-${withoutHyphens.slice(1, 3)}-${withoutHyphens.slice(3, 9)}-${withoutHyphens.slice(9)}`;
      } else {
        return `${withoutHyphens.slice(0, 3)}-${withoutHyphens.slice(3, 4)}-${withoutHyphens.slice(4, 6)}-${withoutHyphens.slice(6, 12)}-${withoutHyphens.slice(12)}`;
      }
    }),
  title: z
    .string()
    .min(1, { message: 'Por favor, ingresa el título del libro' }),
  author: z.string().min(1, {
    message: 'Por favor, ingresa al o los autores del libro',
  }),
  editorial: z.string().min(1, {
    message: 'Por favor, ingresa la editorial del libro',
  }),
  publicationYear: z
    .number()
    .min(1, { message: 'Por favor, ingresa el año de publicación del libro' })
    .refine(
      (year) => {
        return year.toString().length === 4;
      },
      { message: 'Recuerda que el año tiene 4 números' }
    ),
  copies: z
    .number()
    .min(1, {
      message: 'Por favor, ingresa el número de copias que hay del libro',
    })
    .refine(
      (val) => {
        return val <= 10 && val >= 1;
      },
      { message: 'Error. Solo se pueden agregar de 1 a 10 copias por libro' }
    ),
  bookImage: z
    .string()
    .min(1, { message: 'Por favor, ingresa la imagen del libro' }),
});
