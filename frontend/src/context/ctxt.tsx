import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { BookData, CanBeNull, LoanAndBook, User } from '../types';

export interface AppContextType {
  books: Array<BookData>;
  updateBooks: (books: Array<BookData>) => void;

  loan: Array<LoanAndBook>;
  updateLoans: (loans: Array<LoanAndBook>) => void;

  user: User | null;
  updateUser: (user: User | null) => void;
}

const AppContext = createContext<CanBeNull<AppContextType>>(undefined);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [books, setBooks] = useState<Array<BookData>>([]);
  const [loan, setLoan] = useState<Array<LoanAndBook>>([]);
  const [user, setUser] = useState<User | null>(null);

  const updateBooks = (books: Array<BookData>) => setBooks(books);
  const updateLoans = (loans: Array<LoanAndBook>) => setLoan(loans);
  const updateUser = (user: User | null) => setUser(user);

  return (
    <AppContext.Provider
      value={{
        books,
        updateBooks,
        loan,
        updateLoans,
        user,
        updateUser,
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
