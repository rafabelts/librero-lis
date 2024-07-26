import { BookDao } from '../daos/bookDao';
import { BookCopy, BookData } from '../models/books';
export class BookService {
  private bookDao: BookDao;

  constructor() {
    this.bookDao = new BookDao();
  }

  async addBook(bookData: BookData): Promise<void> {
    try {
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
      const copiesInfo = await this.bookDao.getCopies(isbn);

      return copiesInfo;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
