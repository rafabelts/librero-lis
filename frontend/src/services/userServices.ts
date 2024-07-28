import { SignUpFormData } from '../utils/auth';

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

export async function checkIfUserIsAdmin(userId: string) {
  const response = await fetch(
    'http://localhost:3030/api/user/check/type',

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

  if (response.status === 201) {
    const userIsAdmin = await response.json();
    console.log(userIsAdmin);
    return userIsAdmin.message;
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
