import database from "../database.mjs"

const getAds = (req, res) => {
    database.find({collection: 'ads', query: {}, limit: 100, sort: {date: 1}})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.send(err)
        })
}

export default getAds