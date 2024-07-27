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
