import Typography from '@mui/material/Typography'
import Card from "../Card"
import React, { useEffect, useState } from 'react'
import bring from "../bring"
import LoaderUtils from '../Loader/LoaderUtils'
import SnackbarUtils from '../SnackbarUtils'

export default function Recommended({tags}) {
    const [courses, setCourses] = useState([])
    console.log(courses)
    useEffect(() => {
        if (tags && tags.length <= 0) return
        LoaderUtils.open()
        bring({
            path: "/getCourseList?related=" + encodeURI(tags.join(","))
        }).then(data => {
            LoaderUtils.close()
            if (data.status === "success") setCourses(data.list)
            else SnackbarUtils.error(data.message || "Server Error with Recommended Courses")
        })
    }, [tags])

    return (
        <>
            <Typography
                variant="h5"
                color="initial"
                style={{
                    margin: "0 30px",
                    fontWeight: "bold",
                    marginTop: "20px",
                }}
            >
                Recomended Courses:
            </Typography>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    overflow: "scroll hidden",
                    padding: 20,
                    boxSizing: "border-box",
                    width: "100%",
                    flexDirection: "row",
                    alignContent: "center",
                }}
            >
                {
                    courses ? courses.map((course, index) => <Card info={course} key={index} />) : null
                }
            </div>
        </>
    )
}