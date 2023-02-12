import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// collection,
// addDoc,
// getDocs,
// doc,
// onSnapshot,
// query,
// serverTimestamp,
// orderBy,
// deleteDoc,
// updateDoc,
// limit,

const firebaseConfig = {
  apiKey: "AIzaSyC7XMWQCJfzhxgsJB2zb1up12Qe4u0CMQ8",
  authDomain: "hackathon-2023-smit.firebaseapp.com",
  projectId: "hackathon-2023-smit",
  storageBucket: "hackathon-2023-smit.appspot.com",
  messagingSenderId: "877304830998",
  appId: "1:877304830998:web:743627a6f11074de926937",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const storage = getStorage(app);
