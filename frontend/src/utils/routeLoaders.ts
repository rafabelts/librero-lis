import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../firebase_options';
import { redirect } from 'react-router-dom';
import { addUserService, checkIfUserIsAdmin } from '../services/userServices';

export async function checkUser() {
  const user: { uid: string; verified: boolean } | null = await new Promise(
    (resolve) => {
      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        unsubscribe();

        resolve(user ? { uid: user.uid, verified: user.emailVerified } : null);
      });
    }
  );

  const userIsAdmin = await checkIfUserIsAdmin(user.uid);

  if (!user?.uid) return redirect('/auth/login');
  if (!user?.verified) return redirect('/verify');
  return { userId: user?.uid, isAdmin: userIsAdmin };
}

export function checkIfUserVerified() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      unsubscribe();
      if (!user) {
        resolve(redirect('/auth/login'));
      }

      if (user?.emailVerified) {
        const userData = localStorage.getItem('userData');
        if (userData) {
          addUserService(user.uid, JSON.parse(userData));
          localStorage.removeItem('userData');
        }
        resolve(redirect('/'));
      }
      resolve(null);
    });
  });
}

export function adminLoader() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      unsubscribe();
      const userIsAdmin = await checkIfUserIsAdmin(user!.uid as string);
      if (!userIsAdmin) resolve(redirect('/'));
      resolve(null);
    });
  });
}

export function authLoader() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      unsubscribe(); // Unsubscribe immediately after checking
      if (user) resolve(redirect('/'));
      resolve(null);
    });
  });
}
