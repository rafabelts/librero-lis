import { eq, sql } from 'drizzle-orm';
import { db } from '../config/db';
import { books, copies, loans } from '../config/db/schema';
import { DataForLoan, LoanAndBook, LoanData } from '../models/loans';
import { canHaveModifiers } from 'typescript';

export class LoanDao {
  async getUserLoans(studentId: string): Promise<Array<LoanAndBook>> {
    try {
      const userLoans = await db
        .select({
          loan: {
            id: loans.id,
            copyId: loans.copyId,
            loanDate: loans.loanDate,
            devolutionDate: loans.devolutionDate,
          },
          book: {
            title: books.title,
          },
        })
        .from(loans)
        .leftJoin(copies, eq(copies.id, loans.copyId))
        .leftJoin(books, eq(copies.bookId, books.isbn))
        .where(eq(loans.studentId, studentId));

      return userLoans;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getAllLoans(): Promise<Array<LoanAndBook>> {
    try {
      const userLoans = await db
        .select({
          loan: {
            id: loans.id,
            copyId: loans.copyId,
            studentId: loans.studentId,
          },
          book: {
            title: books.title,
          },
        })
        .from(loans)
        .leftJoin(copies, eq(copies.id, loans.copyId))
        .leftJoin(books, eq(copies.bookId, books.isbn));

      return userLoans;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async addLoan(loanData: DataForLoan): Promise<void> {
    try {
      await db.insert(loans).values({
        copyId: loanData.copyId,
        studentId: loanData.studentId,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async devolution(copyId: string): Promise<void> {
    try {
      await db.delete(loans).where(eq(loans.copyId, copyId));
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
