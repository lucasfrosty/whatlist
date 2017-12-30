import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyD8r6U3Qm6Agmp-Xe5fGDtXB6E5--5hWbw',
  authDomain: 'to-watch-list-96f3c.firebaseapp.com',
  databaseURL: 'https://to-watch-list-96f3c.firebaseio.com',
  projectId: 'to-watch-list-96f3c',
  storageBucket: '',
  messagingSenderId: '912934035631',
};

firebase.initializeApp(config);

export default firebase;
export const database = firebase.database();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
