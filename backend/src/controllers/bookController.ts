import { BookService } from '../services/bookService';
import { Request, Response } from 'express';

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    async addBook(req: Request, res: Response): Promise<void> {
        try {
            const bookData = req.body;
            const bookAdded = await this.bookService.addBook(bookData);
            res.status(201).send({ success: true, message: bookAdded });
        } catch (error) {
            res
                .status(505)
                .send({ success: false, message: 'Error adding new book' });
        }
    }

    async getBooks(req: Request, res: Response): Promise<void> {
        try {
            const bookInfo = await this.bookService.getBooks();
            res.status(201).json({ success: true, message: bookInfo });
        } catch (error) {
            res
                .status(505)
                .send({ success: false, message: 'Error adding new book' });
        }
    }

    async getCopies(req: Request, res: Response): Promise<void> {
        try {
            const { isbn } = req.body;
            const copiesInfo = await this.bookService.getCopies(isbn);
            res.status(201).json({ success: true, message: copiesInfo });
        } catch (error) {
            res
                .status(505)
                .send({ success: false, message: 'Error adding new book' });
        }
    }
}
