
const getCourseList = (req, res) => {
    console.log("get Course List")
    res.json({
        status: "success",
        list: [
            {
                name: '1 Minute 10 Breaths',
                _id: 'fad35468f4b35df4b86t4b3',
                foreginID: 'c3ad54g6rtn3tyh5468s6vd',
                active: true,
                buyers: 5
            },
            {
                name: '2 Minute 10 Breaths',
                _id: 'fad35468f4b35df4b86t4b3',
                foreginID: 'c3ad54g6rtn3tyh5468s6vd',
                active: true,
                buyers: 0
            },
            {
                name: '3 Minute 10 Breaths',
                _id: 'fad35468f4b35df4b86t4b3',
                foreginID: 'c3ad54g6rtn3tyh5468s6vd',
                active: false,
                buyers: 4
            },
        ],
        message: ""
    })
}

export { getCourseList }