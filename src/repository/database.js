import firebase from 'firebase';

const config = {
  databaseURL: 'https://distributed-scrum-retro.firebaseio.com/',
};
firebase.initializeApp(config);

export default firebase.database();
