import styles from './BookInfoHeader.module.css';

interface HeaderProps {
    title: string;
    isbn: string | undefined;
    author: string;
    editorial: string;
    publicationYear: number;
}

export function BookInfoHeader({ headerInfo }: { headerInfo: HeaderProps }) {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.bookInfo}>
                <h1>{headerInfo.title}</h1>
                <p>ISBN: {headerInfo.isbn}</p>
                <p>Autor(es): {headerInfo.author}</p>
                <p>Editorial: {headerInfo.editorial}</p>
                <p>Ano publicacion: {headerInfo.publicationYear}</p>
            </div>

            <div className="noBookImage" />
        </div>
    );
}
