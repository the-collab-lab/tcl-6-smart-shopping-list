// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
var firebaseConfig = {
  apiKey: 'AIzaSyDz3iDPWhWm5NXttQg9VsVF_qVSjeYoEAQ',
  authDomain: 'tcl-6-smart-shopping-list.firebaseapp.com',
  databaseURL: 'https://tcl-6-smart-shopping-list.firebaseio.com',
  projectId: 'tcl-6-smart-shopping-list',
  storageBucket: 'tcl-6-smart-shopping-list.appspot.com',
  messagingSenderId: '180216340212',
  appId: '1:180216340212:web:26dcfc4872d826d8c0c8a1',
};

let fb = firebase.initializeApp(firebaseConfig);

export { fb };
