import { name } from 'drizzle-orm';
import { LoanDao } from '../daos/loanDao';
import { UserDao } from '../daos/userDao';
import { UserData } from '../models/users';
import { LoanService } from './loanService';

export class UserService {
  private userDao: UserDao;
  private loanService: LoanService;
  constructor() {
    this.userDao = new UserDao();
    this.loanService = new LoanService();
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

  async getUserData(userId: string): Promise<UserData | undefined> {
    try {
      const userData = await this.userDao.getUserData(userId);
      return userData;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getStudents(userId: string): Promise<Array<UserData>> {
    try {
      const isAdmin = await this.userDao.checkIfUserIsAdmin(userId);
      if (isAdmin) {
        const usersData = await this.userDao.getStudents();
        const userFullData = await Promise.all(
          usersData.map(async (student) => {
            const debts = await this.loanService.getDebts(student.studentId);
            return {
              studentId: student.studentId,
              name: student.name,
              email: student.email,
              debts: debts.length,
            };
          })
        );
        return userFullData;
      } else {
        throw new Error('You dont have permission to get students info');
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async addUser(userData: UserData): Promise<boolean> {
    try {
      await this.userDao.addUserData(userData);
      return true;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async changeUserName(newName: string, userId: string) {
    try {
      await this.userDao.changeUserName(newName, userId);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async deleteUser(userId: string) {
    try {
      await this.userDao.deleteUser(userId);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
