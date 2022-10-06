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
    // #################################################### Start working here  ####################################################
    const [courseDetails, setCourseDetails] = useState({
                _id: "62f91db7478ffb7c1fdfd3b6",
                cover: null,
                name: "Fit Yogi",
                created: "69/69/6969",
                shortDesc: "This is a space to put on a tagline for the course",
                longDesc: "This is a space to put on a tagline for the course",
                rating: 4.5,
                price: 1999,
                author: {
                    name: "Infinite_n00b",
                },
                buyers: 0,
                tags: ["these are the search tags"],
                chapters: "62f24aee72a5d4646611a40e,62f91b678c980c179c511f5d",
                message: "No course found."
            })

    useEffect(() => {
        window.scrollTo(0, 0)
        LoaderUtils.open()
        let course = window.location.pathname.split("/")[2].toString()
        fetch(backPath() + '/getCourse/' + course, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include",
            // headers: {
            //     "Content-Type": "text/plain",
            // },
            redirect: "follow", // manual, *follow, error
            // body: course // body data type must match "Content-Type" header
        }).then(res => res.json())
            .then(data => {
                setCourseDetails(data)
                console.log(data)
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
                    flexWrap: "nowrap",
                    alignItems: "flex-start",
                    overflowX: "scroll",
                    overflowY: "hidden",
                    padding: 20,
                    width: "100%",
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
