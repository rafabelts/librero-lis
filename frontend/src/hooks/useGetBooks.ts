import { useEffect, useState } from 'react';
import { getBooksService } from '../services/bookServices';

export function useGetBook() {
  const [books, setBooks] = useState([]);

  async function fetchBooks() {
    try {
      localStorage.removeItem('books');
      // Obtener libros frescos de la API
      await getBooksService();
      const freshBooks = JSON.parse(localStorage.getItem('books') ?? '');
      setBooks(freshBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  useEffect(() => {
    const refetchBooks = localStorage.getItem('refetchBooks') ?? 'false';
    // Intentar obtener libros del localStorage primero
    const cachedBooks = localStorage.getItem('books');
    if (refetchBooks === 'true') {
      fetchBooks();
      localStorage.removeItem('refetchBooks');
    } else {
      if (cachedBooks) {
        setBooks(JSON.parse(cachedBooks));
      }
    }
  }, []);

  return { books };
}
