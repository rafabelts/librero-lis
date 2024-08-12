import { usePagination } from '../../hooks/usePagination';
import { BookCopiesInfo } from '../../types';
import styles from './BookCopiesTable.module.css';
import { capitalize } from '../../utils/capitalize';
import QRCode from 'qrcode';
import { useAppContext } from '../../context/ctxt';
import { BackPageIcon, NextPageIcon } from '../../assets/paginationIcons';

export function BookCopiesTable({
    bookTitle,
    copiesData,
}: {
    bookTitle: string;
    copiesData: Array<BookCopiesInfo>;
}) {
    const paginationData = {
        data: copiesData,
        totalValuesPerPage: 3,
    };

    const { dataToDisplay, goToPrevPage, goToNextPage } =
        usePagination<BookCopiesInfo>(paginationData);

    const ctxt = useAppContext();

    async function downloadQr(bookTitle: string, copyId: string) {
        const qrCodeImage = await QRCode.toDataURL(copyId);

        const link = document.createElement('a');
        link.href = qrCodeImage;
        link.download = `QR_${bookTitle}.png`;
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
                        <th>Estatus</th>
                        <th>QR</th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {dataToDisplay.map((obj) => {
                        return (
                            <tr
                                key={obj.id}
                                onClick={() => ctxt?.updateCopyToDelete(obj.id ?? null)}
                                style={
                                    ctxt?.copyToDelete === obj.id
                                        ? {
                                            backgroundColor: 'var(--table-item)',
                                        }
                                        : {}
                                }
                            >
                                <td>{obj.id}</td>
                                <td>{capitalize(obj.status!)}</td>
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
                <BackPageIcon onClick={goToPrevPage} />
                <NextPageIcon onClick={goToNextPage} />
            </div>
        </div>
    );
}
