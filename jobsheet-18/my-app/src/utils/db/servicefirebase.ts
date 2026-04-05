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
    const data: any = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (data.length > 0) {
      // User sudah ada, update data
      userData.role = data[0].role;
      await updateDoc(doc(db, "users", data[0].id), userData);
      callback({
        status: true,
        message: "User registered and logged in with Google",
        data: userData,
      });
    } else {
      // User baru, tambah data
      userData.role = "member";
      await addDoc(collection(db, "users"), userData);
      callback({
        status: true,
        message: "User registered and logged in with Google",
        data: userData,
      });
    }
  } catch (error: any) {
    // Tangani error di sini
    callback({
      status: false,
      message: "Failed to register user with Google",
    });
  }
}

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