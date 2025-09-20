import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpwuzUYc0wasoWfyIT5YlztKdvnOUCkM8",
  authDomain: "netflix-clone-14409.firebaseapp.com",
  projectId: "netflix-clone-14409",
  storageBucket: "netflix-clone-14409.appspot.com", // ✅ corrected
  messagingSenderId: "202337447444",
  appId: "1:202337447444:web:8c74ec4adec002db6e0101"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    console.log("User signed up:", user.uid);
  } catch (error) {
    console.error(error.code, error.message);
    if (error.code === "auth/email-already-in-use") {
      alert("This email is already registered. Please log in.");
    } else {
      alert(error.message);
    }
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password); // ✅ added await
    console.log("User logged in");
  } catch (error) {
    console.error(error.code, error.message);
    alert(error.message);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error(error);
  }
};

export { auth, db, login, signup, logout };
