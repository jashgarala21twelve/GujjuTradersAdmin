import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBDaayweh4TTYGpbKNBpDGxLWIZleCZ8g0',
  authDomain: 'gujju-chat-23454.firebaseapp.com',
  databaseURL:
    'https://gujju-chat-23454-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'gujju-chat-23454',
  storageBucket: 'gujju-chat-23454.firebasestorage.app',
  messagingSenderId: '510829144839',
  appId: '1:510829144839:web:3d6f3f73c6d5428b0b73a2',
};

const app = initializeApp(firebaseConfig);

export default app;
