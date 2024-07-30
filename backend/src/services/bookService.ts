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
