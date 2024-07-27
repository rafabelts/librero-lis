import { useEffect } from 'react';
import { useAppContext } from '../context/ctxt';
import { getLoansService } from '../services/loanServices';

export function useGetLoans(studentId?: string) {
  const ctxt = useAppContext();

  useEffect(() => {
    async function handleFetchLoan(studentId?: string) {
      const response = await getLoansService(studentId);

      if (response.status === 201) {
 
        const data = await response.json();
        ctxt?.updateLoans(data.message);
      }
    }

    handleFetchLoan(studentId);
  }, []);
}
