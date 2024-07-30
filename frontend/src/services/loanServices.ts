import { firebaseAuth } from '../firebase_options';

export async function getLoansService(studentId?: string) {
  const response = await fetch('http://localhost:3030/api/loans/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: studentId
      ? JSON.stringify({
          studentId: studentId,
        })
      : null,
  });

  return response;
}

export async function addLoanService(copyId: string, studentId: string) {
  const response = await fetch('http://localhost:3030/api/loans/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      copyId: copyId,
      studentId: studentId,
    }),
  });

  return response.status;
}

export async function getDebts(studentId: string) {
  const response = await fetch('http://localhost:3030/api/loans/debts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      studentId: studentId,
    }),
  });
  const data = await response.json();
  return data.message;
}

export async function devolutionService(copyId: string) {
  const userId = firebaseAuth.currentUser!.uid;
  const response = await fetch('http://localhost:3030/api/loans/devolution', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      copyId: copyId,
    }),
  });

  return response.status;
}
