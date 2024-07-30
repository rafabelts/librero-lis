import { User } from '../types';
import { SignUpFormData } from './auth';

export async function checkIfUserAlreadyAdded(studentId: string) {
  const response = await fetch(
    'http://localhost:3030/api/user/check',

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

  if (response.status === 201) {
    const userInDb = await response.json();
    return userInDb.message;
  } else {
    return true;
  }
}

export async function getUser(userId: string): Promise<User | null> {
  const response = await fetch('http://localhost:3030/api/user/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      userId: userId,
    }),
  });

  if (response.status === 201) {
    const userData = await response.json();
    return userData.message;
  }

  return null;
}

export async function getUsers(userId: string) {
  const response = await fetch('http://localhost:3030/api/user/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      userId: userId,
    }),
  });

  if (response.status === 201) {
    const userData = await response.json();
    return userData.message;
  } else {
    return true;
  }
}

export async function addUserService(userId: string, userData: SignUpFormData) {
  const response = await fetch(
    'http://localhost:3030/api/user/add',

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
  return response;
}

export async function changeNameService(newName: string, userId: string) {
  const response = await fetch(
    'http://localhost:3030/api/user/change/name',

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
  return response;
}
