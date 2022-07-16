import {firebaseApp} from "../index"
import {getAuth, onAuthStateChanged} from "firebase/auth"
import SnackbarUtils from "../../components/SnackbarUtils"

const auth = getAuth(firebaseApp)
onAuthStateChanged(auth,(user) => {
    if (user) {
        SnackbarUtils.success("Logged In .")
    } else {
        SnackbarUtils.toast("Please Sign In .")
    }
})

export default auth
export * from "./"