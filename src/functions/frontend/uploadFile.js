import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig";


/**
 * Upload a file to Firebase Storage and return its download URL.
 * Provides progress updates via a callback function.
 *
 * @param {File} file - The file to upload.
 * @param {string} folder - The folder path in Firebase Storage.
 * @param {function} onProgress - A callback function to handle progress updates.
 * @returns {Promise<string>} - A promise that resolves with the download URL of the uploaded file.
 */
export const uploadFile = async (file, folder, onProgress) => {
  if (!file || !folder) {
    throw new Error("File and folder are required.");
  }

  const storageRef = ref(storage, `${folder}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress)
        if (onProgress) {
          onProgress(progress);
        }
      },
      (error) => {
        console.error("Error uploading file:", error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          console.error("Error getting download URL:", error);
          reject(error);
        }
      }
    );
  });
};
