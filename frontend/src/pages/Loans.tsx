import { BookContainer } from '../components/BookContainer/BookContainer';
import { BookList } from '../components/BookList/BookList';
import { useAppContext } from '../context/ctxt';
import { useGetLoans } from '../hooks/useGetLoans';
import { LoanAndBook } from '../types';

export default function LoansPage() {
  useGetLoans();

  const ctxt = useAppContext();

  return ctxt?.loan.length > 0 ? (
    <BookList>
      {ctxt.loan.map((loan: LoanAndBook) => (
        <BookContainer key={loan.loan.id} {...loan.book} />
      ))}
    </BookList>
  ) : (
    <div>
      <p>No hay adeudos por el momento</p>
    </div>
  );
}
