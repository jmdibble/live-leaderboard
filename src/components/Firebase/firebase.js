import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
  apiKey: "AIzaSyBhqhEHDSENCiD-eFfA9Ah97sasinoh6q0",
  authDomain: "muse-leaderboard.firebaseapp.com",
  databaseURL: "https://muse-leaderboard.firebaseio.com",
  projectId: "muse-leaderboard",
  storageBucket: "muse-leaderboard.appspot.com",
  messagingSenderId: "746199317293",
  appId: "1:746199317293:web:e5c7695df0083ead"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // AUTH API

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // USER API

  user = uid => this.db.ref(`users/${uid}`);
  points = uid => this.db.ref(`users/${uid}/points`);


  users = () => this.db.ref('users');

}


export default Firebase;