import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "./firebase";

const storage = getStorage(app);

export async function uploadImage(file: File, userId: string) {
  const storageRef = ref(storage, `profiles/${userId}`);

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);
  return url;
}