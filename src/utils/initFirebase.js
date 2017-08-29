import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB83-L7YE-Jwo_TOqnO9zBCOTDFZRIe3s0",
  authDomain: "react-rx-snake.firebaseapp.com",
  databaseURL: "https://react-rx-snake.firebaseio.com",
  projectId: "react-rx-snake",
  storageBucket: "react-rx-snake.appspot.com",
  messagingSenderId: "682127798221"
};
firebase.initializeApp(firebaseConfig);

firebase.auth().signInAnonymously().catch(console.error);
