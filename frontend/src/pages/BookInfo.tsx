import { BookInfoHeader } from '../components/BookInfoHeader/BookInfoHeader';
import { BookCopiesTable } from '../components/BookCopiesTable/BookCopiesTable';
import { useSetBookData } from '../hooks/useSetBookData';

export default function BookInfoPage() {
    const { headerInfo, copies } = useSetBookData();

    return (
        <div className="bookInfoDiv">
            <BookInfoHeader {...headerInfo} />
            <BookCopiesTable
                bookTitle={headerInfo?.title ?? ''}
                copiesData={copies}
            />

            <button className="deleteButton"> Eliminar libro </button>
        </div>
    );
}
