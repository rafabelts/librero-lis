import { toast } from 'sonner';
import { User } from '../types';
import { deleteAccount, SignUpFormData } from './auth';
import { firebaseAuth } from '../firebase_options';

export async function checkIfUserAlreadyAdded(studentId: string) {
  const response = await fetch(
    'https://librero-lis.onrender.com/api/user/check',

    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        studentId: studentId,
      }),
    }
  );

  const responseData = await response.json();
  const responseMessage = responseData.message;

  if (responseData.success) return responseMessage;
  return toast.error(responseMessage);
}

export async function getUser(userId: string): Promise<User | null> {
  const response = await fetch(
    'https://librero-lis.onrender.com/api/user/get',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        userId: userId,
      }),
    }
  );

  const responseData = await response.json();
  const responseMessage = responseData.message;

  if (responseData.success) return responseMessage;
  return null;
}

export async function getStudents() {
  const userData = JSON.parse(localStorage.getItem('user') ?? '{}');
  const userId = userData.id;
  const response = await fetch(
    'https://librero-lis.onrender.com/api/user/students',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        userId: userId,
      }),
    }
  );
  const responseData = await response.json();
  const responseMessage = responseData.message;

  if (responseData.success) return responseMessage;
  return toast.error(responseMessage);
}

export async function addUserService(userId: string, userData: SignUpFormData) {
  const response = await fetch(
    'https://librero-lis.onrender.com/api/user/add',

    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        id: userId,
        studentId: userData.studentId,
        name: userData.name,
        email: userData.email,
      }),
    }
  );

  const responseData = await response.json();
  const responseMessage = responseData.message;

  if (responseData.success) return toast.success(responseMessage);
  return toast.error(responseMessage);
}

export async function changeNameService(newName: string, userId: string) {
  const response = await fetch(
    'https://librero-lis.onrender.com/api/user/change/name',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        newName: newName,
        userId: userId,
      }),
    }
  );

  const responseData = await response.json();
  const responseMessage = responseData.message;

  if (responseData.success) return toast.success(responseMessage);
  return toast.error(responseMessage);
}

export async function deleteUserService(password: string) {
  const userId = firebaseAuth.currentUser!.uid;
  const response = await fetch(
    'https://librero-lis.onrender.com/api/user/delete',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        userId: userId,
      }),
    }
  );

  const responseData = await response.json();

  if (responseData.success) {
    localStorage.clear();
    await deleteAccount(password);
  } else {
    toast.error(
      'Se produjo un error al eliminar la cuenta, intenta de nuevo más tarde'
    );
  }
}
