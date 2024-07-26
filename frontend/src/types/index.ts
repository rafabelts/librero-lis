import {
    FieldError,
    FieldValues,
    UseFormRegister,
    Path,
} from 'react-hook-form';

export type CanBeNull<T> = T | null | undefined;

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
    image?: CanBeNull<string>;
    title: string;
    isbn?: CanBeNull<string>;
    devolutionDate?: Date;
    loanedTo?: CanBeNull<string>;
}

export interface BookInfo {
    title: string;
    publicationYear: Date;
    isbn: string;
    copies: Array<BookCopiesInfo>;
}

export interface BookCopiesInfo {
    id: string;
    status: 'disponible' | 'en prestamo';
    qr_url: string;
}
