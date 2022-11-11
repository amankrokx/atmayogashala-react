import { ObjectId } from "mongodb"
import database from "../database.mjs"
import ytdl from 'ytdl-core'

async function getVideoInfo(url) {
    const id = ytdl.getURLVideoID(url)
    var videoInfo = await ytdl.getInfo(id)
    var hd
    try {
        hd = videoInfo.formats.find(x => x.itag == 22).url
    } catch (e) {}
    var sd = videoInfo.formats.find(x => x.itag == 18).url
    var audio = videoInfo.formats.find(x => x.itag == 140).url
    var formats = { hd, sd, audio }
    return formats
}

let courseCache = {}

const getCourse = (req, res) => {
    // Return full details if already brought, else just return the basic details
    // console.log(req)
    if (req.params['0'] === 'undefined') {
        res.send({status: "error", error: 'No course selected'})
        return
    }
    const learn = req.session && req.session.courses && req.session.courses.some(course => course.courseId === req.params["0"])
    if (req.query.learn && learn)
        database.findOne({ collection: "courses", query: {_id: ObjectId(req.params['0'])}})
            .then(result => {
                courseCache[result._id] = result
                res.send({status: "success", ...result, learn: true})
            })
            .catch(err => res.send({status: "error", error: err}))
    else
        database.findOne({ collection: 'courses', query: {_id: ObjectId(req.params['0'])} }).then(result => {
            console.log(result)
            if (result) {
                result.status = "success"
                result.learn = false
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

const getAChapter = (req, res) => {
    console.log(req.query)
    if (
        req.query.course && 
        req.query.chapter &&
        req.session.courses.some(course => course.courseId === req.query.course) //&&
        // courseCache[req.query.course].chapters.includes(req.query.chapter)
    ) {
        database.findOne({ collection: 'chapters', query: {_id: ObjectId(req.query.chapter)}}).then(result => {
            if (result) {
                getVideoInfo(result.video).then(formats => {
                    result.status = "success"
                    result.formats = formats
                    res.json(result)
                    // courseCache[req.query.course].chapters[req.query.chapter] = result
                })
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
    else {
        res.json({
            status: 'error',
            message: 'Course or Chapter not found'
        })
    }
}

export {getCourse, getAChapter}