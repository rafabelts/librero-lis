import e from 'express';
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
                throw new Error(`You havent returned ${totalDebts} books`);
            }
            await this.loanDao.addLoan(loanData);
            return true;
        } catch (error) {
            throw new Error(error as string);
        }
    }
    async devolution(copyId: string): Promise<void> {
        try {
            await this.loanDao.devolution(copyId);
        } catch (error) {
            throw new Error(error as string);
        }
    }
}
