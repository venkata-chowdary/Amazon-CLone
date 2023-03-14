const firebaseConfig = {
    apiKey: "AIzaSyAz6OtbJlDqzofVwNtLVInnHinEGRqE1EE",
    authDomain: "clone-277a3.firebaseapp.com",
    projectId: "clone-277a3",
    storageBucket: "clone-277a3.appspot.com",
    messagingSenderId: "376258069874",
    appId: "1:376258069874:web:a8f648333486709cd4c9eb",
    measurementId: "G-BSHM4DZG58"
  };
  
  firebase.initializeApp(firebaseConfig)
  firebase.analytics();
  var db = firebase.firestore();
  