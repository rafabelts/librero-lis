import { UserDao } from '../daos/userDao';
import { UserData } from '../models/users';

export class UserService {
    private userDao: UserDao;
    constructor() {
        this.userDao = new UserDao();
    }

    async checkIfUserAlreadyAdded(studentId: string): Promise<boolean> {
        try {
            const userInDb = await this.userDao.checkIfUserAlreadyAdded(studentId);

            if (userInDb) {
                // Here we are returning a true boolean because the student is in the db
                return true;
            }

            return false;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async checkIfUserIsAdmin(userId: string): Promise<boolean> {
        try {
            const userIsAdmin = await this.userDao.checkIfUserIsAdmin(userId);
            return userIsAdmin;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async addUser(userData: UserData): Promise<boolean> {
        try {
            console.log('User Added');
            await this.userDao.addUserData(userData);
            return true;
        } catch (error) {
            console.log(error);
            throw new Error(error as string);
        }
    }
}
