import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { BookData, CanBeNull } from '../types';

export interface AppContextType {
    books: Array<BookData>;
    updateBooks: (books: Array<BookData>) => void;
}

const AppContext = createContext<CanBeNull<AppContextType>>(undefined);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
    const [books, setBooks] = useState<Array<BookData>>([]);

    const updateBooks = (books: Array<BookData>) => setBooks(books);

    return (
        <AppContext.Provider value={{ books, updateBooks }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (context === undefined)
        throw new Error(
            'useAppContext se debe usar con AppContextProvider como padre'
        );

    return context;
};
