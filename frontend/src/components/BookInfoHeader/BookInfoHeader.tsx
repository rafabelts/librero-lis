import { BookData } from '../../types';
import styles from './BookInfoHeader.module.css';

export function BookInfoHeader(headerInfo: BookData) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.bookInfo}>
        <h1>{headerInfo.title}</h1>
        <p>ISBN: {headerInfo.isbn}</p>
        <p>Autor(es): {headerInfo.author}</p>
        <p>Editorial: {headerInfo.editorial}</p>
        <p>Año de publicación: {headerInfo.publicationYear}</p>
      </div>
      <div className="noBookImage" />
    </div>
  );
}
