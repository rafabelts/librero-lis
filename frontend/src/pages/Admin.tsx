import { BookData } from '../types';
import { BookList } from '../components/BookList/BookList';
import { BookContainer } from '../components/BookContainer/BookContainer';
import { useAppContext } from '../context/ctxt';
import { useGetBook } from '../hooks/useGetBooks';
import { useEffect } from 'react';
import { toast } from 'sonner';
export default function AdminPage() {
  useGetBook();
  const ctxt = useAppContext();

  useEffect(() => {
    const showToast = JSON.parse(
      localStorage.getItem('showToast') ??
        JSON.stringify({ show: false, message: '' })
    );

    if (showToast.show) {
      toast.success(showToast.message);
      localStorage.removeItem('showToast');
    }
  }, []);

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
