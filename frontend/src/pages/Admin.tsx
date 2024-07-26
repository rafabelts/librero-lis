import { BookData } from '../types';
import { BookList } from '../components/BookList/BookList';
import { BookContainer } from '../components/BookContainer/BookContainer';
import { useEffect } from 'react';
import { getBooksService } from '../services/bookServices';
import { useAppContext } from '../context/ctxt';

export default function AdminPage() {
    const ctxt = useAppContext();

    useEffect(() => {
        async function handleFetchBooks() {
            const response = await getBooksService();

            if (response.status === 201) {
                const data = await response.json();
                ctxt?.updateBooks(data.message);
            }
        }

        handleFetchBooks();
    }, []);

    return ctxt?.books ? (
        <BookList>
            {ctxt.books.map((info: BookData) => (
                <BookContainer key={info.isbn} {...info} />
            ))}
        </BookList>
    ) : (
        <p>Error</p>
    );
}
