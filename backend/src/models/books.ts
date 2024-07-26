export interface BookData {
  isbn: string;
  title: string;
  author: string;
  editorial: string;
  publicationYear: number;
  copies: number;
}

export interface BookCopy {
  id?: string;
  inLoan: boolean;
  bookId: string | null;
}

export interface BookLoan {
  id?: string;
  studentId: string;
  copyId: string;
  loanDate: string;
}
