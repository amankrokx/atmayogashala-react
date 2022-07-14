const express = require("express")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 3069

// static resources should just be served as they are
app.use(express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" }))

app.listen(PORT, error => {
    if (error) {
        return console.log("Error during app startup", error)
    }
    console.log("listening on " + PORT + "...")
})