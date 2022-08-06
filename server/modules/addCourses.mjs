
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
                _id: 'fad35468f4b35df4b8894b3',
                foreginID: 'c3ad54g6rtn3tyh5468s6vd',
                active: true,
                buyers: 0
            },
            {
                name: '3 Minute 10 Breaths',
                _id: 'fad35468f4b35df4b45t4b3',
                foreginID: 'c3ad54g6rtn3tyh5468s6vd',
                active: false,
                buyers: 4
            },
        ],
        message: ""
    })
}
const getChapterList = (req, res) => {
    console.log("get Course List")
    res.json({
        status: "success",
        list: [
            {
                name: 'paadasana',
                _id: 'fad35468f4b35df4b86t4b3',
                foreginID: 'c3ad54g6rtn3tyh5468s6vd',
                active: true,
                buyers: 5
            },
            {
                name: 'Homeworkaasana',
                _id: 'fad35468f4b35df4b8894b3',
                foreginID: 'c3ad54g6rtn3tyh5468s6vd',
                active: true,
                buyers: 0
            },
            {
                name: 'khawasana',
                _id: 'fad35468f4b35df4b45t4b3',
                foreginID: 'c3ad54g6rtn3tyh5468s6vd',
                active: false,
                buyers: 4
            },
        ],
        message: ""
    })
}

export { getCourseList, getChapterList }