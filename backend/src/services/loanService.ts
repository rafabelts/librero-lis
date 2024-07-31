import { BookDao } from '../daos/bookDao';
import { LoanDao } from '../daos/loanDao';
import { UserDao } from '../daos/userDao';
import { DataForLoan, LoanAndBook } from '../models/loans';

export class LoanService {
  private loanDao: LoanDao;
  private bookDao: BookDao;
  private userDao: UserDao;
  constructor() {
    this.loanDao = new LoanDao();
    this.bookDao = new BookDao();
    this.userDao = new UserDao();
  }

  async getLoans(userId: string): Promise<Array<LoanAndBook>> {
    try {
      const isAdmin = await this.userDao.checkIfUserIsAdmin(userId);
      if (isAdmin) {
        const loansData = await this.loanDao.getAllLoans();

        return loansData;
      }
      const userLoansData = await this.loanDao.getUserLoans(userId);
      return userLoansData;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getDebts(studentId: string): Promise<Array<LoanAndBook>> {
    try {
      const today = new Date();
      const loans = await this.loanDao.getUserLoans(studentId);

      const debts = loans.filter(
        (loan) => today > new Date(loan.loan.devolutionDate as string)
      );

      return debts;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async addLoan(loanData: DataForLoan): Promise<boolean> {
    try {
      const debts = await this.getDebts(loanData.studentId);
      const totalDebts = debts.length;

      if (totalDebts > 0) {
        throw new Error('User have debts');
      }
      await this.loanDao.addLoan(loanData);
      return true;
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async devolution(userId: string, copyId: string): Promise<void> {
    try {
      const isAdmin = await this.userDao.checkIfUserIsAdmin(userId);
      const copyOnLoan = await this.bookDao.checkIfCopyInLoan(copyId);
      if (!isAdmin)
        throw new Error("You don't have permission to return a loan");
      if (!copyOnLoan) throw new Error('The copy is not currenly on loan');
      await this.loanDao.devolution(copyId);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
