import { ObjectId } from "mongodb"
import database from "../database.mjs"


const getChapter = async (req, res) => {
    const _id = req.body._id
    if (!_id ) {
        res.json({
            status: 'error',
            message: 'Invalid Chapter ID.'
        })
        return
    }
    database.findOne({ collection: 'chapters', query: {_id: ObjectId(_id)} })
    .then(result => {
        if (result) {
            result.status = "success"
            res.json(result)
        }
        else {
            res.json({
                status: "error",
                message: "Chapter not Found .",
            })
        }
    })
    .catch(er => {
        res.writeHead(500).json({
            status: 'error',
            message: 'Server Error.'
        })
    })
}

export default getChapter