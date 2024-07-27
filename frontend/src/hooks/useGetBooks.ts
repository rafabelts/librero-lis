import { useAppContext } from '../context/ctxt';
import { useEffect } from 'react';
import { getBooksService } from '../services/bookServices';

export function useGetBook() {
  const ctxt = useAppContext();

  useEffect(() => {
    async function handleFetchBooks() {
      const response = await getBooksService();

      if (response.status === 201) {
        const data = await response.json();
        ctxt?.updateBooks(data.message);
      }
    }

    handleFetchBooks();
  }, []);
}
