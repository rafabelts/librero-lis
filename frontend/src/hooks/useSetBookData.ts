import { BookCopiesInfo, BookData } from '../types';
import { useAppContext } from '../context/ctxt';
import { useEffect, useState } from 'react';
import { getCopiesService } from '../services/bookServices';
import { useParams } from 'react-router-dom';

export function useSetBookData() {
  const { isbn } = useParams();
  const [copies, setCopies] = useState<Array<BookCopiesInfo>>([]);
  const [headerInfo, setHeaderInfo] = useState<BookData>();
  const ctxt = useAppContext();

  useEffect(() => {
    async function handleFetchCopies(isbn: string) {
      const book = ctxt?.books.find((book) => book.isbn === isbn);

      const copies = await getCopiesService(isbn);
      // Added header info
      if (book) {
        setHeaderInfo({
          title: book.title,
          isbn: book.isbn,
          author: book.author,
          editorial: book.editorial,
          publicationYear: book.publicationYear,
        });
      }

      // Fetching copies
      setCopies(
        copies.map((copy: BookCopiesInfo) => {
          return {
            id: copy.id,
            status: copy.inLoan ? 'en prestamo' : 'disponible',
            qrUrl: ' ',
          };
        })
      );
    }

    handleFetchCopies(isbn!);
  }, []);

  return {
    copies,
    headerInfo,
  };
}
