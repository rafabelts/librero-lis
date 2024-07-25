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
      { message: 'El ISBN debe tener 10 o 13 caracteres (sin contar guiones)' }
    )
    .transform((val) => {
      const withoutHyphens = val.replace(/-/g, '');
      if (withoutHyphens.length === 10) {
        return `${withoutHyphens.slice(0, 1)}-${withoutHyphens.slice(1, 3)}-${withoutHyphens.slice(3, 9)}-${withoutHyphens.slice(9)}`;
      } else {
        return `${withoutHyphens.slice(0, 3)}-${withoutHyphens.slice(3, 4)}-${withoutHyphens.slice(4, 6)}-${withoutHyphens.slice(6, 12)}-${withoutHyphens.slice(12)}`;
      }
    }),
  title: z.string({ required_error: 'Por favor ingresa el titulo del libro' }),
  author: z.string({
    required_error: 'Por favor ingresa al o los autores del libro',
  }),
  editorial: z.string({
    required_error: 'Por favor ingresa la editorial del libro',
  }),
  publicationYear: z
    .number({
      required_error: 'Por favor ingresa el ano de publicacion',
    })
    .refine(
      (year) => {
        return year.toString().length === 4;
      },
      { message: 'Recuerda que el ano tiene 4 numeros' }
    ),
  copies: z.number({
    required_error: 'Por favor ingresa la cantidad de copias disponibles',
  }),
  bookImage: z
    .string({
      required_error: 'Por favor',
    })
    .min(1, { message: 'Por favor ingresa la imagen del libro' }),
});
