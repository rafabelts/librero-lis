import { BookData } from '../types';
import { BookList } from '../components/BookList/BookList';
import { BookContainer } from '../components/BookContainer/BookContainer';
import { useGetBook } from '../hooks/useGetBooks';

export default function AdminPage() {
  const { books } = useGetBook();
  return books.length > 0 ? (
    <BookList>
      {books.map((info: BookData) => (
        <BookContainer key={info.isbn} {...info} />
      ))}
    </BookList>
  ) : (
    <div>
      <p>Aun no hay libros anadidos</p>
    </div>
  );
}
