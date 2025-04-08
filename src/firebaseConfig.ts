import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCfnV1ahzhp3fsvITzK598mJwBLWtomkGM',
  authDomain: 'gujjutraders-98b55.firebaseapp.com',
  databaseURL: 'https://gujjutraders-98b55-default-rtdb.firebaseio.com/',
  projectId: 'gujjutraders-98b55',
  storageBucket: 'gujjutraders-98b55.firebasestorage.app',
  messagingSenderId: '958864494595',
  appId: '1:958864494595:web:bd0937f9679fa6eea7fe36',
  measurementId: 'G-N7T26XX44Q',
};

const app = initializeApp(firebaseConfig);

export default app;
