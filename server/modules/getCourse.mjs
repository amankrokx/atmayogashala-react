import { ObjectId } from "mongodb"
import database from "../database.mjs"

const getCourse = (req, res) => {
    console.log(req.params['0'])
    database.findOne({ collection: 'courses', query: {_id: ObjectId(req.params['0'])} }).then(result => {
        console.log(result)
        if (result) {
            result.status = "success"
            if (!result.author) result.author = {
                    name: "AYS",
            }
            res.json(result)
        }
        else if (req.params["0"] === "test") {
            result = {
                cover: null,
                name: "Fit Yogi",
                created: "69/69/6969",
                shortDesc: "This is a space to put on a tagline for the course",
                longDesc: "This is a space to put on a tagline for the course",
                rating: 4.5,
                price: 1999,
                author: {
                    name: "Infinite_n00b",
                },
            }
            result.status = "success"
            res.json(result)
        } else
            res.json({
                status: "error",
                message: "Course not Found .",
            })
    })
    .catch(er => {
        res.json({
            status: 'error',
            message: 'Server Error.'
        })
    })
}

export default getCourse