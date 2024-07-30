import { DataForLoan } from '../models/loans';
import { LoanService } from '../services/loanService';
import { Request, Response } from 'express';
export class LoanController {
  private loanService: LoanService;

  constructor() {
    this.loanService = new LoanService();
  }

  async getLoans(req: Request, res: Response): Promise<void> {
    try {
      const { studentId } = req.body;
      const loanData = await this.loanService.getLoans(studentId);

      res.status(201).json({ success: true, message: loanData });
    } catch (error) {
      res.status(505).send({ success: false, message: 'Error getting loans' });
    }
  }

  async addLoan(req: Request, res: Response): Promise<void> {
    try {
      const loanData = req.body;
      await this.loanService.addLoan(loanData);
      res.status(201).json({ success: true, message: 'New loan added' });
    } catch (error) {
      res.status(505).send({ success: false, message: 'Error getting loans' });
    }
  }

  async getDebts(req: Request, res: Response): Promise<void> {
    try {
      const { studentId } = req.body;
      const debts = await this.loanService.getDebts(studentId);
      res.status(201).json({ success: true, message: debts });
    } catch (error) {
      res.status(505).send({ success: false, message: 'Error getting debts' });
    }
  }

  async devolution(req: Request, res: Response): Promise<void> {
    try {
      const { copyId } = req.body;
      await this.loanService.devolution(copyId);
      res.status(201).json({ success: true, message: 'Book returned' });
    } catch (error) {
      console.log('Error desde capa controlador: ', error);
      res.status(505).send({ success: false, message: 'Error returning book' });
    }
  }
}
