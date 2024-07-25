import { FieldValues } from 'react-hook-form';
import { FormFieldProps } from '../../types';
import styles from './FormField.module.css';
export function FormField<FD extends FieldValues>({
    type,
    placeholder,
    name,
    register,
    error,
    valueAsNumber = false,
}: FormFieldProps<FD>) {
    return (
        <div className={styles.inputContainer}>
            <input
                className={styles.input}
                type={type}
                placeholder={placeholder}
                {...register(name, { required: true, valueAsNumber })}
            />
            {error && <p className={styles.errorMessage}>{error.message}</p>}
        </div>
    );
}
