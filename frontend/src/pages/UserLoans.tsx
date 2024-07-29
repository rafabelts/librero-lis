import { useEffect, useState } from 'react';
import { BookContainer } from '../components/BookContainer/BookContainer';
import { BookList } from '../components/BookList/BookList';
import { useAppContext } from '../context/ctxt';
import { useGetLoans } from '../hooks/useGetLoans';
import { LoanAndBook } from '../types';
import { getDebts } from '../services/loanServices';
import { toast } from 'sonner';

export default function UserDebtsPage() {
  useGetLoans('S23017374');
  const [debts, setDebts] = useState<number>();
  useEffect(() => {
    async function handleFetchDebts(studentId: string) {
      const debts = await getDebts(studentId);
      setDebts(debts.length);
    }
    handleFetchDebts('S23017374');
  }, [debts]);

  useEffect(() => {
    if (debts > 0) toast(`Recuerda que tienes ${debts}`);
  }, [debts]);

  const ctxt = useAppContext();

  return ctxt?.loan.length > 0 ? (
    <BookList>
      {ctxt.loan.map((loan: LoanAndBook) => (
        <BookContainer key={loan.loan.id} {...loan.book} />
      ))}
    </BookList>
  ) : (
    <div>
      <p>No tienes adeudos!!</p>
    </div>
  );
}
