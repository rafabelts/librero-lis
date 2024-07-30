import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.post('/add', userController.addUser.bind(userController));
router.post(
  '/check',
  userController.checkIfUserAlreadyAdded.bind(userController)
);
router.post('/get', userController.getUserData.bind(userController));
router.post('/users', userController.getUsers.bind(userController));
router.post('/change/name', userController.changeUserName.bind(userController));
export default router;
