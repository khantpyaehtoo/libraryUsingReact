import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCwxTnUZVAyvGdxBgcq_MSfKUkN45D3jW8",
    authDomain: "library-8c437.firebaseapp.com",
    projectId: "library-8c437",
    storageBucket: "library-8c437.firebasestorage.app",
    messagingSenderId: "862146725214",
    appId: "1:862146725214:web:b9f75ed88b564c720d3bcf",
};

const app = initializeApp(firebaseConfig);

let db = getFirestore(app);

export { db };
