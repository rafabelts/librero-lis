import { BookContainer } from '../components/BookContainer/BookContainer';
import { BookList } from '../components/BookList/BookList';
import { useAppContext } from '../context/ctxt';
import { useGetLoans } from '../hooks/useGetLoans';
import { LoanAndBook } from '../types';

export default function UserDebtsPage() {
  useGetLoans('S23017374');

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
