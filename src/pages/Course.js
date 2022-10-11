import React, { useEffect, useState } from "react"
import Toolbar from "@mui/material/Toolbar"
import Typography from '@mui/material/Typography';
import backPath from "../backPath";
import LoaderUtils from "../components/Loader/LoaderUtils";
import SnackbarUtils from "../components/SnackbarUtils";
import { useTheme } from "@mui/material/styles"
import { Rating, Button, Divider, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { useWindowDimension } from "../components/useWindowDimension"
import Recommended from "../components/Recommended";

function Course() {
    const theme = useTheme();
    const matches = useMediaQuery("(min-width:756px)")
     const [coverHeight, setCoverHeight] = useState(0);
    // #################################################### Start working here  ####################################################
    // #################################################### add author info to courses  ####################################################
    const [courseDetails, setCourseDetails] = useState({
                _id: "62f91db7478ffb7c1fdfd3b6",
                cover: null,
                name: "Fit Yogi",
                created: "69/69/6969",
                shortDesc: "This is a space to put on a tagline for the course",
                longDesc: "This is a space to put on a tagline for the course",
                rating: 4.5,
                price: 1999,
                author: "Infinite_n00b",
                buyers: 0,
                tags: [],
                chapters: ["62f24aee72a5d4646611a40e,62f91b678c980c179c511f5d"],
                message: "No course found."
        })
    
        const [courses, setCourses] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
        LoaderUtils.open()
        let course = window.location.pathname.split("/")[2].toString()
        fetch(backPath + '/getCourse/' + course, {
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
                LoaderUtils.close()
                setCourseDetails(data)
                console.log(data)
            })
            .catch(err => {
                LoaderUtils.close()
                setCourseDetails()
                SnackbarUtils.error("Failed to find this course .")
                console.error(err)
            })
    }, [])

    return (
        <div>
            <section
                style={{
                    width: "100%",
                    position: matches ? "relative" : null,
                }}
            >
                {/* // top black section course header */}
                <div
                    style={{
                        width: "100%",
                        backgroundColor: theme.palette.black.main,
                        color: theme.palette.grey.A400,
                        padding: matches ? "50px 15%" : "0 0 24px 0",
                    }}
                >
                    <div
                        style={ matches ? {
                                maxWidth: "calc(100% - 32% - 200px)",
                                minWidth: "calc(100% - 32% - 400px)",
                                width: "38%",
                            } : {
                                width: "100%",
                                boxSizing: "border-box",
                                padding: "24px",
                            }
                        }
                    >
                        <Typography variant="h4" color="white">
                            {courseDetails.name}
                        </Typography>
                        <Typography variant="h6" color={theme.palette.grey.A400}>
                            {courseDetails.shortDesc}
                        </Typography>
                        <div style={{ display: "flex" }}>
                            <Rating name="read-only" value={courseDetails.rating || 3.5} size="small" precision={0.5} defaultValue={1} readOnly />
                            <Typography variant="caption" color={theme.palette.grey.A400} sx={{ ml: 2 }}>
                                7806 Buyers
                            </Typography>
                        </div>
                        <Typography variant="body2" color={theme.palette.grey.A400}>
                            {"Created By" + " "}
                            <Link to={"/search?k=" + encodeURI(courseDetails.author.trim())} style={{ color: theme.palette.primary.main }}>
                                {courseDetails.author}
                            </Link>
                        </Typography>
                        <Typography variant="body2">
                            <span className="material-icons" style={{ color: theme.palette.grey.A400, fontSize: "1rem", verticalAlign: "text-bottom" }}>
                                history
                            </span>
                            {" Last Updated " + new Date(courseDetails.created).toDateString()}
                            <br />
                            <span className="material-icons" style={{ color: theme.palette.grey.A400, fontSize: "1rem", verticalAlign: "text-bottom" }}>
                                language
                            </span>
                            {" English "}
                            <span className="material-icons" style={{ color: theme.palette.grey.A400, fontSize: "1rem", paddingLeft: 8, verticalAlign: "text-bottom" }}>
                                subtitles
                            </span>
                            {" English "}
                        </Typography>
                    </div>
                    {/* // Floating product card */}
                    <div
                        style={ 
                            matches ? {
                                width: "30%",
                                minWidth: "200px",
                                maxWidth: "400px",
                                position: "absolute",
                                top: 50,
                                right: "15%",
                                minHeight: 600,
                                border: "2px solid " + theme.palette.white.main,
                                borderRadius: 2,
                                zIndex: 2,
                                backgroundColor: theme.palette.white.main,
                                boxShadow: theme.shadows[5],
                            } : {
                                border: "2px solid " + theme.palette.white.main,
                                borderRadius: 2,
                                zIndex: 2,
                                backgroundColor: theme.palette.white.main,
                                boxShadow: theme.shadows[5],
                                width: "calc(100% - 36px)",
                                margin: "0 auto",
                                bozSizing: "border-box",
                                position: "relative",
                            }
                        }
                    >
                        <img
                            src={courseDetails.cover}
                            id="coverImg"
                            alt="course cover"
                            style={{ width: "100%" }}
                            onLoad={e => {
                                setCoverHeight(e.target.height)
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: coverHeight,
                                boxShadow: "rgb(0 0 0 / 70%) 0px 0px 40px 10px inset",
                            }}
                        ></div>
                        <div>
                            <Typography variant="h6" color={theme.palette.grey.A700} style={{ padding: "24px 0 0 24px" }}>
                                Get this course for
                            </Typography>
                            <Typography variant="h4" color="initial" style={{ padding: "0 24px", fontWeight: "bold" }}>
                                {"₹" + courseDetails.price}
                            </Typography>
                            <Button variant="contained" color="primary" style={{ width: "calc(100% - 48px)", marginLeft: 24, borderRadius: 0, textTransform: "none" }}>
                                Buy now
                                <span className="material-icons" style={{ position: "relative", left: 10 }}>
                                    shopping_cart
                                </span>
                            </Button>
                            <br />
                            <br />
                            <Button variant="outlined" color="primary" style={{ width: "calc(100% - 48px)", marginLeft: 24, borderRadius: 0, textTransform: "none" }}>
                                Share
                                <span className="material-icons" style={{ position: "relative", left: 20 }}>
                                    share
                                </span>
                            </Button>
                            <div>
                                <Typography variant="body2" color="initial" sx={{ fontWeight: "bold", p: 3, pb: 1 }}>
                                    This Course includes :
                                </Typography>
                                <div
                                    style={{
                                        padding: "0 24px",
                                        color: theme.palette.text.primary,
                                        fontSize: "0.875rem",
                                    }}
                                >
                                    <span className="material-icons" style={{ fontSize: "1rem", verticalAlign: "middle", paddingRight: 8 }}>
                                        ondemand_video
                                    </span>
                                    8 minutes on-demand video
                                    <br />
                                    <br />
                                    <span className="material-icons" style={{ fontSize: "1rem", verticalAlign: "middle", paddingRight: 8 }}>
                                        article
                                    </span>
                                    1 Guide to follow along
                                    <br />
                                    <br />
                                    <span className="material-icons" style={{ fontSize: "1rem", verticalAlign: "middle", paddingRight: 8 }}>
                                        all_inclusive
                                    </span>
                                    Lifetime access
                                    <br />
                                    <br />
                                    <span className="material-icons" style={{ fontSize: "1rem", verticalAlign: "middle", paddingRight: 8 }}>
                                        public
                                    </span>
                                    Web Access amywhere anytime
                                    <br />
                                    <br />
                                    <span className="material-icons" style={{ fontSize: "1rem", verticalAlign: "middle", paddingRight: 8 }}>
                                        emoji_events
                                    </span>
                                    Certificate of completion
                                    <br />
                                    <br />
                                </div>
                            </div>

                            <Divider />
                            <Typography variant="h6" color="initial" sx={{ p: 3, pb: 0 }}>
                                Training lots of people ?
                            </Typography>
                            <Typography variant="body2" color="initial" sx={{ pl: 3, pr: 3, pb: 1 }}>
                                Get Bulk access to courses and save upto 50%.
                            </Typography>
                            <Button variant="outlined" color="primary" style={{ width: "calc(100% - 48px)", marginLeft: 24, borderRadius: 0, textTransform: "none" }}>
                                Contact Sales
                            </Button>
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
                {/* // below course description */}
                <div
                    style={{
                        maxWidth: "calc(100% - 32% - 200px)",
                        minWidth: "calc(100% - 32% - 400px)",
                        width: "38%",
                        padding: "50px 15%",
                    }}
                >
                    <table>
                        <tbody>
                            <tr>
                                <td dangerouslySetInnerHTML={{ __html: courseDetails.longDesc }} />
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            { courseDetails.tags && courseDetails.tags.length > 0 ? <Recommended tags={courseDetails.tags} /> : null }
        </div>
    )
}

export default Course
