import { MongoClient } from "mongodb"

// const url = "mongodb://localhost:27017/placement"
let collections = ["ads"]

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

export default new Database(process.env.MONGODB_URI || "mongodb+srv://amankrokx:ouH5RUUoWcw636mi@cluster0.ktkwxhl.mongodb.net/?retryWrites=true&w=majority" || "mongodb://localhost:27017/")

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
