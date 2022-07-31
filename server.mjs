// const express = require("express")
import path, {dirname} from "path"
import { fileURLToPath } from "url"
import express from "express"
import testRoute from "./server/modules/testRoute.mjs"
import database from "./server/database.mjs"
import getAds from "./server/modules/getAds.mjs"


const app = express()
// const path = require("path")
const PORT = process.env.PORT || 3069
const __dirname = dirname(fileURLToPath(import.meta.url))
// const testRoute = require("./server/modules/testRoute")
// const database = require("./server/database")
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,POST")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Credentials", "true")
    next()
})
app.get('/api', testRoute)
app.get('/getAds', getAds(database))
// static resources should just be served as they are
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