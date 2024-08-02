import {
  FieldError,
  FieldValues,
  UseFormRegister,
  Path,
} from 'react-hook-form';

export type CanBeNull<T> = T | null | undefined;
export type CanBeUndefined<T> = T | undefined;

export interface User {
  id: string;
  studentId: string;
  type: string;
  name: string;
  email: string;
  userVerified: boolean;
}

export interface BookFormData {
  isbn: string;
  title: string;
  author: string;
  editorial: string;
  publicationYear: number;
  copies: number;
  bookImage?: string;
}

// VF for the valid form names and FD for the field values (example, the BookFormData interface)
export interface FormFieldProps<FD extends FieldValues> {
  type: string;
  placeholder: string;
  name: Path<FD>;
  register: UseFormRegister<FD>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
}

export interface NavItemType {
  text: string;
  path: string;
  icon: JSX.Element;
  className?: string;
}

export interface BookData {
  imageUrl: string;
  title: string;
  author?: string;
  editorial?: string;
  publicationYear?: number;
  isbn?: string;
  devolutionDate?: Date;
  studentId?: string;
}

export interface BookInfo {
  title: string;
  publicationYear: Date;
  isbn: string;
  bookImage: string;
  copies: Array<BookCopiesInfo>;
}

export interface BookCopiesInfo {
  id: string;
  status?: 'disponible' | 'en préstamo';
  inLoan?: boolean;
}

export interface Student {
  id: string;
  name: string;
  studentId: string;
  debts: number;
}

export interface LoanData {
  id: string;
  copyId: string | null;
  studentId: string | null;
  loanDate: string;
  devolutionDate?: string;
}

export interface LoanAndBook {
  loan: LoanData;
  book: {
    title: string;
    imageUrl: string;
  };
}
