import { toast } from 'sonner';
import { firebaseAuth } from '../firebase_options';

export async function getLoansService() {
  const userData = JSON.parse(localStorage.getItem('user') ?? '{}');
  const userId = userData.id;

  const response = await fetch(
    'https://librero-lis.onrender.com/api/loans/get',
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

export async function addLoanService(copyId: string, studentId: string) {
  const response = await fetch(
    'https://librero-lis.onrender.com/api/loans/add',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        copyId: copyId,
        studentId: studentId,
      }),
    }
  );
  const responseData = await response.json();
  const responseMessage = responseData.message;

  if (responseData.success) return toast.success(responseMessage);
  return toast.error(responseMessage);
}

export async function getDebts(studentId: string) {
  const response = await fetch(
    'https://librero-lis.onrender.com/api/loans/debts',
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

export async function devolutionService(copyId: string) {
  const userId = firebaseAuth.currentUser!.uid;
  const response = await fetch(
    'https://librero-lis.onrender.com/api/loans/devolution',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        copyId: copyId,
      }),
    }
  );
  const responseData = await response.json();
  const responseMessage = responseData.message;

  if (responseData.success) return toast.success(responseMessage);
  return toast.error(responseMessage);
}
