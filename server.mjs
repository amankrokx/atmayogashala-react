// const express = require("express")
import path, {dirname} from "path"
import { fileURLToPath } from "url"
import express from "express"
import testRoute from "./server/modules/testRoute.mjs"
import getAds from "./server/modules/getAds.mjs"
import addAd from "./server/modules/addAd.mjs"
import {getCourse, getAChapter} from "./server/modules/getCourse.mjs"
import { config } from "dotenv"
import bodyParser from "body-parser"
import multer from "multer"
import { getCourseList, getChapterList, addCourse, addChapter } from "./server/modules/addCourses.mjs"
import addVideo from "./server/modules/addVideo.mjs"
import session from "express-session"
import MongoStore from "connect-mongo"
import { isAdmin, isLoggedIn, logout, verifyCred } from "./server/auth.mjs"
import getChapter from "./server/modules/getChapter.mjs"
import { generateOrder, getCost, handleWebhook, verifyPayment } from "./server/razorpay/index.mjs"

const arr = ["log", "warn", "error"].forEach(methodName => {
    const originalMethod = console[methodName]
    console[methodName] = (...args) => {
        let initiator = "unknown place"
        try {
            throw new Error()
        } catch (e) {
            if (typeof e.stack === "string") {
                let isFirst = true
                for (const line of e.stack.split("\n")) {
                    const matches = line.match(/^\s+at\s+(.*)/)
                    if (matches) {
                        if (!isFirst) {
                            // first line - current function
                            // second line - caller (what we are looking for)
                            initiator = "\x1b[33m at " + matches[1] + "\x1b[0m"
                            break
                        }
                        isFirst = false
                    }
                }
            }
        }
        originalMethod.apply(console, [...args, "\n", initiator])
    }
})

const __dirname = dirname(fileURLToPath(import.meta.url))
const upload = multer()
let dotenv;
if (process.env.NODE_ENV !== 'production')  dotenv = config({path: "./.env"})
    console.log(dotenv)
console.log(process.env.NODE_ENV)

const app = express()
const PORT = process.env.PORT || 3069

let origins = ["https://atmayogashala.herokuapp.com", "https://gray-plant-0e1feea00.1.azurestaticapps.net"]
if (process.env.NODE_ENV === "development") origins.push("http://localhost:3069", "http://localhost:3000", "http://192.168.29.47:3000")
app.use(function (req, res, next) {
    if (origins.includes(req.headers.origin)) {
        res.header("Access-Control-Allow-Origin", req.headers.origin) // restrict it to the required domain
    }
    // res.header("Access-Control-Allow-Origin", origins) // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,POST")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Credentials", "true")
    next()
})

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        sameSite: true,
        path: "/",
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || "mongodb://localhost:27017/",
            dbName: "atmaYogaShala",
            ttl: 14 * 24 * 60 * 60, // 14 Days
            touchAfter: 600, // writes to db every 10 minutes
            crypto: {
                secret: process.env.SESSION_KEY,
            },
        }),
        saveUninitialized: false, // don't create session until something stored
        resave: false, //don't save session if unmodified
    })
)
    
app.use(express.json())
// app.use(isAdmin)
app.get("/razorpay", handleWebhook)
app.get('/api', testRoute)
app.get('/getAds', getAds)
app.get('/getCourse/*', getCourse)
app.get('/getCourseList', getCourseList)
app.get("/getChapterList", isAdmin, getChapterList)
app.get('/logout', logout)
app.post("/getAChapter", isLoggedIn, getAChapter)
app.post('/addVideo', isAdmin, upload.single('video'), addVideo)
app.post("/getChapter", isAdmin, getChapter)
app.post("/addCourse", isAdmin, upload.any(), addCourse)
app.post("/addChapter", isAdmin, upload.any(), addChapter)
app.post("/addAd", isAdmin, upload.single("photo"), addAd)
app.post("/verifyCred", verifyCred)
app.post("/getCost", getCost)
app.post("/generateOrder", isLoggedIn, generateOrder)
app.post("/razorpay", handleWebhook)
app.post("/verifyPayment", isLoggedIn, verifyPayment)
// static resources should just be served as they are
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, "build"), { maxAge: "30d" }))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'))
})
// setTimeout(() => {
//     database.insertOne({collection: 'ads', data: {name: '1 minute 10 breaths', date: new Date()}})
// }, 2000)

app.listen(PORT, error => {
    if (error) {
        return console.log("Error during app startup", error)
    }
    console.log("listening on " + PORT + "...")
})