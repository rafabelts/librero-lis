import { toast } from 'sonner';
import { firebaseAuth } from '../firebase_options';

export async function getLoansService() {
  const userId = firebaseAuth.currentUser?.uid;
  const response = await fetch('http://localhost:3030/api/loans/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      userId: userId,
    }),
  });

  const responseData = await response.json();
  const responseMessage = responseData.message;

  if (responseData.success) return responseMessage;
  return toast.error(responseMessage);
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
  const responseData = await response.json();
  const responseMessage = responseData.message;

  if (responseData.success) return toast.success(responseMessage);
  return toast.error(responseMessage);
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
  const responseData = await response.json();
  const responseMessage = responseData.message;

  if (responseData.success) return responseMessage;
  return toast.error(responseMessage);
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
  const responseData = await response.json();
  const responseMessage = responseData.message;

  if (responseData.success) return toast.success(responseMessage);
  return toast.error(responseMessage);
}
