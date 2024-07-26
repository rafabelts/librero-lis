import { useParams } from 'react-router-dom';
import { BookInfoHeader } from '../components/BookInfoHeader/BookInfoHeader';
import { BookCopiesTable } from '../components/BookCopiesTable/BookCopiesTable';
import { BookCopiesInfo } from '../types';

export default function BookInfoPage() {
  const { isbn } = useParams();

  const copiesInfo: Array<BookCopiesInfo> = [];

  for (let i = 0; i <= 11; i++) {
    copiesInfo.push({
      id: `${i}`,
      status: 'en prestamo',
      qr_url: '..',
    });
  }

    const headerInfo = {
        title: 'Titulo',
        isbn: isbn,
        author: 'Autor',
        editorial: 'Editorial',
        publicationYear: 2005,
    }

  return (
    <div className='bookInfoDiv'>
      <BookInfoHeader headerInfo={headerInfo}/>
      <BookCopiesTable copiesData={copiesInfo} />
    </div>
  );
}
