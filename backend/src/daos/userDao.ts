import { eq, name } from 'drizzle-orm';
import { db } from '../config/db';
import { users } from '../config/db/schema';
import { UserData } from '../models/users';

export class UserDao {
  async checkIfUserAlreadyAdded(userId: string): Promise<boolean> {
    try {
      const studentInDb = await db.query.users.findFirst({
        where: (model, { eq }) => eq(model.id, userId),
        columns: {
          studentId: true,
        },
      });

      return studentInDb ? true : false;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async checkIfUserIsAdmin(userId: string): Promise<boolean> {
    try {
      const userType = await db.query.users.findFirst({
        where: (model, { eq }) => eq(model.id, userId),
        columns: {
          type: true,
        },
      });

      return userType?.type === 'admin' ? true : false;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getStudents(): Promise<Array<UserData>> {
    try {
      const usersData = await db
        .select({
          studentId: users.studentId,
          name: users.name,
          email: users.email,
        })
        .from(users)
        .where(eq(users.type, 'student'));
      return usersData;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getUserData(userId: string): Promise<UserData | undefined> {
    try {
      const userData = await db.query.users.findFirst({
        where: (model, { eq }) => eq(model.id, userId),
      });
      return userData;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async addUserData(userData: UserData) {
    try {
      await db.insert(users).values({
        id: userData.id!,
        studentId: userData.studentId,
        type: 'student',
        name: userData.name,
        email: userData.email,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
