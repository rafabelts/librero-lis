import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "../firebase_options";
import { toast } from "sonner";


// Function to upload a file and get its URL
export async function uploadFile(file, bookTitle: string) {
  try {
    // Create a reference to the file in Firebase Storage
        const storageRef = ref(firebaseStorage, `bookImages/${bookTitle}`)

    // Upload the file
    const uploadTask = uploadBytes(storageRef, file);

    // Wait for the upload to complete
    await uploadTask;

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;

  } catch (error) {
        toast.error('Se produjo un error al subir la imagen, intenta de nuevo más tarde')
  }
}
