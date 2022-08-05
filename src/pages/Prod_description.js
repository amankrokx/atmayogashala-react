import React, { useEffect, useState } from "react"
import Toolbar from "@mui/material/Toolbar"
import Typography from '@mui/material/Typography';
import Card from "../components/Description"
import Course_card from "../components/Card"
import pp from "../media/product4.jpg"
import backPath from "../backPath";
import LoaderUtils from "../components/Loader/LoaderUtils";
import SnackbarUtils from "../components/SnackbarUtils";


function Prod_description() {
    const [courseDetails, setCourseDetails] = useState({
        status: 'success',
        photo: pp,
        title: "Fit Yogi",
        date: "23/23/2023",
        description1:
            "Something as description about the course to be included here for the card . Buy this course and improve your body and mind in terns of everything. One minute ten breadth is a wondreful fun act yoga for quic recapture of your Body and mind state.",
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
    })

    useEffect(() => {
        LoaderUtils.open()
        let course = window.location.pathname.split("/")[2].toString()
        fetch(backPath() + '/getCourse/' + course, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // headers: {
            //     "Content-Type": "text/plain",
            // },
            redirect: "follow", // manual, *follow, error
            // body: course // body data type must match "Content-Type" header
        }).then(res => res.json())
            .then(data => {
                setCourseDetails(data)
                // console.log(data)
                LoaderUtils.close()
            })
            .catch(err => {
                setCourseDetails()
                SnackbarUtils.error("Failed to find this course .")
                console.error(err)
                LoaderUtils.close()
            })
    }, [])
    return (
        <div>
            <Toolbar></Toolbar>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                }}
            >
                {courseDetails.status === "success" ? (
                    <Card info={courseDetails}></Card>
                ) : (
                    <Typography variant="h4" color="warning">
                        {courseDetails.message}
                    </Typography>
                )}
            </div>
            <Typography
                style={{
                    margin: 30,
                    alignSelf: "center",
                    fontWeight: 700,
                    fontSize: 18,
                }}
            >
                Recomended Courses:
            </Typography>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                }}
            >
                <Course_card
                    info={{
                        photo: pp,
                        title: "Fit Yogi",
                        description: "Something as description about the course to be included here fro the card .",
                        rating: 3.5,
                        price: 1999,
                        author: {
                            name: "Aman",
                        },
                    }}
                ></Course_card>
                <Course_card
                    info={{
                        photo: pp,
                        title: "Fit Yogi",
                        description: "Something as description about the course to be included here fro the card .",
                        rating: 3.5,
                        price: 1999,
                        author: {
                            name: "Aman",
                        },
                    }}
                ></Course_card>
                <Course_card
                    info={{
                        photo: pp,
                        title: "Fit Yogi",
                        description: "Something as description about the course to be included here fro the card .",
                        rating: 3.5,
                        price: 1999,
                        author: {
                            name: "Aman",
                        },
                    }}
                ></Course_card>
                <Course_card
                    info={{
                        photo: pp,
                        title: "Fit Yogi",
                        description: "Something as description about the course to be included here fro the card .",
                        rating: 3.5,
                        price: 1999,
                        author: {
                            name: "Aman",
                        },
                    }}
                ></Course_card>
            </div>
        </div>
    )
}

export default Prod_description
