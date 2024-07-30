import { useForm } from 'react-hook-form';
import { changeNameSchema } from '../../utils/settingsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormFieldProps } from '../../types';
import { FormField } from '../FormField/FormField';
import { changeNameService } from '../../services/userServices';

type ChangeName = { name: string };

export function ChangeNameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof changeNameSchema>>({
    resolver: zodResolver(changeNameSchema),
  });

  const onSubmit = async (data: ChangeName) => {
    const user = JSON.parse(localStorage.getItem('user')!);
    await changeNameService(data.name, user.id);
  };

  const bookFields: Array<FormFieldProps<ChangeName>> = [
    {
      type: 'text',
      placeholder: 'Nuevo nombre',
      name: 'name',
      register: register,
      error: errors.name,
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

      <button className="appButton">Cambiar nombre</button>
    </form>
  );
}
