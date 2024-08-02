import {
  createUserWithEmailAndPassword,
  deleteUser,
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
import { toast } from 'sonner';

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
        if (error.message.includes('auth/email-already-in-use'))
          toast.error(
            `Ya existe una cuenta registrada con el correo ${userData.email}`
          );
        else
          toast.error(
            'Se produjo un error al crear cuenta, intente de nuevo más tarde'
          );
      });
  }
}

export function logIn(userData: LogInFormData) {
  signInWithEmailAndPassword(firebaseAuth, userData.email, userData.password)
    .then(() => {
      window.location.href = '/';
    })
    .catch((error) => {
      if (error.message.includes('auth/invalid-credential'))
        toast.error('Credenciales inválidas, intente de nuevo');
      else toast.error('Error al inicar sesión, intente de nuevo más tarde');
    });
}

export function sendRecoverEmail(email: string) {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      toast.success(
        'Se ha enviado un correo con las instrucciones para el cambio de contraseña'
      );
    })
    .catch(() => {
      toast.error(
        'Se produjo un error al iniciar sesión, intente de nuevo más tarde'
      );
    });
}

export async function reAuthenticateUser(userPassword: string) {
  const user = firebaseAuth.currentUser;

  const credential = EmailAuthProvider.credential(user!.email!, userPassword);
  return await reauthenticateWithCredential(user!, credential)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function changePassword(
  userPassword: string,
  newPassword: string
) {
  const reAuthenticated = await reAuthenticateUser(userPassword);
  const user = firebaseAuth.currentUser;
  if (reAuthenticated) {
    updatePassword(user!, newPassword)
      .then(() => {
        toast.success('Se ha cambiado la contraseña');
      })
      .catch(() => {
        toast.error(
          'Se produjo un error en el servidor, intente de nuevo más tarde'
        );
      });
  }
}

export function signUserOut() {
  signOut(firebaseAuth)
    .then(() => {
      localStorage.clear();
      window.location.href = '/auth/login';
    })
    .catch(() => {});
}

export async function deleteAccount(userPassword: string) {
  const reAuthenticated = await reAuthenticateUser(userPassword);
  const user = firebaseAuth.currentUser;
  if (reAuthenticated) {
    deleteUser(user!)
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        toast.error(
          'Se produjo un error en el servidor, intente de nuevo más tarde'
        );
      });
  }
}
