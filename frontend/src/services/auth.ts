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
                else toast.error('Error al crear cuenta, intente de nuevo más tarde');
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
        .then(() => { })
        .catch((error) => { });
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
        .catch(() => { });
}
