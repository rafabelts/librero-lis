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

    async checkIfUserIsAdmin(req: Request, res: Response) {
        try {
            const { userId } = req.body;
            const userIsAdmin = await this.userService.checkIfUserIsAdmin(userId);
            res.status(201).send({ success: true, message: userIsAdmin });
        } catch (error) {
            res.status(505).send({
                success: false,
                message: 'Error checking user type',
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
