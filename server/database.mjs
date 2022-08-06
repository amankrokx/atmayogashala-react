import { MongoClient } from "mongodb"

// const url = "mongodb://localhost:27017/placement"
let collections = ["ads", "courses", "chapters"]

/**
 * courses
 *      Name        <string>
 *      _id         <database generated id>
 *      created     <Date>
 *      active      <boolean>
 *      buyers      <Number>
 *      Prerequis   <String []array>
 *      cover       <Firebase storage URL>
 *      price       <Number>
 *      shortDesc   <String>
 *      desc        <String>
 *      rating      <Float>
 *      buyers      <Number>
 *      duration    <Number minutes>
 *      syllabus    <Chapter _id[]array>
 * 
 * chapters
 *      Name        <string>
 *      _id         <database generated id>
 *      created     <Date>
 *      active      <boolean>
 *      buyers      <Number>
 *      shortDesc   <string>
 *      cover       <Firebase storage URL>
 *      procedure   <HTML String>
 *      duration    <Number minutes>+
 *      video       <Youtube URL>
 *      photo       <Firebase storage URL>
 */

class Database {
    constructor (url) {
        this.flag = false
        MongoClient.connect(url, async (err, dbp) => {
            if (err) throw err
            this.db = dbp.db('atmaYogaShala')
            console.log("DB connected !")
            try {
                collections.forEach((v, index, arr) => {
                    this.db.createCollection(v, (err, res) => {
                        if (err && err.codeName === "NamespaceExists") {
                            // console.log(err)
                            arr.length = index + 1
                            this.flag = true
                            console.log(`Collection ${v} exists !`)
                        } else if (!err) console.log("Collection created !")
                    })
                })
            } catch (error) {
                if (! this.flag) {
                    console.log("\n-------Serious Error !-------\n")
                    // throw error
                } else console.log("colection already exists, chill")
            }
        })
    }

    insertOne = ({collection, data}) => {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).insertOne(data, (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    }

    insertMany = ({collection, data}) => {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).insertMany(data, (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    }

    findOne = ({collection, query}) => {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).findOne(query, (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }

    deleteOne = ({collection, query}) => {
        return new Promise((resolve, reject) => {
            console.log(query)
            this.db.collection(collection).deleteOne(query, (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }

    updateOne = ({collection, query, data}) => {
        return new Promise((resolve, reject) => {
            console.log(query)
            this.db.collection(collection).updateOne(query, {$set : data },(err, result) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                else resolve(result)
            })
        })
    }

    find = ({collection, query, limit = Math.max, sort = {}}) => {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).find(query).sort(sort).limit(limit).toArray((err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }
}

let dbString = ""
if (process.env.NODE_ENV != "production")
    dbString = "mongodb://localhost:27017/"
else dbString = "mongodb+srv://amankrokx:ouH5RUUoWcw636mi@cluster0.ktkwxhl.mongodb.net/?retryWrites=true&w=majority"
    export default new Database(process.env.MONGODB_URI || dbString)

// module.exports = {
//     connect: callback => {
//         MongoClient.connect(url, async (err, db) => {
//             if (err) throw err
//             console.log("DB connected !")
//             dbo = await db.db("placement")
//             try {
//                 collections.forEach((v, index, arr) => {
//                     dbo.createCollection("users", (err, res) => {
//                         if (err && err.codeName === "NamespaceExists") {
//                             arr.length = index + 1
//                             flag = true
//                             console.log(`Collection ${v} exists !`)
//                         } else if (!err) console.log("Collection created !")
//                     })
//                 })
//             } catch (error) {
//                 if (!flag) {
//                     console.log("\n-------Serious Error !-------\n")
//                     throw error
//                 } else console.log("colection already exists, chill")
//             } finally {
//                 return callback(err, dbo)
//             }
//         })
//     },

//     getdb: () => {
//         return dbo
//     },
// }
