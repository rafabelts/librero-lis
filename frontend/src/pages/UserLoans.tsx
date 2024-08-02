import { useEffect } from 'react';
import { BookContainer } from '../components/BookContainer/BookContainer';
import { BookList } from '../components/BookList/BookList';
import { useAppContext } from '../context/ctxt';
import { useGetLoans } from '../hooks/useGetLoans';
import { BookData, BookFormData, LoanAndBook } from '../types';
import { useGetDebts } from '../hooks/useGetDebts';
import { toast } from 'sonner';

export default function UserDebtsPage() {
  const ctxt = useAppContext();
  const user = JSON.parse(localStorage.getItem('user')!);
  const studentId = user.studentId;

  useGetLoans();

  const debts = useGetDebts(studentId);

  useEffect(() => {
    if (debts! > 0) toast(`Tienes ${debts} adeudos`);
  }, [debts]);

  return ctxt!.loan.length! > 0 ? (
    <BookList>
      {ctxt!.loan.map((loan: LoanAndBook) => {
        const bookData: BookData = {
          devolutionDate: new Date(loan.loan.devolutionDate!),
          ...loan.book,
        };
        return <BookContainer key={loan.loan.id} {...bookData} />;
      })}
    </BookList>
  ) : (
    <div>
      <p>No tienes adeudos!!</p>
    </div>
  );
}
