import { useRef, useEffect, useCallback } from 'react';
import styles from './BookImageSelector.module.css';
import { useImageUpload } from '../../hooks/useImageUpload';
import { FieldError, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { BookFormData } from '../../types';

interface SelectorProps {
  register: UseFormRegister<BookFormData>;
  error: FieldError | undefined;
  setValue: UseFormSetValue<BookFormData>;
}

export function BookImageSelector({
  register,
  error,
  setValue,
}: SelectorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { image, handleFileChange } = useImageUpload();

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleFileChange(event);

      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          setValue('bookImage', base64String);
        };
        reader.readAsDataURL(file);
      }
    },
    [handleFileChange, setValue]
  );

  useEffect(() => {
    if (fileInputRef.current) {
      register('bookImage', { required: true });
    }
  }, [register]);

  return (
    <div className={styles.selectorContainer}>
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="Imagen del libro"
          className={styles.image}
        />
      ) : (
        <div className={styles.noImage} />
      )}
      <div className={styles.inputContainer}>
        <h2 style={{ marginTop: '60%' }}> Subir imagen</h2>
        <button
          type="button"
          onClick={handleClick}
          className={styles.imageButton}
        >
          Buscar imagen
        </button>
        <input
          id="upload-button"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className={styles.input}
          onChange={handleChange}
        />

        {error && (
          <p className={styles.errorMessage}>
            Por favor agrega la imagen del libro{' '}
          </p>
        )}
      </div>
    </div>
  );
}
