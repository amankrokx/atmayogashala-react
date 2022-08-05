import React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Button, Dialog, DialogTitle, useMediaQuery, TextField, Tooltip } from "@mui/material"
import SnackbarUtils from "../SnackbarUtils"
import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import backPath from "../../backPath"
import LoaderUtils from "../Loader/LoaderUtils"

const CourseEditor = (props) => {
    const [close, setClose] = useState(true)

    return (
        <Dialog open={close} onClose={() => {
            SnackbarUtils.warning("Changes Discarded !")
            setClose(false)
            setTimeout(() => {
                props.setOpenEditor({open: false, details: null})
            }, 300)
            }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <DialogTitle>Course Editor</DialogTitle>
            </Paper>
        </Dialog>
    )

}

const CourseManager = () => {
    const matches = useMediaQuery("(min-width:756px)")
    const [courseLists, setCourseLists] = useState([])
    const [openEditor, setOpenEditor] = useState({open : true, details: null})
    const [reload, setReload] = useState(0)

    useEffect(() => {
        console.log('fetching course lists')
        LoaderUtils.open()
        fetch(backPath() + "/getCourseList").then(res => res.json())
            .then(data => {
                LoaderUtils.close()
                if (data.status !== "success") SnackbarUtils.error(data.message)
                setCourseLists(data.list)
            })
            .catch(err => {
                LoaderUtils.close()
                SnackbarUtils.error("Something went wrong.")
            })
    }, [reload])

    const deleteCourse = (index) => {
        const value = courseLists[index]
        console.log(value.buyers > 0 ? (value.active ? "turnOff" : "turnOn") : "delete")
    }

    const openCourseCreator = (isNew = true, id) => {
        if (isNew) setOpenEditor({open: true, details: null})
        else setOpenEditor({open: true, details: (id > -1) ? courseLists[id] : null})
    }
    return (
        <>
            <h3 style={{ paddingLeft: 20, display: "inline-block" }}>Active Courses</h3>
            <Button variant="contained" color="primary" onClick={() => openCourseCreator(true, -1)} sx={{ float: "right", margin: "20px" }}>
                <b>Create</b>
                <span className="material-icons" style={{ marginLeft: 6 }}>
                    add
                </span>
            </Button>
            <TableContainer sx={{ minWidth: 300, maxWidth: matches ? "calc(100% - 80px)" : "100%", margin: "auto" }} component={Paper}>
                <Table aria-label="Active Courses table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Course Name</TableCell>
                            <TableCell align="center">_id</TableCell>
                            <TableCell align="center">Edit / View</TableCell>
                            <TableCell align="center">Action </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courseLists.length > 0 ? (
                            courseLists.map((value, index, array) => (
                                <TableRow key={value._id}>
                                    <TableCell>{value.name}</TableCell>
                                    <TableCell align="center">{value._id}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="View / Edit Course" arrow>
                                            <Button variant="text" color="secondary">
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
                </Table>
            </TableContainer>
            {openEditor.open ? <CourseEditor details={openEditor} setOpenEditor={setOpenEditor} updateState={setReload} /> : null}
        </>
    )
}

export default CourseManager
