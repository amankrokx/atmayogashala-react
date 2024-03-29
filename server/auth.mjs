import { getAuth } from "firebase-admin/auth"
import firebaseApp from "./firebase/index.mjs"
import database from "./database.mjs"
const auth = getAuth(firebaseApp)

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) res.writeHead(500, err.toString())
        else res.send("success")
    })
}

const verifyCred = (req, res) => {
    console.log(req.session)
    if (req.body.mode === "test") {
        // console.log(req.session)
        if (req.session && req.session.profile) 
            res.json({
                status: "success",
                mode : (req.session.isAdmin) ? "admin" : "user",
                courses: req.session.courses
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
                database.findOne({ collection: 'users', query: { _id: req.session.profile.uid    } }).then(result => {
                    if (result) {
                        Object.assign(req.session, result)
                        res.json({
                            status: "success",
                            mode: req.session.isAdmin ? "admin" : "user",
                            courses: req.session.courses,
                        })
                        return
                    }
                    else {
                        database.insertOne({ collection: 'users', data: { _id: req.session.profile.uid, points: 1, courses: [] } }).then(result => {
                            // console.log(result)
                            Object.assign(req.session, { _id: req.session.profile.uid, points: 1, courses: [] })
                            res.json({
                                status: "success",
                                mode: req.session.isAdmin ? "admin" : "user",
                                courses: req.session.courses,
                            })

                        })
                    }
                })
                // console.log(req.session)
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

const isLoggedIn = (req, res, next) => {
    console.log()
    if (req.session && req.session.profile)
        next()
    else
        res.status(401).json({
            status: "error",
            loginRequired: true,
            message: "You are not logged in."
        })
}

const isAdmin = (req, res, next) => {
    console.log("session details :", req.session)
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

export { isAdmin, verifyCred, logout, isLoggedIn }