import * as firebase from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyCfz8x6uw1yHXwzXdzDovv_dV8ftMNCizU",
    authDomain: "twitter-clone-a3d68.firebaseapp.com",
    databaseURL: "https://twitter-clone-a3d68.firebaseio.com",
    projectId: "twitter-clone-a3d68",
    storageBucket: "twitter-clone-a3d68.appspot.com",
    messagingSenderId: "570163186711",
    appId: "1:570163186711:web:8abc52dd76e4659a24e052",
    measurementId: "G-XPDNDX21T4"
  };

export default firebase.initializeApp(firebaseConfig);