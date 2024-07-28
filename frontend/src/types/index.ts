import {
  FieldError,
  FieldValues,
  UseFormRegister,
  Path,
} from 'react-hook-form';

export type CanBeNull<T> = T | null | undefined;
export type CanBeUndefined<T> = T | undefined;

export interface BookFormData {
  isbn: string;
  title: string;
  author: string;
  editorial: string;
  publicationYear: number;
  copies: number;
  bookImage?: string;
}

export interface User {
  id: string;
  studentId: string;
  type: string;
  name: string;
  email: string;
  userVerified: boolean;
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
  image?: CanBeUndefined<string>;
  title?: CanBeUndefined<string>;
  author?: CanBeUndefined<string>;
  editorial?: CanBeUndefined<string>;
  publicationYear?: CanBeUndefined<number>;
  isbn?: CanBeUndefined<string>;
  devolutionDate?: CanBeUndefined<Date>;
  loanedTo?: CanBeUndefined<undefined>;
}

export interface BookInfo {
  title: string;
  publicationYear: Date;
  isbn: string;
  copies: Array<BookCopiesInfo>;
}

export interface BookCopiesInfo {
  id: string;
  status?: 'disponible' | 'en prestamo';
  inLoan?: boolean;
  qrUrl: string;
}

export interface StudentData {
  id: string;
  name: string;
  student_id: string;
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
    image: string;
  } | null;
}
