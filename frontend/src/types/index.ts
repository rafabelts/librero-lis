import {
  FieldError,
  FieldValues,
  UseFormRegister,
  Path,
} from 'react-hook-form';

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
  image: string;
  title: string;
  devolutionDate?: Date;
  loanedTo?: string;
}
