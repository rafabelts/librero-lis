export interface BookOnLoan {
  title: string;
}

export interface DataForLoan {
  copyId: string;
  studentId: string;
}

export interface LoanData {
  id: string;
  copyId: string | null;
  studentId?: string | null;
  loanDate?: string;
  devolutionDate?: string;
}

export interface LoanAndBook {
  loan: LoanData;
  book: BookOnLoan | null;
}
