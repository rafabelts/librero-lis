import { toast } from 'sonner';
import { firebaseAuth } from '../firebase_options';
import { BookFormData } from '../types';
import { deleteFile, uploadFile } from './storageBucket';

export async function addBookService(bookData: BookFormData) {
  try {
    const imageUrl = await uploadFile(bookData.bookImage!, bookData.title);
    const userId = firebaseAuth.currentUser!.uid;

    const response = await fetch(
      'https://librero-lis.onrender.com/api/books/add',

      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          userId: userId,
          isbn: bookData.isbn,
          title: bookData.title,
          author: bookData.author,
          editorial: bookData.editorial,
          publicationYear: bookData.publicationYear,
          copies: bookData.copies,
          imageUrl: imageUrl,
        }),
      }
    );
    const responseData = await response.json();
    const resposeMessage = responseData.message;

    if (responseData.success) return toast.success(resposeMessage);
    return toast.error(resposeMessage);
  } catch {
    toast.error(
      'Se produjo un error en el servidor, intente de nuevo más tarde'
    );
  }
}

export async function addCopyService(bookIsbn: string) {
  const userId = firebaseAuth.currentUser!.uid;

  const response = await fetch('http://localhost:3030/api/books/add/copy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ userId: userId, bookIsbn: bookIsbn }),
  });
  const responseData = await response.json();
  const resposeMessage = responseData.message;

  if (responseData.success) return toast.success(resposeMessage);
  return toast.error(resposeMessage);
}

export async function deleteBookService(bookIsbn: string, imageUrl: string) {
  try {
    await deleteFile(imageUrl);
    const userId = firebaseAuth.currentUser!.uid;

    const response = await fetch('http://localhost:3030/api/books/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ userId: userId, bookIsbn: bookIsbn }),
    });
    const responseData = await response.json();
    const resposeMessage = responseData.message;

    if (responseData.success) {
      window.location.href = '/admin';

      localStorage.setItem(
        'showToast',
        JSON.stringify({ show: true, message: resposeMessage })
      );

      return null;
    }
    return toast.error(resposeMessage);
  } catch {
    toast.error(
      'Se produjo un error en el servidor, intente de nuevo más tarde'
    );
  }
}

export async function deleteCopyService(copyId: string) {
  const userId = firebaseAuth.currentUser!.uid;

  const response = await fetch('http://localhost:3030/api/books/delete/copy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ userId: userId, copyId: copyId }),
  });
  const responseData = await response.json();
  const resposeMessage = responseData.message;

  if (responseData.success) return toast.success(resposeMessage);
  return toast.error(resposeMessage);
}

export async function getBooksService() {
  const response = await fetch(
    'https://librero-lis.onrender.com/api/books/get',

    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const responseData = await response.json();
  const resposeMessage = responseData.message;

  if (responseData.success) return resposeMessage;
  return toast.error(resposeMessage);
}

export async function getCopiesService(isbn: string) {
  const response = await fetch(
    'https://librero-lis.onrender.com/api/books/get/copies',

    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        isbn: isbn,
      }),
    }
  );
  const responseData = await response.json();
  const resposeMessage = responseData.message;

  if (responseData.success) return resposeMessage;
  return toast.error(resposeMessage);
}
