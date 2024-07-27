import { Router } from 'express';
import { LoanController } from '../controllers/loanController';

const router = Router();
const loanController = new LoanController();

router.post('/get', loanController.getLoans.bind(loanController));
router.post('/add', loanController.addLoan.bind(loanController));

export default router;
