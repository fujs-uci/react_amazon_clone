import firebase from 'firebase';

const firebaseConfig = {

  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const toDate = (date) => { return firebase.firestore.Timestamp.fromDate(new Date()); }

export { db, auth, toDate };