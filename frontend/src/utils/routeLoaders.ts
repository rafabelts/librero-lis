import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../firebase_options';
import { redirect } from 'react-router-dom';
import { addUserService, getUser } from '../services/userServices';

export async function checkUser() {
  const user: { uid: string; userData: any; verified: boolean } | null =
    await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        unsubscribe();

        const userData = await getUser(user!.uid);

        resolve(
          user
            ? {
                uid: user.uid,
                userData: userData,
                verified: user.emailVerified,
              }
            : null
        );
      });
    });

  const userIsAdmin = user?.userData.type === 'admin';
  localStorage.setItem('user', JSON.stringify(user?.userData));

  if (!user.userData.id) return redirect('/auth/login');
  if (!user?.verified) return redirect('/verify');
  return { isAdmin: userIsAdmin };
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
