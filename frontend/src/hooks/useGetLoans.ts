import { useEffect } from 'react';
import { useAppContext } from '../context/ctxt';
import { getLoansService } from '../services/loanServices';

export function useGetLoans() {
  const ctxt = useAppContext();

  useEffect(() => {
    async function handleFetchLoan() {
      const loans = await getLoansService();
      ctxt?.updateLoans(loans);
    }

    handleFetchLoan();
  }, []);
}
