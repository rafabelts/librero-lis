import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../FormField/FormField.tsx';
import { SignUpFormData, signUp } from '../../services/auth.ts';
import { FormFieldProps } from '../../types/index.ts';
import { signUpSchema } from '../../utils/signUpSchema.ts';
import styles from './AuthForms.module.css';
import { Link } from 'react-router-dom';
import { NotVisibleIcon, VisibleIcon } from '../../assets/visibiltyIcons.tsx';
import { Dispatch, SetStateAction, useState } from 'react';
export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    await signUp({
      email: data.email,
      name: data.name,
      studentId: data.studentId,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const signUpFields: Array<FormFieldProps<SignUpFormData>> = [
    {
      type: 'email',
      placeholder: 'Correo institucional',
      name: 'email',
      register: register,
      error: errors.email,
    },
    {
      type: 'text',
      placeholder: 'Nombre',
      name: 'name',
      register: register,
      error: errors.name,
    },
    {
      type: 'text',
      placeholder: 'Matrícula',
      name: 'studentId',
      register: register,
      error: errors.studentId,
    },
    {
      type: passwordVisible ? 'text' : 'password',
      placeholder: 'Contraseña',
      name: 'password',
      register: register,
      error: errors.password,
    },
    {
      type: confirmPasswordVisible ? 'text' : 'password',
      placeholder: 'Confirmar contraseña',
      name: 'confirmPassword',
      register: register,
      error: errors.confirmPassword,
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formContainer">
      <div className={styles.fieldsContainer}>
        {signUpFields.map((field) => {
          const passwordStates: {
            [key: string]: [boolean, Dispatch<SetStateAction<boolean>>];
          } = {
            password: [passwordVisible, setPasswordVisible],
            confirmPassword: [
              confirmPasswordVisible,
              setConfirmPasswordVisible,
            ],
          };

          const [visible, setVisible] = passwordStates[field.name];

          return (
            <div
              key={field.name}
              className={
                field.name === 'password' || field.name === 'confirmPassword'
                  ? 'passwordField'
                  : ''
              }
            >
              <FormField
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
                register={field.register}
                error={field.error}
                valueAsNumber={field.valueAsNumber}
              />
              {(field.name === 'password' ||
                field.name === 'confirmPassword') &&
                (visible ? (
                  <VisibleIcon onClick={() => setVisible(!visible)} />
                ) : (
                  <NotVisibleIcon onClick={() => setVisible(!visible)} />
                ))}
            </div>
          );
        })}
      </div>
      <p style={{ marginBottom: '1rem' }}>
        Al continuar, aceptas los Términos y Condiciones, y la Política de
        Privacidad
      </p>
      <button className="appButton">Continuar</button>
      <Link to="/auth/login" className={styles.navigate2}>
        ¿Ya tienes una cuenta? Inicia sesión
      </Link>
    </form>
  );
}
