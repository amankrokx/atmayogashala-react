import { uploadVideo } from "../gapis/index.mjs"
import { Readable } from "stream"
import streamifier from "streamifier"
import fs from "fs"

const addVideo = (req, res) => {
    // console.log()
    // const uintarray = new Uint8Array(req.file.buffer)
    res.json({
        status: "success",
        videoId: "some id",
    })
    return
    uploadVideo(
        {
            titile: "sample video again",
            description: "sample desc again",
            privacy: "unlisted",
            videoReadStream: Readable.from(req.file.buffer),
        },
        (err, data) => {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                })
                throw err
            } else
                res.json({
                    status: "success",
                    videoId: data,
                })
        }
    )
    console.log(req.body, req.file)
    // res.send("ooo")
} 

export default addVideo