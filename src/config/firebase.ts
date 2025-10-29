import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBnTj8RtKP-UeCF7EbniE2Almv67J3AJ-U",
  authDomain: "auto-parts-server.firebaseapp.com",
  projectId: "auto-parts-server",
  storageBucket: "auto-parts-server.firebasestorage.app",
  messagingSenderId: "64711871159",
  appId: "1:64711871159:web:81d9f409fff8d19a1a1b32"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
