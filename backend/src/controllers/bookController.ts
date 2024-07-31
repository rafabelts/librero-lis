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
      await this.bookService.addBook(bookData);
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
        message: 'Error al obtener las copias del libro',
      });
    }
  }
}
