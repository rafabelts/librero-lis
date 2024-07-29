import { usePagination } from '../../hooks/usePagination';
import { BookCopiesInfo } from '../../types';
import styles from './BookCopiesTable.module.css';
import { capitalize } from '../../utils/capitalize';
import QRCode from 'qrcode';

export function BookCopiesTable({
  bookTitle,
  copiesData,
}: {
  bookTitle: string;
  copiesData: Array<BookCopiesInfo>;
}) {
  const paginationData = {
    data: copiesData,
    totalValuesPerPage: 5,
  };

  const { dataToDisplay, goToPrevPage, goToNextPage } =
    usePagination<BookCopiesInfo>(paginationData);

  async function downloadQr(bookTitle: string, copyId: string) {
    const qrCodeImage = await QRCode.toDataURL(
      JSON.stringify({
        title: bookTitle,
        copyId: copyId,
      })
    );

    const link = document.createElement('a');
    link.href = qrCodeImage;
    link.download = `QR_${bookTitle}_${copyId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div>
      <table className={styles.copiesTable}>
        <thead className={styles.tableHead}>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>QR</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {dataToDisplay.map((obj) => {
            return (
              <tr key={obj.id}>
                <td>{obj.id}</td>
                <td>{capitalize(obj.status)}</td>
                <td
                  className={styles.downloadQrButton}
                  onClick={() => downloadQr(bookTitle, obj.id)}
                >
                  Descargar
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.navContainer}>
        <button className={styles.backButton} onClick={goToPrevPage}>
          Anterior
        </button>
        <button className={styles.nextButton} onClick={goToNextPage}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
