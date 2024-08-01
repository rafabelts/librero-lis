import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { BookData, CanBeNull, LoanAndBook } from '../types';

export interface AppContextType {
  books: Array<BookData>;
  updateBooks: (books: Array<BookData>) => void;

  loan: Array<LoanAndBook>;
  updateLoans: (loans: Array<LoanAndBook>) => void;

  copySelected: CanBeNull<string>;
  updateCopySelected: (copy: CanBeNull<string>) => void;
}

const AppContext = createContext<CanBeNull<AppContextType>>(undefined);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [books, setBooks] = useState<Array<BookData>>([]);
  const [loan, setLoan] = useState<Array<LoanAndBook>>([]);
  const [copySelected, setCopySelected] = useState<CanBeNull<string>>(null);
  const updateBooks = (books: Array<BookData>) => setBooks(books);
  const updateLoans = (loans: Array<LoanAndBook>) => setLoan(loans);
  const updateCopySelected = (copy: CanBeNull<string>) => setCopySelected(copy);
  return (
    <AppContext.Provider
      value={{
        books,
        updateBooks,
        loan,
        updateLoans,
        copySelected,
        updateCopySelected,
      }}
    >
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
