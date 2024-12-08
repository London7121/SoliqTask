import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBRyNadYOGUFKvbhWZPJqyTMbWuqkqyYMU",
  authDomain: "power-uz-instagram.firebaseapp.com",
  projectId: "power-uz-instagram",
  storageBucket: "power-uz-instagram.appspot.com",
  messagingSenderId: "1076255298324",
  appId: "1:1076255298324:web:3f7a4c5f7a7b4c5f7a7b4c5f",
  databaseURL: "https://power-uz-instagram-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
