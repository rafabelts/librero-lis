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
}
