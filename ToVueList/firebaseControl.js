var config = {
    apiKey: "AIzaSyBupVTfGAPHKnA7i0qSIgLjIv3EHhLp3_Q",
    authDomain: "fuckfirebase-2095e.firebaseapp.com",
    databaseURL: "https://fuckfirebase-2095e.firebaseio.com",
    storageBucket: "fuckfirebase-2095e.appspot.com",
    messagingSenderId: "558985808894"
};

firebase.initializeApp(config);

var dataNodeRef = firebase.database().ref().child('data');
