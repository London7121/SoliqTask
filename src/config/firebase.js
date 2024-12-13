import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDPBHgTOYGIvQXqwPmGLRWHBsxbYVTUgGE",
  authDomain: "powershop-uz.firebaseapp.com",
  projectId: "powershop-uz",
  storageBucket: "powershop-uz.appspot.com",
  messagingSenderId: "1004863768095",
  appId: "1:1004863768095:web:8d9d9b9b9b9b9b9b9b9b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
