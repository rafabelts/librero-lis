import { useParams } from 'react-router-dom';
import { BookInfoHeader } from '../components/BookInfoHeader/BookInfoHeader';
import { BookCopiesTable } from '../components/BookCopiesTable/BookCopiesTable';
import { BookCopiesInfo, BookData } from '../types';
import { useAppContext } from '../context/ctxt';
import { useEffect, useState } from 'react';
import { getCopiesService } from '../services/bookServices';

export default function BookInfoPage() {
  const { isbn } = useParams();
  const [copies, setCopies] = useState<Array<BookCopiesInfo>>([]);
  const [headerInfo, setHeaderInfo] = useState<BookData>();
  const ctxt = useAppContext();

  useEffect(() => {
    async function handleFetchCopies(isbn: string) {
      const book = ctxt?.books.find((book) => book.isbn === isbn);

      if (book) {
        setHeaderInfo({
          title: book.title,
          isbn: book.isbn,
          author: book.author,
          editorial: book.editorial,
          publicationYear: book.publicationYear,
        });
      } else {
        console.log('No book found with the given ISBN');
      }

      const response = await getCopiesService(isbn);

      if (response.status === 201) {
        const data = await response.json();

        setCopies(
          data.message.map((copy: BookCopiesInfo) => {
            return {
              id: copy.id,
              status: copy.inLoan ? 'en prestamo' : 'disponible',
              qrUrl: ' ',
            };
          })
        );
      }
    }

    handleFetchCopies(isbn!);
  }, []);

  return (
    <div className="bookInfoDiv">
      <BookInfoHeader {...headerInfo} />
      <BookCopiesTable copiesData={copies} />
    </div>
  );
}
