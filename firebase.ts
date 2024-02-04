
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBBh1_sMP6tBskao4ylNjLdShIRkPVaDtU",
    authDomain: "upload-app-263fa.firebaseapp.com",
    projectId: "upload-app-263fa",
    storageBucket: "upload-app-263fa.appspot.com",
    messagingSenderId: "736311390559",
    appId: "1:736311390559:web:c74d611c7ab7f4811d86ea"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };