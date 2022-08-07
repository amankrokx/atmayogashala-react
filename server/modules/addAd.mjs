import database from "../database.mjs"
import { ObjectId } from "mongodb"
import storage from "../firebase/storage/index.mjs"

const addAd = (req, res) => {
    // console.log(req.body, req.files)
    // res.send('error')
    if (req.body.mode === "delete") {
        database
            .findOne({ collection: "ads", query: { _id: ObjectId(req.body._id) } })
                .then(result => {
                    if (result.imagePath) {
                        storage
                            .deleteFile(result.imagePath)
                            .then(s => {
                                console.log(s)
                                database
                                    .deleteOne({ collection: "ads", query: { _id: ObjectId(req.body._id) } })
                                    .then(resd => {
                                        console.log(resd)
                                        res.send("success")
                                    })
                                    .catch(err => {
                                        res.send(err.toString())
                                    })
                            })
                            .catch(err => res.send(err.toString()))
                    } else {
                        database
                            .deleteOne({ collection: "ads", query: { _id: ObjectId(req.body._id) } })
                            .then(resd => {
                                console.log(resd)
                                res.send("success")
                            })
                            .catch(err => {
                                res.send(err.toString())
                            })
                    }
                })
                .catch(err => res.send(err.toString()))
    }
    else if (req.body.mode === "create") {
        if (req.files && req.files.length > 0) {
            req.files[0].originalname = Date.now().toString() + req.files[0].originalname
            storage.uploadAdImage(req.files[0]).then(url => {
                database.insertOne({collection: 'ads', data: {
                    title: req.body.title,
                    name: req.body.name,
                    body: req.body.body,
                    date: req.body.date,
                    imageUrl: url,
                    imagePath: "Ads/" + req.files[0].originalname

                }})
                // console.log(url)
                res.send("success")
            }).catch(err => {
                res.send(err)
                throw err
            })
        }
        else {
            database.insertOne({collection: 'ads', data: {
                title: req.body.title,
                name: req.body.name,
                body: req.body.body,
                date: req.body.date,
                imageUrl: null,
                imagePath: null
            }})
            res.send("success")
        }
    }
    else if (req.body.mode === "update") {
        if (req.files && req.files.length > 0) {
            req.files[0].originalname = Date.now().toString() + req.files[0].originalname
            storage
                .uploadAdImage(req.files[0])
                .then(url => {
                    database
                        .updateOne({
                            collection: "ads",
                            query: { _id: ObjectId(req.body._id) },
                            data: {
                                title: req.body.title,
                                name: req.body.name,
                                body: req.body.body,
                                date: req.body.date,
                                imageUrl: url,
                                imagePath: "Ads/" + req.files[0].originalname
                            },
                        })
                        .then(resd => {
                            console.log(resd)
                            // console.log(url)
                            res.send("success")
                        })
                        .catch(err => {
                            res.send(err.toString())
                        })
                })
                .catch(err => {
                    res.send(err.toString())
                    throw err
                })
        }
        else {
            database.updateOne({collection: 'ads', query: {_id: ObjectId(req.body._id)}, data: {
                title: req.body.title,
                name: req.body.name,
                body: req.body.body,
                date: req.body.date
            }})
            .then(resd => {
                console.log(resd)
                res.send("success")
            })
            .catch(err => {
                res.send(err.toString())
            })
        }
    }
}

export default addAd
