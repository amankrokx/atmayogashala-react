import database from "../database.mjs"
import { ObjectId } from "mongodb"

const addAd = (req, res) => {
    // console.log(req.body)
    if (req.body.mode === "delete") {
        database
            .deleteOne({ collection: "ads", query: { _id: ObjectId(req.body.data.values._id) } })
            .then(resd => {
                console.log(resd)
                res.send("success")
            })
            .catch(err => {
                res.send(err.toString())
            })
    }
    else if (req.body.mode === "create") {
        database.insertOne({collection: 'ads', data: {
            title: req.body.data.values.title,
            name: req.body.data.values.name,
            body: req.body.data.values.body,
            date: req.body.data.date
        }})
        res.send("success")
    }
}

export default addAd
