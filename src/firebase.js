import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyAulPGDKCrOiYXETA-bxdnSdD8IFaZUPa0",
    authDomain: "netflix-clone-536ce.firebaseapp.com",
    projectId: "netflix-clone-536ce",
    storageBucket: "netflix-clone-536ce.firebasestorage.app",
    messagingSenderId: "764863737485",
    appId: "1:764863737485:web:18591d2a0b03eca212fcc4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user", {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        }))
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email, password)=>{
try {
    await signInWithEmailAndPassword(auth, email, password);
} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
}
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};