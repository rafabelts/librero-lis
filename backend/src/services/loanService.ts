import { LoanDao } from '../daos/loanDao';
import { DataForLoan, LoanAndBook, LoanData } from '../models/loans';

export class LoanService {
  private loanDao: LoanDao;
  constructor() {
    this.loanDao = new LoanDao();
  }

  async getLoans(studentId?: string): Promise<Array<LoanAndBook>> {
    try {
      if (studentId) {
        const userLoansData = await this.loanDao.getUserLoans(studentId);
        return userLoansData;
      }

      const loansData = await this.loanDao.getAllLoans();

      return loansData;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async addLoan(loanData: DataForLoan): Promise<void> {
    try {
      await this.loanDao.addLoan(loanData);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
