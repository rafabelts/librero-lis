import { BookDao } from '../daos/bookDao';
import { BookCopy, BookData } from '../models/books';
export class BookService {
  private bookDao: BookDao;

  constructor() {
    this.bookDao = new BookDao();
  }

  async addBook(bookData: BookData): Promise<boolean> {
    try {
      const bookInDb = await this.bookDao.checkIfBookAlreadyInDb(bookData.isbn);

      if (bookInDb) {
        // Here we are returning a false boolean because the book is in the db,
        // so the book cannot be added because it already exists
        return false;
      }

      await this.bookDao.addBook(bookData);

      const insertCopies = Array.from({ length: bookData.copies }, () => {
        return this.bookDao.addBookCopy(bookData.isbn);
      });

      await Promise.all(insertCopies);
      return true;
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
      const copiesInfo = await this.bookDao.getCopies(isbn);

      return copiesInfo;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
