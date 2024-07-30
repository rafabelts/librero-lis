import { useEffect, useState } from 'react';
import { getDebts } from '../services/loanServices';

export function useGetDebts(studentId: string) {
  const [debts, setDebts] = useState<number>();
  useEffect(() => {
    async function handleFetchDebts(studentId: string) {
      const debts = await getDebts(studentId);
      setDebts(debts.length);
    }
    handleFetchDebts(studentId);
  }, [debts]);

  return debts;
}
