import { BookInfoHeader } from '../components/BookInfoHeader/BookInfoHeader';
import { BookCopiesTable } from '../components/BookCopiesTable/BookCopiesTable';
import { useSetBookData } from '../hooks/useSetBookData';

export default function BookInfoPage() {
  const { headerInfo, copies } = useSetBookData();

  return (
    <div className="bookInfoDiv">
      <BookInfoHeader {...headerInfo} />
      <BookCopiesTable copiesData={copies} />
    </div>
  );
}
