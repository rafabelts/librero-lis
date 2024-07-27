import { BookData } from '../types';
import { BookList } from '../components/BookList/BookList';
import { BookContainer } from '../components/BookContainer/BookContainer';
import { useAppContext } from '../context/ctxt';
import { useGetBook } from '../hooks/useGetBooks';
export default function AdminPage() {
  useGetBook();
  const ctxt = useAppContext();

  return ctxt?.books.length > 0 ? (
    <BookList>
      {ctxt.books.map((info: BookData) => (
        <BookContainer key={info.isbn} {...info} />
      ))}
    </BookList>
  ) : (
    <p>Aun no hay libros anadidos</p>
  );
}
