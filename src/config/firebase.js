import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfrp_3IKm310vP9qJNUx8-7gZ-vO5WdHc",
    authDomain: "travelscape-4733e.firebaseapp.com",
    projectId: "travelscape-4733e",
    storageBucket: "travelscape-4733e.firebasestorage.app",
    messagingSenderId: "771365553321",
    appId: "1:771365553321:web:9f72eec8aab368b4d8d5b8",
    measurementId: "G-WBZ3YEC837"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

// Note: Replace the placeholder values with your actual Firebase config
// You'll need to create a Firebase project and get these values from the Firebase Console
