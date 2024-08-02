import { BookInfoHeader } from '../components/BookInfoHeader/BookInfoHeader';
import { BookCopiesTable } from '../components/BookCopiesTable/BookCopiesTable';
import { Suspense } from 'react';
import { useAppContext } from '../context/ctxt';
import {
  addCopyService,
  deleteBookService,
  deleteCopyService,
} from '../services/bookServices';
import { useCopyData } from '../hooks/useCopyData';

export default function BookInfoPage() {
  const { isbn, bookInfo } = useCopyData();
  const ctxt = useAppContext();

  async function handleAddCopy() {
    await addCopyService(isbn!);
  }

  async function deleteBook() {
    await deleteBookService(isbn!, bookInfo!.headerInfo.imageUrl as string);
  }

  async function deleteCopy() {
    await deleteCopyService(ctxt?.copyToDelete ?? '');
  }

  return (
    <div
      className="bookInfoDiv"
      onClick={() =>
        ctxt?.copyToDelete !== null ? ctxt?.updateCopyToDelete(null) : null
      }
    >
      <Suspense fallback={<p>Loading...</p>}>
        <BookInfoHeader {...bookInfo?.headerInfo} />
        <BookCopiesTable
          bookTitle={bookInfo?.headerInfo.title}
          copiesData={bookInfo?.copies ?? []}
        />
      </Suspense>
      <div
        className="dangerZoneButtons"
        style={{ marginTop: '60px', background: 'white' }}
      >
        {ctxt?.copyToDelete !== null ? (
          <button className="dangerButton" onClick={() => deleteCopy()}>
            Eliminar copia
          </button>
        ) : (
          <button className="appButton" onClick={() => handleAddCopy()}>
            Añadir copia
          </button>
        )}

        <button className="dangerButtonOutlined" onClick={() => deleteBook()}>
          Eliminar libro
        </button>
      </div>
    </div>
  );
}
