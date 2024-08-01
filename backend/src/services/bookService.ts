import { error } from 'console';
import { BookDao } from '../daos/bookDao';
import { UserDao } from '../daos/userDao';
import { BookCopy, BookData } from '../models/books';
export class BookService {
  private bookDao: BookDao;
  private userDao: UserDao;
  constructor() {
    this.bookDao = new BookDao();
    this.userDao = new UserDao();
  }

  async addBook(bookData: BookData): Promise<void> {
    try {
      const isAdmin = this.userDao.checkIfUserIsAdmin(bookData.userId!);
      if (!isAdmin) throw new Error("You don't have permission to add a book");
      await this.bookDao.addBook(bookData);

      const insertCopies = Array.from({ length: bookData.copies }, () => {
        return this.bookDao.addBookCopy(bookData.isbn);
      });

      await Promise.all(insertCopies);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async deleteBook(userId: string, isbn: string) {
    try {
      const isAdmin = this.userDao.checkIfUserIsAdmin(userId);
      const bookInDb = this.bookDao.checkIfBookExists(isbn);

      if (!isAdmin)
        throw new Error("You don't have permission to delete a book");

      if (!bookInDb) throw new Error("Book doesn't exists");

      await this.bookDao.deleteBook(isbn);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async deleteCopy(userId: string, copyId: string) {
    try {
      const isAdmin = this.userDao.checkIfUserIsAdmin(userId);
      const bookInDb = this.bookDao.checkIfCopyExists(copyId);

      if (!isAdmin)
        throw new Error("You don't have permission to delete a copy");

      if (!bookInDb) throw new Error("Copy doesn't exists");

      await this.bookDao.deleteCopy(copyId);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async addBookCopy(userId: string, bookIsbn: string): Promise<void> {
    try {
      const isAdmin = this.userDao.checkIfUserIsAdmin(userId);
      if (!isAdmin)
        throw new Error("You don't have permission to add a new copy");

      await this.bookDao.addBookCopy(bookIsbn);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getBooks(): Promise<Array<BookData>> {
    try {
      const bookInfo = await this.bookDao.getBooks();
      return bookInfo;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getCopies(isbn: string): Promise<Array<BookCopy>> {
    try {
      const copies = await this.bookDao.getCopies(isbn);
      const copiesInfo = await Promise.all(
        copies.map(async (copy) => {
          const inLoan = await this.bookDao.checkIfCopyInLoan(copy.id!);
          return {
            id: copy.id,
            inLoan: inLoan,
            bookId: copy.bookId,
          };
        })
      );

      return copiesInfo;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
