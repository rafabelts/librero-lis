import { BookContainer } from '../components/BookContainer/BookContainer';
import { BookList } from '../components/BookList/BookList';
import { useGetLoans } from '../hooks/useGetLoans';
import { BookData, LoanAndBook } from '../types';

export default function LoansPage() {
  const { loans = [] } = useGetLoans();

  return loans.length > 0 ? (
    <BookList>
      {loans.map((loan: LoanAndBook) => {
        const bookData: BookData = {
          studentId: loan.loan.studentId!,
          ...loan.book,
        };

        return <BookContainer key={loan.loan.id} {...bookData} />;
      })}
    </BookList>
  ) : (
    <div>
      <p>No hay adeudos por el momento</p>
    </div>
  );
}
