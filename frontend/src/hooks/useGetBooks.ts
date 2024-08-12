import { useEffect } from 'react';
import { getBooksService } from '../services/bookServices';

export function useGetBook() {
  async function fetchBooks() {
    try {
      // Intentar obtener libros del localStorage primero
      const cachedBooks = localStorage.getItem('books');

      if (cachedBooks) {
        localStorage.removeItem('books');
      }

      // Obtener libros frescos de la API
      await getBooksService();
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  useEffect(() => {
    const refetchBooks = localStorage.getItem('refetchBooks') ?? 'false';
    const shouldRefetchBooks = refetchBooks === 'true' ? true : false;

    if (shouldRefetchBooks) {
      fetchBooks();
      localStorage.removeItem('refetchBooks');
    }
  }, []);

  return { books: JSON.parse(localStorage.getItem('books') ?? '{}') };
}
