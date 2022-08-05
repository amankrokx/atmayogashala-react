import {initializeApp, cert} from "firebase-admin/app"
import firebaseAdminKey from "./firebase-admin-service-account.mjs"

const firebaseApp = initializeApp({
    credential: cert(firebaseAdminKey),
    databaseURL: "https://atmayogashala-3485c-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "gs://atmayogashala-3485c.appspot.com",
})

export default firebaseApp