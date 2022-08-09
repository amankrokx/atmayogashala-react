// const express = require("express")
import path, {dirname} from "path"
import { fileURLToPath } from "url"
import express from "express"
import testRoute from "./server/modules/testRoute.mjs"
import getAds from "./server/modules/getAds.mjs"
import addAd from "./server/modules/addAd.mjs"
import getCourse from "./server/modules/getCourse.mjs"
import { config } from "dotenv"
import bodyParser from "body-parser"
import multer from "multer"
import { getCourseList, getChapterList, addCourse, addChapter } from "./server/modules/addCourses.mjs"
import addVideo from "./server/modules/addVideo.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const upload = multer()
config()
console.log(process.env.NODE_ENV)

const app = express()
// const path = require("path")
const PORT = process.env.PORT || 3069
// const testRoute = require("./server/modules/testRoute")
// const database = require("./server/database")
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,POST")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Credentials", "true")
    next()
})
app.use(express.json())
app.get('/api', testRoute)
app.get('/getAds', getAds)
app.get('/getCourse/*', getCourse)
app.post('/addVideo', upload.single('video'), addVideo)
app.get('/getCourseList', getCourseList)
app.get('/getChapterList', getChapterList)
app.post('/addCourse', upload.any(), addCourse)
app.post("/addChapter", upload.any(), addChapter)
app.post("/addAd", upload.single("photo"), addAd)
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