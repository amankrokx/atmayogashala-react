import { onAuthStateChanged } from "firebase/auth";
import auth from ".";
import SnackbarUtils from "../../components/SnackbarUtils";

class User {
    constructor () {
        onAuthStateChanged(auth, user => {
            if (user) this.loggedIn = true
            else this.loggedIn = false
            this.user = user
        })
    }

    isLogged () {
        return this.loggedIn
    }
    getUser () {
        if (this.loggedIn) return this.user
        SnackbarUtils.error('Not logged in .')
        return false
    }
}

export default new User()