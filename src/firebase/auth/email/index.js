import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import auth from ".."

let signupEmail = (userid, password) => {
    // console.log('Signup with email loaded')
    createUserWithEmailAndPassword(auth, userid, password)
        .then(userCredential => {
            // Signed in
            // const user = userCredential.user;
            console.log("Signed up with email")
            return userCredential
        })
        .catch(error => {
            console.error(error)
            return error
        })
}

let loginEmail = (userid, password) => {
    // console.log('Login with Email loaded')
    signInWithEmailAndPassword(auth, userid, password)
        .then(userCredential => {
            // Signed in
            // const user = userCredential.user;
            toast("Signed in with Email !")
            return userCredential
        })
        .catch(error => {
            console.error(error)
            // ..
            return error
        })
}

export default { signupEmail, loginEmail }