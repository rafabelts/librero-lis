import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
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

export function sendRecoverEmail(email: string) {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

export async function reAuthenticateUser(userPassword: string) {
  const user = firebaseAuth.currentUser;

  const credential = EmailAuthProvider.credential(user!.email!, userPassword);
  return await reauthenticateWithCredential(user!, credential)
    .then(() => {
      return true;
    })
    .catch((e) => {
      return false;
    });
}

export async function changePassword(
  userPassword: string,
  newPassword: string
) {
  const reAuthenticated = await reAuthenticateUser(userPassword);
  console.log(reAuthenticated);
  const user = firebaseAuth.currentUser;
  if (reAuthenticated) {
    updatePassword(user!, newPassword);
  }
}

export function signUserOut() {
  signOut(firebaseAuth)
    .then(() => {
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    })
    .catch(() => {});
}
