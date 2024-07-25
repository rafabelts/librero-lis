import { BookData } from '../../types';
import styles from './BookContainer.module.css';

export function BookContainer(bookInfo: BookData) {
  return (
    <div className={styles.bookContainer}>
      <img
        src={bookInfo.image}
        alt={`Imagen del libro ${bookInfo.image}`}
        className={styles.bookImage}
      />
      <div className={styles.infoContainer}>
        <p className={styles.bookTitle}>{bookInfo.title}</p>
        {bookInfo.loanedTo && (
          <p className={styles.info}>
            Prestado a: <b>{bookInfo.loanedTo}</b>
          </p>
        )}

        {bookInfo.devolutionDate && (
          <p className={styles.info}>
            Fecha de devolucion:{' '}
            <b>{bookInfo.devolutionDate.toLocaleDateString('es-MX')}</b>
          </p>
        )}
      </div>
    </div>
  );
}
