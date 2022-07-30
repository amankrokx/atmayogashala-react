const { MongoClient } = require("mongodb")

// const url = "mongodb://localhost:27017/placement"
let collections = ["ads"]

class Database {
    constructor (url) {
        this.flag = false
        MongoClient.connect(url, async (err, dbp) => {
            if (err) throw err
            this.db = await dbp.db("atmayogashala")
            console.log("DB connected !")
            try {
                collections.forEach((v, index, arr) => {
                    this.db.createCollection("users", (err, res) => {
                        if (err || err.codeName === "NamespaceExists") {
                            console.log(err)
                            arr.length = index + 1
                            this.flag = true
                            console.log(`Collection ${v} exists !`)
                        } else if (!err) console.log("Collection created !")
                    })
                })
            } catch (error) {
                if (! this.flag) {
                    console.log("\n-------Serious Error !-------\n")
                    throw error
                } else console.log("colection already exists, chill")
            }
        })
    }
}

module.exports = new Database("mongodb://localhost:27017/placement")

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
