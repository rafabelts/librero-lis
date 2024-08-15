import { LoanService } from '../services/loanService';
import { Request, Response } from 'express';
export class LoanController {
  private loanService: LoanService;

  constructor() {
    this.loanService = new LoanService();
  }

  async getLoans(req: Request, res: Response): Promise<void> {
    const { userId } = req.body;
    console.log(userId);
    try {
      const loanData = await this.loanService.getLoans(userId);
      res.status(201).json({ success: true, message: loanData });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message:
          'Se produjo un error en el servidor, intente de nuevo más tarde',
      });
    }
  }

  async devolution(req: Request, res: Response): Promise<void> {
    const { userId, copyId } = req.body;
    try {
      await this.loanService.devolution(userId, copyId);
      res.status(201).json({
        success: true,
        message: `Se ha devuelto la copia con id ${copyId}`,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      let statusCode: number;
      let message: string;
      switch (true) {
        case errorMessage.includes('The copy is not currenly on loan'):
          statusCode = 404;
          message = `Error. La copia ${copyId} no está en prestamo`;
          break;
        case errorMessage.includes(
          "You don't have permission to return a loan"
        ):
          statusCode = 403;
          message = 'Error. No tiene los permisos para devolver un prestamo';
          break;
        default:
          statusCode = 500;
          message =
            'Se produjo un error en el servidor, intente de nuevo más tarde';
      }

      res.status(statusCode).json({ success: false, message });
    }
  }

  async addLoan(req: Request, res: Response): Promise<void> {
    const loanData = req.body;
    try {
      await this.loanService.addLoan(loanData);
      res
        .status(201)
        .json({ success: true, message: 'Se ha agregado un nuevo prestamo' });
    } catch (error) {
      const errorMessage = (error as Error).message;
      let statusCode: number;
      let message: string;

      switch (true) {
        case errorMessage.includes('UNIQUE constraint failed'):
          statusCode = 409;
          message = `Error. La copia ${loanData.copyId} ya se encuentra en prestamo`;
          break;
        case errorMessage.includes('User have debts'):
          statusCode = 403;
          message =
            'Error. Devuelve tus adeudos para poder sacar un nuevo prestamo';
          break;
        default:
          statusCode = 500;
          message =
            'Se produjo un error en el servidor, intente de nuevo más tarde';
      }

      res.status(statusCode).json({ success: false, message });
    }
  }

  async getDebts(req: Request, res: Response): Promise<void> {
    const { studentId } = req.body;
    console.log(studentId);
    try {
      const debts = await this.loanService.getDebts(studentId);
      res.status(201).json({ success: true, message: debts });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message:
          'Se produjo un error en el servidor, intente de nuevo más tarde',
      });
    }
  }
}
