import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { firebaseAuth } from '../firebase_options';
import { checkIfUserAlreadyAdded } from '../services/userServices';

export interface SignUpFormData {
  email: string;
  name: string;
  studentId: string;
  password: string;
  confirmPassword: string;
}

export interface LogInFormData {
  email: string;
  password: string;
}

export async function signUp(userData: SignUpFormData) {
  const userInDb = await checkIfUserAlreadyAdded(userData.studentId);
  if (!userInDb) {
    createUserWithEmailAndPassword(
      firebaseAuth,
      userData.email,
      userData.confirmPassword
    )
      .then((newUser) => {
        const user = newUser.user;
        sendEmailVerification(user);
        localStorage.setItem('userData', JSON.stringify(userData));
        window.location.href = '/verify';
      })
      .catch((error) => {
        console.log('Error durante registro: ', error);
      });
  }
}

export function logIn(userData: LogInFormData) {
  signInWithEmailAndPassword(firebaseAuth, userData.email, userData.password)
    .then(() => {
      window.location.href = '/';
    })
    .catch(() => {});
}

export function signUserOut() {
  signOut(firebaseAuth)
    .then(() => {
      localStorage.removeItem('userId');
      window.location.href = '/auth/login';
    })
    .catch(() => {});
}
