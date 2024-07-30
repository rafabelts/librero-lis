import { useForm } from 'react-hook-form';
import { recoverEmailSchema } from '../../utils/settingsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormFieldProps } from '../../types';
import { FormField } from '../FormField/FormField';
import { sendRecoverEmail } from '../../services/auth';

type RecoverEmail = { email: string };

export function RecoverEmailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof recoverEmailSchema>>({
    resolver: zodResolver(recoverEmailSchema),
  });

  const onSubmit = (data: RecoverEmail) => {
    sendRecoverEmail(data.email);
  };

  const bookFields: Array<FormFieldProps<RecoverEmail>> = [
    {
      type: 'email',
      placeholder: 'Correo electronico',
      name: 'email',
      register: register,
      error: errors.email,
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formContainer">
      <div style={{ marginBottom: '1rem' }}>
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

      <button className="appButton">Enviar correo confirmación</button>
    </form>
  );
}
