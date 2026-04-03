import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = snapshot.data();
  return data;
}
export async function signIn(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  // console.log("Query result:", data);
  if (data) {
    // console.log("User found:", data[0]);
    return data[0];
  } else {
    return null;
  }
}
export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: Function,
) {
  const q = query(
    collection(db, "users"),
    where("email", "==", userData.email),
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  // console.log("Query result:", data);

  if (data.length > 0) {
    // user belum ada → boleh daftar
    // await addDoc(collection(db, "users"), userData);
    // console.log("User registered:", data);
    callback({
      status: "error",
      message: "Email already exists",
    });
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "user";
    await addDoc(collection(db, "users"), userData)
      .then(() => {
        callback({
          status: "success",
          message: "Email registered successfully",
        });
      })
      .catch((error) => {
        callback({
          status: "error",
          message: error.message,
        });
      });
  }
}

export async function signInWithGoogle(userData: any, callback: any) {
  try {
    const q = query(
      collection(db, "users"),
      where("email", "==", userData.email),
    );

    const querySnapshot = await getDocs(q);
    
    // Ambil data user jika ada
    const existingUser = querySnapshot.docs.length > 0 
      ? { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() as any } 
      : null;

    // Bersihkan userData agar tidak ada undefined yang bikin error Firestore
    const dataToSave = {
      email: userData.email,
      fullname: userData.name || userData.fullname || "",
      image: userData.image || "",
      type: "google",
      updatedAt: new Date(),
    };

    if (existingUser) {
      // USER SUDAH ADA -> UPDATE
      const userRole = existingUser.role || "member";
      
      // Update dokumen menggunakan ID yang ditemukan
      await updateDoc(doc(db, "users", existingUser.id), {
        ...dataToSave,
        role: userRole // Tetap gunakan role lama
      });

      callback({
        status: true,
        message: "User updated and logged in with Google",
        data: { ...dataToSave, id: existingUser.id, role: userRole },
      });
    } else {
      // USER BARU -> ADD
      const newUser = {
        ...dataToSave,
        role: "member",
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "users"), newUser);
      
      callback({
        status: true,
        message: "New user registered with Google",
        data: { ...newUser, id: docRef.id },
      });
    }
  } catch (error: any) {
    console.error("Error Firestore Google Login:", error); // Penting untuk debug
    callback({
      status: false,
      message: "Failed to register/update user with Google: " + error.message,
    });
  }
}