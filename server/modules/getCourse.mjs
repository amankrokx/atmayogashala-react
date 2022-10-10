import { ObjectId } from "mongodb"
import database from "../database.mjs"

const getCourse = (req, res) => {
    // Return full details if already brought, else just return the basic details
    console.log(req.params['0'])
    if (req.params['0'] === 'undefined') {
        res.send({status: "error", error: 'No course selected'})
        return
    }

    
    database.findOne({ collection: 'courses', query: {_id: ObjectId(req.params['0'])} }).then(result => {
        console.log(result)
        if (result) {
            result.status = "success"
            if (!result.author) result.author = {
                    name: "AYS",
            }
            res.json(result)
        }
        else
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