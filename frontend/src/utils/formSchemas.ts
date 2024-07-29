import { z, ZodType } from 'zod';
import { BookFormData } from '../types';

export const AddBookSchema: ZodType<BookFormData> = z.object({
  isbn: z.string({ required_error: 'Por favor ingresa el ISBN del libro' }),
  title: z.string({ required_error: 'Por favor ingresa el titulo del libro' }),
  author: z.string({
    required_error: 'Por favor ingresa al o los autores del libro',
  }),
  editorial: z.string({
    required_error: 'Por favor ingresa la editorial del libro',
  }),
  publicationYear: z.preprocess(
    (year) => Number(year),
    z.number({
      required_error: 'Por favor ingresa el ano de publicacion',
    })
  ),
  copies: z.preprocess(
    (copies) => Number(copies),
    z.number({
      required_error: 'Por favor ingresa la cantidad de copias disponibles',
    })
  ),
});
