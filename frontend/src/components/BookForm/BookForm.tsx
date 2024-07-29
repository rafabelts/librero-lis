import { useForm } from 'react-hook-form';
import { BookFormData, FormFieldProps } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../../components/FormField/FormField.tsx';
import { BookSchema } from '../../utils/bookSchema';
import styles from './BookForm.module.css';
import { BookImageSelector } from '../BookImageSelector/BookImageSelector.tsx';
import { addBookService } from '../../services/bookServices.ts';
import { toast } from 'sonner';
export function AddBookForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),

    defaultValues: {
      bookImage: ' ',
    },
  });

  const onSubmit = async (data: BookFormData) => {
    try {
      const response = await addBookService(data);
      if (response.status === 201) {
        const canAddData = await response.json();

        if (canAddData.message) toast.success('Libro agregado');
        else toast.error('Error. No se puede agregar el mismo libro 2 veces');
      } else {
        toast.error('Error al agregar libro');
      }
    } catch (e) {
      toast.error('Error al agregar libro');
    }
  };

  const bookFields: Array<FormFieldProps<BookFormData>> = [
    {
      type: 'text',
      placeholder: 'ISBN',
      name: 'isbn',
      register: register,
      error: errors.isbn,
    },
    {
      type: 'text',
      placeholder: 'Titulo del libro',
      name: 'title',
      register: register,
      error: errors.title,
    },
    {
      type: 'text',
      placeholder: 'Autor(es) del libro',
      name: 'author',
      register: register,
      error: errors.author,
    },
    {
      type: 'text',
      placeholder: 'Editorial',
      name: 'editorial',
      register: register,
      error: errors.editorial,
    },
    {
      type: 'number',
      placeholder: 'Ano de publicacion',
      name: 'publicationYear',
      register: register,
      error: errors.publicationYear,
      valueAsNumber: true,
    },
    {
      type: 'number',
      placeholder: 'Copias disponibles',
      name: 'copies',
      register: register,
      error: errors.copies,
      valueAsNumber: true,
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formContainer">
      <div className={styles.inputGrid}>
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
      <BookImageSelector
        setValue={setValue}
        register={register}
        error={errors.bookImage}
      />

      <button className="appButton">Agregar</button>
    </form>
  );
}
