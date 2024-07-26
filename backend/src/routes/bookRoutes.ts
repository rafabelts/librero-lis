import { Router } from 'express';
import { BookController } from '../controllers/bookController';

const router = Router();
const bookController = new BookController();

router.post('/add', bookController.addBook.bind(bookController));
router.get('/get', bookController.getBooks.bind(bookController));
router.post('/get/copies', bookController.getCopies.bind(bookController));

export default router;
