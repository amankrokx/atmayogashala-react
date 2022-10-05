import database from "../database.mjs"
import { ObjectId } from "mongodb"
import storage from "../firebase/storage/index.mjs"

const YT = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/

const addChapter = async (req, res) => {
    let k = req.body
    let p = req.files
    console.log("getting chapter")
    console.log(req.body)
    console.log(req.files)
    if (k.mode === "create") {
        // Create a new chapter
        // Validation
        if (
            (k.chapterName && k.chapterName.length > 0) &&
            (k.chapterShortDescription && k.chapterShortDescription.length > 0) &&
            (k.chapterDuration && parseInt(k.chapterDuration) > 0) &&
            (k.chapterSearchTags && k.chapterSearchTags.length > 0) &&
            (
                (k.chapterVideoUrl && YT.test(k.chapterVideoUrl))
                ||
                (p.length > 0 && (p[0].fieldname === 'chapterImage' || p[1].fieldname === 'chapterImage'))
            ) &&
            (p.length > 0 && (p[0].fieldname === 'chapterCoverImage' || p[1].fieldname === 'chapterCoverImage'))
        ) {
            // Looks good, start uploading
            let ar
            const chapterNamedId = k.chapterName.toString() + Date.now()
            if (p[0].fieldname === "chapterCoverImage") {
                ar = p[0].originalname.split('.')
                p[0].originalname = "chapterCoverImage." + ar[ar.length - 1]
                storage.upload(`Chapters/${chapterNamedId}`, p[0]).then(coverUrl => {
                    if (p.length > 1) {
                        ar = p[1].originalname.split(".")
                        p[1].originalname = "chapterImage." + ar[ar.length - 1]
                        storage.upload(`Chapters/${chapterNamedId}`, p[1])
                        .then(chapterUrl => {
                            // Both photos uploaded, add to db
                            const data = {
                                name: k.chapterName,
                                created: new Date(k.date),
                                active: false,
                                buyers: 0,
                                longDesc: k.chapterLongDescription ? k.chapterLongDescription : null,
                                shortDesc: k.chapterShortDescription,
                                duration: parseInt(k.chapterDuration),
                                video: k.chapterVideoUrl ? k.chapterVideoUrl : null,
                                photo: chapterUrl,
                                cover: coverUrl,
                                tags: k.chapterSearchTags
                            }
                            database.insertOne({
                                collection: "chapters",
                                data
                            }).then(r => {
                                res.json({
                                    status: "success",
                                    messane: "",
                                    data
                                })
                            }).catch(err => {
                                console.log(err)
                                res.json({
                                    status: "error",
                                    message: err.toString()
                                })
                            })
                        }).catch(err => {
                            // problem with uploading
                            console.log(err)
                            res.json({
                                status: "error",
                                message: err.toString()
                            })
                        })
                    }
                    else {
                        // photo not provided
                        const data = {
                            name: k.chapterName,
                            created: k.date,
                            active: false,
                            buyers: 0,
                            longDesc: k.chapterLongDescription ? k.chapterLongDescription : null,
                            shortDesc: k.chapterShortDescription,
                            duration: k.chapterDuration,
                            video: k.chapterVideoUrl ? k.chapterVideoUrl : null,
                            cover: coverUrl,
                            tags: k.chapterSearchTags,
                        }
                        database
                            .insertOne({
                                collection: "chapters",
                                data,
                            })
                            .then(r => {
                                res.json({
                                    status: "success",
                                    messane: "",
                                    data,
                                })
                            })
                            .catch(err => {
                                console.log(err)
                                res.json({
                                    status: "err",
                                    message: err.toString(),
                                })
                            })
                    }
                }).catch(err => {
                    // Cannot upload photo
                    // problem with uploading
                    console.log(err)
                    res.json({
                        status: "error",
                        message: err.toString(),
                    })
                })
            }
            else if (p[0].fieldname === "chapterImage" && p.length > 1) {
                ar = p[0].originalname.split(".")
                p[0].originalname = "chapterImage." + ar[ar.length - 1]
                storage
                    .upload(`Chapters/${chapterNamedId}`, p[0])
                    .then(coverUrl => {
                        ar = p[1].originalname.split(".")
                        p[1].originalname = "chapterCoverImage." + ar[ar.length - 1]
                        storage
                            .upload(`Chapters/${chapterNamedId}`, p[1])
                            .then(chapterUrl => {
                                // Both photos uploaded, add to db
                                const data = {
                                    name: k.chapterName,
                                    created: k.date,
                                    active: false,
                                    buyers: 0,
                                    longDesc: k.chapterLongDescription ? k.chapterLongDescription : null,
                                    shortDesc: k.chapterShortDescription,
                                    duration: k.chapterDuration,
                                    video: k.chapterVideoUrl ? k.chapterVideoUrl : null,
                                    photo: chapterUrl,
                                    cover: coverUrl,
                                    tags: k.chapterSearchTags,
                                }
                                database
                                    .insertOne({
                                        collection: "chapters",
                                        data,
                                    })
                                    .then(r => {
                                        res.json({
                                            status: "success",
                                            messane: "",
                                            data,
                                        })
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        res.json({
                                            status: "err",
                                            message: err.toString(),
                                        })
                                    })
                            })
                            .catch(err => {
                                // problem with uploading
                                console.log(err)
                                res.json({
                                    status: "error",
                                    message: err.toString(),
                                })
                            })
                    })
                    .catch(err => {
                        // Cannot upload photo
                        // problem with uploading
                        console.log(err)
                        res.json({
                            status: "error",
                            message: err.toString(),
                        })
                    })
            }
            else
                res.json({
                    status: "error",
                    message: "Improper fields",
                })
        }
        else {
            // In sufficient data
            res.json({
                status: "error",
                message: "Incomplete or missing data .",
            })
    
        }
    }
    else if (k.mode === "update") {
        console.log("update record")
    }
    else console.log("maybe delete")
}

const addCourse = async (req, res) => {
    console.log("getting course")
    console.log(req.body)
    console.log(req.files)
    let k = req.body
    if (k.mode === "create") {
        // Validate
        // shortDesc: "",
        //     price: "",
        //     name: "",
        //     active: false,
        //     buyers: "",
        //     chapters: "",
        //     cover: "",
        //     created: "",
        //     longDesc: "",
        //     price: 0,
        //     shortDesc: "",
        //     tags: "",
        //     _id: ""
        if (
            k.name &&
            k.name.length > 0 &&
            k.shortDesc &&
            k.shortDesc.length > 0 &&
            k.longDesc &&
            k.longDesc.length > 0 &&
            k.price &&
            k.chapters &&
            k.chapters.length > 0 &&
            k.tags &&
            k.tags.length > 0 &&
            req.files &&
            req.files.length > 0
        ) {
            const ar = req.files[0].originalname.split(".")
            req.files[0].originalname = k.name + "." + ar[ar.length - 1]
            storage
                .upload("Courses", req.files[0])
                .then(courseUrl => {
                    let data = {...k}
                    delete data.mode
                    delete data._id
                    data.price = parseInt(data.price)
                    data.buyers = 0
                    data.created = new Date()
                    data.date = new Date(data.date)
                    data.tags = data.tags.split(",")
                    data.chapters = data.chapters.split(",")
                    data.active = data.active === "true" ? true : false
                    data.cover = courseUrl
                    console.log(data)
                    database
                        .insertOne({ collection: "courses", data })
                        .then(() => {
                            res.json({
                                status: "success",
                                data,
                                message: "",
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            res.json({
                                status: "error",
                                message: err.toString(),
                            })
                        })
                })
                .catch(err => {
                    console.log(err)
                    res.json({
                        status: "error",
                        message: err.toString(),
                    })
                })
        } else {
            res.json({
                status: "error",
                message: "Improper field values",
            })
        }
    }
    else if (k.mode === "update") {
        console.log("update record")    

        if (!k._id) res.json({
            status: "error",
            message: "Course id not provided",
        })
        let data = {...k}
        delete data.mode
        delete data._id
        data.price = parseInt(data.price)
        data.buyers = parseInt(data.buyers)
        data.date = new Date(data.date)
        data.created = new Date(data.created)
        data.tags = await data.tags.split(",")
        data.chapters = await data.chapters.split(",")
        data.active = data.active === "true" ? true : false
        console.log(data)
        database
            .updateOne({ collection: "courses", query: { _id: ObjectId(k._id) }, data })
            .then(() => {
                res.json({
                    status: "success",
                    data,
                    message: "Course Updated",
                })
            })
            .catch(err => {
                console.log(err)
                res.json({
                    status: "error",
                    message: err.toString(),
                })
            })

    }
}

const getCourseList = (req, res) => {
    console.log("get Course List")
    if (req.params && req.params.ref === "admin" && req.session.isAdmin)
    // only for admins !!!!!!!!!!!!!!!!!!!!
        database
            .find({ collection: "courses", projection: { _id: 1, name: 1, created: 1, active: 1, buyers: 1 } })
            .then(list => {
                res.json({
                    status: "success",
                    list,
                })
            })
            .catch(err => {
                res.json({
                    status: "error",
                    message: err.toString(),
                })
            })
    else {
        let query = {}
        let projection = {}
        let sort = {}
        if (req.query) {
            const k = req.query
            if (!(req.session && req.session.isAdmin)) query.active = true
            if (k.orderBy === "popularity") sort = {buyers : -1}
            if (k._id) {
                query._id = ObjectId(k._id)
            }
            else {
                if (k.s) {
                    query.$or = [{ name: new RegExp(".*" + decodeURI(k.s).replaceAll(" ", ".*") + ".*", "i") }, { tags: new RegExp(".*" + decodeURI(k.s).replace(" ", ".*") + ".*", "i") }]
                }
                // projection = {_id: 1, name: 1, created: 1, shortDesc: 1, duration: 1, cover: 1}

            }
            console.log(k, query)
            database
                .find({
                    collection: "courses",
                    projection,
                    query,
                })
                    .then(list => {
                        res.json({
                            status: "success",
                            list,
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "error",
                            message: err.toString(),
                        })
                    })
        }
    }
}
const getChapterList = (req, res) => {
    console.log("get Course List")
    // only for admins !!!!!!!!!!!!!!!!!!!!
    database.find({collection: "chapters", projection: {_id: 1, name: 1, created: 1, active : 1, buyers: 1}}, { sort: {buyers: 1}}).then(list => {
        res.json({
            status: "success",
            list
        })
    })
    .catch(err => {
        res.json({
            status: "error",
            message: err.toString()
        })
    })
}

export { getCourseList, getChapterList, addCourse, addChapter }
