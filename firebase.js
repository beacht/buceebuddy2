import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA-VaOpkT-y5IYP7lDtrkLDvxpIfO82_bk",
  authDomain: "buc-ee-buddy.firebaseapp.com",
  projectId: "buc-ee-buddy",
  storageBucket: "buc-ee-buddy.appspot.com",
  messagingSenderId: "307700407229",
  appId: "1:307700407229:web:89c5896cc9c75f893d10d4",
  measurementId: "G-1YNW8VRFRL"
};

firebase.initializeApp(firebaseConfig);

export default firebase;