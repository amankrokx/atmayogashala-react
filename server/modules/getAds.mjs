const getAds = (database) => {
    return (req, res) => {
        database.find({collection: 'ads', data: {name: '*'}, limit: 5, sort: {date: -1}})
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.send(err)
            })
    }
}

export default getAds