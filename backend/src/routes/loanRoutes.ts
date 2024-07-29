import { Router } from 'express';
import { LoanController } from '../controllers/loanController';

const router = Router();
const loanController = new LoanController();

router.post('/get', loanController.getLoans.bind(loanController));
router.post('/add', loanController.addLoan.bind(loanController));
router.post('/debts', loanController.getDebts.bind(loanController));
router.post('/devolution', loanController.devolution.bind(loanController));

export default router;
