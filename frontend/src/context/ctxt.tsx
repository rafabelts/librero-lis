import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { CanBeNull } from '../types';

export interface AppContextType {
  copyToDelete: CanBeNull<string>;
  updateCopyToDelete: (copy: CanBeNull<string>) => void;
}

const AppContext = createContext<CanBeNull<AppContextType>>(undefined);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [copyToDelete, setCopyToDelete] = useState<CanBeNull<string>>(null);

  const updateCopyToDelete = (copy: CanBeNull<string>) => setCopyToDelete(copy);

  return (
    <AppContext.Provider
      value={{
        copyToDelete,
        updateCopyToDelete,
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
