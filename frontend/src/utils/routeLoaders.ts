import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../firebase_options';
import { redirect } from 'react-router-dom';
import { addUserService, getUser } from '../services/userServices';

export async function checkUser() {
  const user: { uid: string; verified: boolean } | null = await new Promise(
    (resolve) => {
      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        unsubscribe();

        resolve(
          user
            ? {
                uid: user.uid,
                verified: user.emailVerified,
              }
            : null
        );
      });
    }
  );

  const userData = await getUser(user!.uid);
  const isAdmin = userData?.type === 'admin';
  localStorage.setItem('user', JSON.stringify(userData));
  if (!userData?.id) return redirect('/auth/login');
  if (!user?.verified) return redirect('/verify');
  if (isAdmin) return redirect('/admin');

  return { isAdmin: isAdmin };
}

export function checkIfUserIsAdmin() {
  const user = JSON.parse(localStorage.getItem('user')!);
  const type = user.type;

  if (type === 'admin') return null;
  else return redirect('/');
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

export function authLoader() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      unsubscribe(); // Unsubscribe immediately after checking
      if (user) resolve(redirect('/'));
      resolve(null);
    });
  });
}
