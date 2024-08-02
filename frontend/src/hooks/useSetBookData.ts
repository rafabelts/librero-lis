import { BookCopiesInfo, BookData } from '../types';
import { useAppContext } from '../context/ctxt';
import { useEffect, useState } from 'react';
import { getCopiesService } from '../services/bookServices';
import { useParams } from 'react-router-dom';

export function useSetBookData() {
  const { isbn } = useParams();
  const [bookInfo, setBookInfo] = useState<{
    headerInfo: BookData;
    copies: Array<BookCopiesInfo>;
  }>();
  const ctxt = useAppContext();

  useEffect(() => {
    async function handleFetchCopies(isbn: string) {
      const book = ctxt?.books.find((book) => book.isbn === isbn);

      const copies = await getCopiesService(isbn);
      // Added header info
      if (book) {
        setBookInfo({
          headerInfo: {
            title: book.title,
            isbn: book.isbn,
            author: book.author,
            editorial: book.editorial,
            publicationYear: book.publicationYear,
            imageUrl: book.imageUrl,
          },
          copies: copies.map((copy: BookCopiesInfo) => {
            return {
              id: copy.id,
              status: copy.inLoan ? 'en préstamo' : 'disponible',
            };
          }),
        });
      }
    }

    handleFetchCopies(isbn!);
  }, []);
  return {
    isbn,
    bookInfo,
  };
}
