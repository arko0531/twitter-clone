import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCdzw0caHPMAOofOAS7keuhiWRifpynIdE',
  authDomain: 'nwitter-reloaded-cec63.firebaseapp.com',
  projectId: 'nwitter-reloaded-cec63',
  storageBucket: 'nwitter-reloaded-cec63.firebasestorage.app',
  messagingSenderId: '984014182213',
  appId: '1:984014182213:web:5443f109a08e5ff164102c',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
