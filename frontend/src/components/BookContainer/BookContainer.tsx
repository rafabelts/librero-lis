import { Link } from 'react-router-dom';
import { BookData } from '../../types';
import styles from './BookContainer.module.css';

function ContainerWrapper({
  isbn,
  children,
}: {
  isbn?: string;
  children: React.ReactNode;
}) {
  return isbn ? (
    <Link className={styles.bookContainer} to={`/admin/libro/${isbn}`}>
      {children}
    </Link>
  ) : (
    <div className={styles.bookContainer}>{children}</div>
  );
}

export function BookContainer(bookInfo: BookData) {
  return (
    <ContainerWrapper isbn={bookInfo.isbn}>
      {bookInfo.image ? (
        <img
          src={bookInfo.image}
          className="bookImage"
          alt={`Imagen del libro ${bookInfo.image}`}
        />
      ) : (
        <div className="noBookImage" />
      )}
      <div className={styles.infoContainer}>
        <p className={styles.bookTitle}>{bookInfo.title}</p>

        {bookInfo.isbn && (
          <p className={styles.info}>
            ISBN: <b>{bookInfo.isbn}</b>
          </p>
        )}

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
    </ContainerWrapper>
  );
}
