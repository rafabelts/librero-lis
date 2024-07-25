import styles from './BookList.module.css';
export function BookList({ children }: { children: React.ReactNode }) {
  return <div className={styles.booksGrid}> {children} </div>;
}
