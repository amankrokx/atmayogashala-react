import database from "../database.mjs"

const getCourse = (req, res) => {
    console.log(req.params['0'])
    database.findOne({ collection: 'courses', query: {courseName: req.params['0']} }).then(result => {
        console.log(result)
        if (req.params["0"] === "test") result = true       // temproary arrangement
        if (result) {
            result = {
                photo: null,
                title: "Fit Yogi",
                date: "69/69/6969",
                description1: "Big main description dafhga vafhbv s w fljh ej qugrbg lkraugeufbf dnf erg mzvyw gfkjwrvf kjwbf auyf jwhefweygf lwF JAGRFVKUA ",
                description2: "Technical points",
                des2: [
                    "Technical description about the course",
                    "Course pricing and benefits in terms of online mode pof yoga teaching",
                    "How effective is online yoga and be regular to see results",
                    "Minimum system requirements and other detailed stuff",
                ],
                description3: "Yoga points",
                des3: [
                    "Technical description about the course",
                    "Course pricing and benefits in terms of online mode pof yoga teaching",
                    "How effective is online yoga and be regular to see results",
                    "Minimum system requirements and other detailed stuff",
                ],
                tagline: "This is a space to put on a tagline for the course",
                rating: 4.5,
                price: 1999,
                author: {
                    name: "Infinite_n00b",
                },
            }
            result["status"] = "success"
            // res.json(result)
            res.json(result)
        } else
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

export default getCourse