import {
    createUserWithEmailAndPassword,
    signOut, 
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';

const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(credential => credential.user)
}

const logOut = () => {
    return signOut(auth)
}

const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(credential => credential.user)
}

const whileLogIn = (callback) => {
    return onAuthStateChanged(auth, (user) => {
        callback(user)
    })
}

export { signUp, logIn, logOut, whileLogIn }