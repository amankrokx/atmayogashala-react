import { getAuth } from "firebase-admin/auth"
import firebaseApp from "./firebase/index.mjs"

const auth = getAuth(firebaseApp)

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) res.writeHead(500, err.toString())
        else res.send("success")
    })
}

const verifyCred = (req, res) => {
    if (req.body.mode === "test") {
        // console.log(req.session)
        if (req.session && req.session.profile) 
            res.json({
                status: "success",
                mode : (req.session.isAdmin) ? "admin" : "user"
            })
        else res.json({
            status: "unVerified",
            // mode: "user"
        })
    }
    else if (req.body.mode === "set") {
        if (req.body.jwt) {
            auth.verifyIdToken(req.body.jwt).then(r => {
                req.session.profile = r
                req.session.isAdmin = r.email === "amankumar.spj410@gmail.com"
                req.session.lastModified = new Date()
                // console.log(req.session)
                res.json({
                    status: "success",
                    mode: (req.session.isAdmin) ? "admin" : "user"
                })
                console.log("verified jwt token")
            })
            .catch(e => {
                res.json({
                    status: "error",
                    message: e.toString()
                })
            })
        }
        else res.json({
            status: "error",
            message: "Invalid Fields ."
        })
    }
}

const isAdmin = (req, res, next) => {
    // console.log("session details :", req.session)
    if (req.session && req.session.isAdmin) next()
    else {
        if (req.body && req.body.jwt) {
            auth.verifyIdToken(req.body.jwt)
                .then(r => {
                    req.session.profile = r
                    req.session.isAdmin = (r.email === "amankumar.spj410@gmail.com")
                    req.session.lastModified = new Date()
                    console.log("verified jwt token")
                    next()
                })
                .catch(err => {
                    res.json({
                        status: "error",
                        message: err,
                    })
                    // next(err)
                    throw err
                })
        }
        else {
            res.json({
                status: "error",
                message: "UnAuthorised 403"
            })
        }
    }
}

export { isAdmin, verifyCred, logout }