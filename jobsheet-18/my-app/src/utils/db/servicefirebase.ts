import {
  getFirestore,
  collection,
  getDocs,
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

// 🔹 GENERIC GET ALL
export async function getAll(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// 🔹 GENERIC GET BY ID
export async function getById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  return snapshot.data();
}

// 🔹 GET USER BY EMAIL (REUSABLE)
export async function getUserByEmail(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length === 0) return null;

  const docSnap = querySnapshot.docs[0];
  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
}

// 🔹 SIGN IN (CREDENTIALS)
export async function signIn(email: string) {
  return await getUserByEmail(email);
}

// 🔹 SIGN UP
export async function signUp(userData: any, callback: Function) {
  const existingUser = await getUserByEmail(userData.email);

  if (existingUser) {
    return callback({
      status: "error",
      message: "Email already exists",
    });
  }

  try {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";

    await addDoc(collection(db, "users"), userData);

    callback({
      status: "success",
      message: "Register success",
    });
  } catch (error: any) {
    callback({
      status: "error",
      message: error.message,
    });
  }
}

export async function oauthSignIn(
  userData: any,
  provider: "google" | "github",
  callback: any
) {
  try {
    const existingUser = await getUserByEmail(userData.email);

    const dataToSave = {
      email: userData.email,
      fullname: userData.name || userData.fullname || "",
      image: userData.image || "",
      type: provider,
      updatedAt: new Date(),
    };

    if (existingUser) {
      const userRole = (existingUser as any).role || "member";

      await updateDoc(doc(db, "users", existingUser.id), {
        ...dataToSave,
        role: userRole,
      });

      return callback({
        status: true,
        data: { ...dataToSave, id: existingUser.id, role: userRole },
      });
    } else {
      const newUser = {
        ...dataToSave,
        role: "member",
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "users"), newUser);

      return callback({
        status: true,
        data: { ...newUser, id: docRef.id },
      });
    }
  } catch (error: any) {
    console.error(`OAuth ${provider} error:`, error);

    return callback({
      status: false,
      message: error.message,
    });
  }
}