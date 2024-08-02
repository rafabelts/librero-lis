import {
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import { firebaseStorage } from '../firebase_options';
import { dataURLToBlob } from '../utils/base64ToBlob';

// Function to upload a file and get its URL
export async function uploadFile(base64: string, bookTitle: string) {
  try {
    // Create a reference to the file in Firebase Storage
    const storageRef = ref(firebaseStorage, `bookImages/${bookTitle}`);

    const blob = dataURLToBlob(base64);

    const imageFile = new File([blob], `${bookTitle}-image`, {
      type: blob.type,
    });

    // Upload the file
    const uploadTask = uploadBytes(storageRef, imageFile);

    // Wait for the upload to complete
    await uploadTask;

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    throw new Error(error as string);
  }
}

// Function to delete a file
export async function deleteFile(imageUrl: string) {
  try {
    // Create a reference to get the file metadata
    const storageRef = ref(firebaseStorage, imageUrl);
    const imageData = await getMetadata(storageRef);

    // Get image path
    const imagePath = imageData.fullPath;

    // Reference to delete the file
    const imageRef = ref(firebaseStorage, imagePath);
    await deleteObject(imageRef);
  } catch (error) {
    throw new Error(error as string);
  }
}
