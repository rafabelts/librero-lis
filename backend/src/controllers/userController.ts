import { UserService } from '../services/userService';
import { Request, Response } from 'express';
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async checkIfUserAlreadyAdded(req: Request, res: Response) {
    const { studentId } = req.body;
    try {
      const userAlreadyAdded =
        await this.userService.checkIfUserAlreadyAdded(studentId);

      res.status(201).send({ success: true, message: userAlreadyAdded });
    } catch (error) {
      res.status(500).send({
        success: false,
        message:
          'Se produjo un error en el servidor, intente de nuevo más tarde',
      });
    }
  }

  async getUserData(req: Request, res: Response) {
    const { userId } = req.body;
    try {
      const userData = await this.userService.getUserData(userId);
      res.status(201).send({ success: true, message: userData });
    } catch (error) {
      res.status(505).send({
        success: false,
        message:
          'Se produjo un error en el servidor, intente de nuevo más tarde',
      });
    }
  }

  async getStudents(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const usersData = await this.userService.getStudents(userId);
      res.status(201).send({ success: true, message: usersData });
    } catch (error) {
      const errorMessage = (error as Error).message;
      let statusCode: number;
      let message: string;

      switch (true) {
        case errorMessage.includes(
          'You dont have permission to get students info'
        ):
          statusCode = 403;
          message =
            'Error. No tiene permisos para obtener la información de los usuarios';
          break;
        default:
          statusCode = 500;
          message =
            'Se produjo un error en el servidor, intente de nuevo más tarde';
      }

      res.status(statusCode).json({ success: false, message });
    }
  }

  async addUser(req: Request, res: Response) {
    const userData = req.body;
    try {
      await this.userService.addUser(userData);
      res
        .status(201)
        .send({ success: true, message: 'Nuevo usuario agregado' });
    } catch (error) {
      res.status(500).send({
        success: false,
        message:
          'Se produjo un error en el servidor, intente de nuevo más tarde',
      });
    }
  }

  async changeUserName(req: Request, res: Response) {
    try {
      const { newName, userId } = req.body;
      await this.userService.changeUserName(newName, userId);
      res.status(201).send({
        success: true,
        message: 'Se ha cambiado el nombre de usuario',
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message:
          'Se produjo un error en el servidor, intente de nuevo más tarde',
      });
    }
  }
}
