// Requiring firebase (as our db)
import { initializeApp } from "firebase/app";
// Importing our configuration to initialize our app
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    // apiKey: "AIzaSyAO1pYxGot5xsnxOdPc8tfQNgSXuvdBX74",
    authDomain: "original-voyage-399003.firebaseapp.com",
    databaseURL: "https://original-voyage-399003-default-rtdb.firebaseio.com",
    projectId: "original-voyage-399003",
    storageBucket: "original-voyage-399003.appspot.com",
    messagingSenderId: "738099738501",
    // appId: "1:738099738501:web:695dffe27ce6845350f6ec",
    measurementId: "G-M9ED7ZZ1E9"
  };

// Service account Authentication first

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage }