import { useEffect, useState } from 'react';
import { getLoansService } from '../services/loanServices';
import { LoanAndBook } from '../types';

export function useGetLoans() {
  const [loans, setLoans] = useState<Array<LoanAndBook>>();
  useEffect(() => {
    async function handleFetchLoan() {
      const loans = await getLoansService();
      setLoans(loans);
    }

    handleFetchLoan();
  }, []);

  return { loans: loans };
}
