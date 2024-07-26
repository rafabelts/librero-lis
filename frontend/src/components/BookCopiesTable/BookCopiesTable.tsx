import { usePagination } from '../../hooks/usePagination';
import { BookCopiesInfo } from '../../types';
import styles from './BookCopiesTable.module.css';
import { capitalize } from '../../utils/capitalize';
export function BookCopiesTable({
    copiesData,
}: {
    copiesData: Array<BookCopiesInfo>;
}) {
    const paginationData = {
        data: copiesData,
        totalValuesPerPage: 5,
    };

    const { dataToDisplay, goToPrevPage, goToNextPage } =
        usePagination<BookCopiesInfo>(paginationData);

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
                                    onClick={() => console.log(obj.qr_url)}
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
