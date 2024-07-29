import { like } from 'drizzle-orm';
import { users } from '../config/db/schema';
import { UserService } from '../services/userService';
import { Request, Response } from 'express';
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async checkIfUserAlreadyAdded(req: Request, res: Response) {
    try {
      const { studentId } = req.body;

      const userAlreadyAdded =
        await this.userService.checkIfUserAlreadyAdded(studentId);

      res.status(201).send({ success: true, message: userAlreadyAdded });
    } catch (error) {
      res.status(505).send({
        success: false,
        message: 'Error checking if user is already in db',
      });
    }
  }

  async getUserData(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const userData = await this.userService.getUserData(userId);
      res.status(201).send({ success: true, message: userData });
    } catch (error) {
      console.log(error);
      res.status(505).send({
        success: false,
        message: 'Error fetching user',
      });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const usersData = await this.userService.getStudents(userId);
      res.status(201).send({ success: true, message: usersData });
    } catch (error) {
      console.log(error);
      res.status(505).send({
        success: false,
        message: 'Error fetching users',
      });
    }
  }

  async addUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      await this.userService.addUser(userData);
      console.log('Added');
      res.status(201).send({ success: true, message: 'Added user data' });
    } catch (error) {
      console.log(error);
      res
        .status(505)
        .send({ success: false, message: 'Error adding new user' });
    }
  }
}
