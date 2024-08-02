import { BookService } from '../services/bookService';
import { Request, Response } from 'express';

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  async addBook(req: Request, res: Response): Promise<void> {
    const bookData = req.body;
    try {
      await this.bookService.addBook(bookData, bookData.copies);
      res.status(201).send({ success: true, message: 'Nuevo libro agregado' });
    } catch (error) {
      const errorMessage = (error as Error).message;
      let statusCode: number;
      let message: string;

      switch (true) {
        case errorMessage.includes('UNIQUE constraint failed'):
          statusCode = 409;
          message = `Error. El libro con el isbn ${bookData.isbn} ya se encuentra en el inventario`;
          break;
        case errorMessage.includes("You don't have permission to add a book"):
          statusCode = 403;
          message = 'Error. No tiene permiso para agregar libros';
          break;
        default:
          statusCode = 500;
          message =
            'Se produjo un error en el servidor, intente de nuevo más tarde';
      }

      res.status(statusCode).json({ success: false, message });
    }
  }

  async deleteBook(req: Request, res: Response): Promise<void> {
    const { userId, bookIsbn } = req.body;
    try {
      await this.bookService.deleteBook(userId, bookIsbn);
      res.status(201).send({
        success: true,
        message: `El libro con isbn ${bookIsbn} ha sido eliminado`,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      let statusCode: number;
      let message: string;

      switch (true) {
        case errorMessage.includes(
          "You don't have permission to delete a book"
        ):
          statusCode = 403;
          message = 'Error. No tiene permiso para eliminar el libro';
          break;
        case errorMessage.includes('FOREIGN KEY constraint failed'):
          statusCode = 409;
          message =
            'Error. No se puede eliminar el libro debido a que una de sus copias se encuentra en préstamo';
          break;
        case errorMessage.includes("Book doesn't exists"):
          statusCode = 404;
          message = 'Error. El libro no existe';
          break;

        default:
          statusCode = 500;
          message =
            'Se produjo un error en el servidor, intente de nuevo más tarde';
      }

      res.status(statusCode).json({ success: false, message });
    }
  }

  async deleteCopy(req: Request, res: Response): Promise<void> {
    const { userId, copyId } = req.body;
    try {
      await this.bookService.deleteCopy(userId, copyId);
      res.status(201).send({
        success: true,
        message: `La copia ${copyId} ha sido eliminada`,
      });
    } catch (error) {
      console.log(error);
      const errorMessage = (error as Error).message;
      let statusCode: number;
      let message: string;

      switch (true) {
        case errorMessage.includes(
          "You don't have permission to delete a copy"
        ):
          statusCode = 403;
          message = 'Error. No tiene permiso para eliminar la copia';
          break;
        case errorMessage.includes('FOREIGN KEY constraint failed'):
          statusCode = 409;
          message =
            'Error. No se puede eliminar la copia debido a que se encuentra en préstamo';
          break;
        case errorMessage.includes("Copy doesn't exists"):
          statusCode = 404;
          message = 'Error. La copia no existe';
          break;

        default:
          statusCode = 500;
          message =
            'Se produjo un error en el servidor, intente de nuevo más tarde';
      }

      res.status(statusCode).json({ success: false, message });
    }
  }

  async addBookCopy(req: Request, res: Response): Promise<void> {
    const { userId, bookIsbn } = req.body;
    try {
      await this.bookService.addBookCopy(userId, bookIsbn);
      res.status(201).send({ success: true, message: 'Nueva copia agregada' });
    } catch (error) {
      const errorMessage = (error as Error).message;
      let statusCode: number;
      let message: string;

      switch (true) {
        case errorMessage.includes(
          "You don't have permission to add a new copy"
        ):
          statusCode = 403;
          message = 'Error. No tiene permiso para agregar copias';
          break;
        default:
          statusCode = 500;
          message =
            'Se produjo un error en el servidor, intente de nuevo más tarde';
      }

      res.status(statusCode).json({ success: false, message });
    }
  }

  async getBooks(req: Request, res: Response): Promise<void> {
    try {
      const bookInfo = await this.bookService.getBooks();
      res.status(201).json({ success: true, message: bookInfo });
    } catch (error) {
      res
        .status(500)
        .send({ success: false, message: 'Error al obtener libros' });
    }
  }

  async getCopies(req: Request, res: Response): Promise<void> {
    try {
      const { isbn } = req.body;
      const copiesInfo = await this.bookService.getCopies(isbn);
      res.status(201).json({ success: true, message: copiesInfo });
    } catch (error) {
      res.status(500).send({
        success: false,
        message:
          'Se produjo un error en el servidor, intente de nuevo más tarde',
      });
    }
  }
}
