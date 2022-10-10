import React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Button, useMediaQuery, Tooltip, Tab, Tabs } from "@mui/material"
import SnackbarUtils from "../SnackbarUtils"
import { useState } from "react"
import { useEffect } from "react"
import backPath from "../../backPath"
import LoaderUtils from "../Loader/LoaderUtils"
import ChapterEditor from "./ChapterEditor"
import CourseEditor from "./CourseEditor"


const CourseManager = () => {
    const matches = useMediaQuery("(min-width:756px)")
    const [courseLists, setCourseLists] = useState([])
    const [chapterLists, setChapterLists] = useState([])
    const [openEditor, setOpenEditor] = useState({open : false, tab: null, details: null})
    const [reload, setReload] = useState(0)
    const [tab, setTab] = React.useState("chapter")

    const handleChange = (event, newValue) => {
        setTab(newValue)
    }

    useEffect(() => {
        console.log(`fetching ${tab} lists`)
        LoaderUtils.open()
        const path = (tab === "course") ? "/getCourseList?ref=admin" : "/getChapterList?ref=admin"
        fetch(backPath + path, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include",
            // headers: {
            //     "Content-Type": "application/json",
            // },
            redirect: "follow", // manual, *follow, error
        })
            .then(res => res.json())
            .then(data => {
                LoaderUtils.close()
                if (data.status !== "success") SnackbarUtils.error(data.message)
                tab === "course" ? setCourseLists(data.list) : setChapterLists(data.list)
            })
            .catch(err => {
                LoaderUtils.close()
                SnackbarUtils.error("Something went wrong.")
            })
    }, [reload, tab])

    const deleteCourse = (index) => {
        const value = courseLists[index]
        console.log(value.buyers > 0 ? (value.active ? "turnOff" : "turnOn") : "delete")
    }

    const openCourseCreator = (isNew = true, which, id) => {
        // check if new or edit and open editor
        // if edit, fetch details from server
        // if new, open editor with empty details
        // ################################################################ Start from here tomorrow @ 10:30 AM ################################################################
        if (isNew) setOpenEditor({open: true, tab: which, details: null})
        else setOpenEditor({open: true, tab: which, details: (id > -1) ? (
            tab === "course" ? courseLists[id] : chapterLists[id]
            ) : null})
    }
    return (
        <>
            <h3 style={{ paddingLeft: 20, display: "inline-block" }}>Active Courses</h3>
            <Button variant="contained" color="primary" onClick={() => openCourseCreator(true, "course", -1)} sx={{ float: "right", margin: "20px" }}>
                <b>Course</b>
                <span className="material-icons" style={{ marginLeft: 6 }}>
                    add
                </span>
            </Button>
            <Button variant="contained" color="primary" onClick={() => openCourseCreator(true, "chapter", -1)} sx={{ float: "right", margin: "20px 0" }}>
                <b>Chapter</b>
                <span className="material-icons" style={{ marginLeft: 6 }}>
                    add
                </span>
            </Button>
            <Tabs
                style={{ minWidth: 300, maxWidth: matches ? "calc(100% - 80px)" : "100%", margin: "0 auto", width: "100%" }}
                value={tab}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="Courses and Chapters Tabs"
            >
                <Tab value="course" label="Courses" />
                <Tab value="chapter" label="Chapters" />
            </Tabs>
            <TableContainer sx={{ minWidth: 300, maxWidth: matches ? "calc(100% - 80px)" : "100%", margin: "auto" }} component={Paper}>
                <Table aria-label="Active Courses table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">{tab === "course" ? "Course" : "Chapter"} Name</TableCell>
                            <TableCell align="center">_id</TableCell>
                            <TableCell align="center">Edit / View</TableCell>
                            <TableCell align="center">Action </TableCell>
                        </TableRow>
                    </TableHead>
                    {tab === "course" ? (
                        <TableBody>
                            {courseLists.length > 0 ? (
                                courseLists.map((value, index, array) => (
                                    <TableRow key={value._id}>
                                        <TableCell>{value.name}</TableCell>
                                        <TableCell align="center">{value._id}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="View / Edit Course" arrow>
                                                <Button variant="text" color="secondary" onClick={() => {
                                                    openCourseCreator(false, "course", index)
                                                }}>
                                                    <span className="material-icons">edit</span>
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={value.buyers > 0 ? (value.active ? "Hide Course" : "Show Course") : "Delete Course"} arrow>
                                                <Button variant="text" color={value.buyers > 0 ? (value.active ? "success" : "warning") : "error"} onClick={() => deleteCourse(index)}>
                                                    <span className="material-icons">{value.buyers > 0 ? (value.active ? "visibility_off" : "visibility") : "delete"}</span>
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <h3>No Courses created .</h3>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    ) : (
                        <TableBody>
                            {chapterLists.length > 0 ? (
                                chapterLists.map((value, index, array) => (
                                    <TableRow key={value._id}>
                                        <TableCell>{value.name}</TableCell>
                                        <TableCell align="center">{value._id}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="View / Edit Chapter" arrow>
                                                <Button variant="text" color="secondary" onClick={() => {
                                                    if (!chapterLists[index].shortDesc) fetch(backPath + "/getChapter", {
                                                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                                                        mode: "cors", // no-cors, *cors, same-origin
                                                        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                                                        credentials: "include",
                                                        // headers: {
                                                        //     "Content-Type": "application/json",
                                                        // },
                                                        redirect: "follow", // manual, *follow, error
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                        body: JSON.stringify({
                                                            _id: chapterLists[index]._id,
                                                        }),
                                                    })
                                                        .then(res => res.json())
                                                        .then(result => {
                                                            if (result.status === "success") {
                                                                delete result.status
                                                                setChapterLists(ls => {
                                                                    ls[index] = result
                                                                    return ls
                                                                })
                                                                openCourseCreator(false, "chapter", index)
                                                            }
                                                            else SnackbarUtils.error(result.message)
                                                        })
                                                        .catch(err => {
                                                            console.log(err)
                                                            SnackbarUtils.error(err.message)
                                                        })
                                                    else openCourseCreator(false, "chapter", index)
                                                }}>
                                                    <span className="material-icons">edit</span>
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={value.buyers > 0 ? (value.active ? "Hide Chapter" : "Show Chapter") : "Delete Chapter"} arrow>
                                                <Button variant="text" color={value.buyers > 0 ? (value.active ? "success" : "warning") : "error"} onClick={() => deleteCourse(index)}>
                                                    <span className="material-icons">{value.buyers > 0 ? (value.active ? "visibility_off" : "visibility") : "delete"}</span>
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <h3>No Chapters created .</h3>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            {openEditor.open && openEditor.tab === "course" ? <CourseEditor chapterLists={chapterLists} setCourseLists={setCourseLists} details={openEditor} setOpenEditor={setOpenEditor} updateState={setReload} /> : null}
            {openEditor.open && openEditor.tab === "chapter" ? <ChapterEditor details={openEditor} setChapterLists={setChapterLists} setOpenEditor={setOpenEditor} updateState={setReload} /> : null}
        </>
    )
}

export default CourseManager
