import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBiWNtktzd2azkyQgUodIWzM56icW9QjxQ",
  authDomain: "langcenter-5f2a8.firebaseapp.com",
  projectId: "langcenter-5f2a8",
  storageBucket: "langcenter-5f2a8.appspot.com",
  messagingSenderId: "736490544479",
  appId: "1:736490544479:web:08b90f7fd674f92022aaea",
  measurementId: "G-J6ECF3474M"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage, analytics, app };
