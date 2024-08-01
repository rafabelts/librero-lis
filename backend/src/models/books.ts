export interface BookData {
  userId?: string;
  isbn: string;
  title: string;
  author: string;
  editorial: string;
  publicationYear: number;
  imageUrl: string | null;
}

export interface BookCopy {
  id?: string;
  inLoan?: boolean;
  bookId: string | null;
}

export interface BookLoan {
  id?: string;
  studentId: string;
  copyId: string;
  loanDate: string;
}
