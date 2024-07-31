import { useAppContext } from '../context/ctxt';
import { useEffect } from 'react';
import { getBooksService } from '../services/bookServices';

export function useGetBook() {
  const ctxt = useAppContext();

  useEffect(() => {
    async function handleFetchBooks() {
      const books = await getBooksService();
      ctxt?.updateBooks(books);
    }

    handleFetchBooks();
  }, []);
}
