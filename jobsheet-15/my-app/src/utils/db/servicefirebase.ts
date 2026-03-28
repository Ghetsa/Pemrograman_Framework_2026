import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  DocumentData,
} from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

// 1. Fungsi untuk mengambil semua produk
export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

// 2. Fungsi untuk mengambil data berdasarkan ID
export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = snapshot.data();
  return data;
}

// 3. Fungsi SignUp (Pendaftaran User)
export async function signUp(userData: any, callback: (result: any) => void) {
  try {
    // Cek apakah email sudah terdaftar di koleksi "users"
    const q = query(
      collection(db, "users"),
      where("email", "==", userData.email)
    );

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (data.length > 0) {
      callback({
        status: "error",
        message: "User already exists",
      });
    } else {
      await addDoc(collection(db, "users"), userData);
      
      callback({
        status: "success",
        message: "User registered successfully",
      });
    }
  } catch (error) {
    console.error("Error during signUp:", error);
    callback({
      status: "error",
      message: "Registration failed, please try again later",
    });
  }
}