import { eq } from 'drizzle-orm';
import { db } from '../config/db';
import { books, copies } from '../config/db/schema';
import { BookCopy, BookData } from '../models/books';

export class BookDao {
  async checkIfBookAlreadyInDb(isbn: string): Promise<boolean> {
    try {
      const bookInDb = await db.query.books.findFirst({
        where: (model, { eq }) => eq(model.isbn, isbn),
        columns: {
          isbn: true,
        },
      });

      return bookInDb ? true : false;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async addBook(bookData: BookData): Promise<void> {
    try {
      await db.insert(books).values({
        isbn: bookData.isbn,
        title: bookData.title,
        author: bookData.author,
        editorial: bookData.editorial,
        publicationYear: bookData.publicationYear,
        copies: bookData.copies,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async addBookCopy(isbn: string): Promise<void> {
    try {
      await db.insert(copies).values({
        bookId: isbn,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getBooks(): Promise<Array<BookData>> {
    try {
      const bookInfo = await db.query.books.findMany();
      return bookInfo;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async checkIfCopyInLoan(copyId: string): Promise<boolean> {
    try {
      const copyInLoan = await db.query.loans.findFirst({
        where: (loan, { eq }) => eq(loan.copyId, copyId),
        columns: {
          id: true,
        },
      });

      return copyInLoan ? true : false;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getCopies(isbn: string): Promise<Array<BookCopy>> {
    try {
      const copiesInfo = await db.query.copies.findMany({
        where: (model, { eq }) => eq(model.bookId, isbn),
      });
      return copiesInfo;
    } catch (error) {
      throw new Error(`Failed to get copies: ${error}`);
    }
  }
}
