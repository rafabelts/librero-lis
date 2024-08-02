import { useEffect } from 'react';
import { BookContainer } from '../components/BookContainer/BookContainer';
import { BookList } from '../components/BookList/BookList';
import { useGetLoans } from '../hooks/useGetLoans';
import { BookData, LoanAndBook } from '../types';
import { useGetDebts } from '../hooks/useGetDebts';
import { toast } from 'sonner';

export default function UserDebtsPage() {
  const user = JSON.parse(localStorage.getItem('user')!);
  const studentId = user.studentId;

  const { loans } = useGetLoans();

  const debts = useGetDebts(studentId);

  useEffect(() => {
    if (debts! > 0) toast(`Tienes ${debts} adeudos`);
  }, [debts]);

  return loans?.length > 0 ? (
    <BookList>
      {loans?.map((loan: LoanAndBook) => {
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
