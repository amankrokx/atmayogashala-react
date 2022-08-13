import React from "react"
import Paper from "@mui/material/Paper"
import { Button, Dialog, DialogTitle, useMediaQuery, TextField, InputAdornment, Tooltip, Tab, Tabs, Stack, Divider, Typography, Box } from "@mui/material"
import SnackbarUtils from "../SnackbarUtils"
import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import backPath from "../../backPath"
import LoaderUtils from "../Loader/LoaderUtils"
import Chip from "@mui/material/Chip"
import Autocomplete from "@mui/material/Autocomplete"

const CourseEditor = props => {
    const [close, setClose] = useState(true)
    const [autoCompleteOpen, setAutoCompleteOpen] = useState(false)
    const tagsRef = useRef()
    const coverImageRef = useRef()
    const [values, setValues] = useState(
        props.details.details
            ? props.details.details
            : {
                courseName: "",
                courseShortDescription: "",
                courseLongDescription: "",
                coursePrice: "",
                courseChapters: "",
                courseSearchTags: "",
            }
    )

    const uploadCourse = () => {
        const formData = new FormData()
        for (const value in values) {
            if (values[value]) formData.append(value, values[value])
        }
        formData.append("mode", props.details.details && props.details.details._id ? "update" : "create")
        if (coverImageRef.current.files.length > 0) formData.append("chapterCoverImage", coverImageRef.current.files[0])
        formData.append("date", new Date())
        LoaderUtils.open()
        fetch(backPath() + "/addCourse", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include",
            // headers: {
            //     "Content-Type": "application/json",
            // },
            redirect: "follow", // manual, *follow, error
            body: formData, // body data type must match "Content-Type" header
        })
            .then(data => data.json())
            .then(res => {
                // is a success or not
                LoaderUtils.close()
                if (res.status === "success") {
                    props.setCourseLists(list => list.push(res.data))
                    SnackbarUtils.success(props.details.details && props.details.details._id ? "Updated !" : "Created !")
                    props.updateState(state => state + 1)
                    setTimeout(() => {
                        props.setOpenEditor({ open: false, tab: null, details: null })
                    }, 300)
                } else {
                    console.error(res)
                    SnackbarUtils.error("Error : " + res.message)
                }
            })
            .catch(err => {
                console.error(err)
                SnackbarUtils.error(err)
                LoaderUtils.close()
            })
    }

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={close}
            onClose={() => {
                SnackbarUtils.warning("Changes Discarded !")
                console.log(tagsRef.current.value)
                setClose(false)
                setTimeout(() => {
                    props.setOpenEditor({ open: false, details: null })
                }, 300)
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, minWidth: 520 }}>
                <DialogTitle>
                    <span className="material-icons-outlined">post_add</span> Chapter Editor
                </DialogTitle>
                <Stack spacing={2}>
                    <TextField label="Course Name" value={values.courseName} onChange={event => setValues({ ...values, courseName: event.target.value })} variant="outlined" />
                    <TextField
                        label="Course Short Descrpition"
                        value={values.courseShortDescription}
                        onChange={event => setValues({ ...values, courseShortDescription: event.target.value })}
                        variant="outlined"
                    />
                    <TextField
                        label="Course Price ( Rupees )"
                        value={values.coursePrice}
                        onChange={event => setValues({ ...values, coursePrice: event.target.value })}
                        type="number"
                        variant="outlined"
                    />
                    <TextField
                        label="Course Long Description"
                        value={values.courseLongDescription}
                        onChange={event => setValues({ ...values, courseLongDescription: event.target.value })}
                        multiline
                        minRows={4}
                        maxRows={9}
                        variant="outlined"
                    />
                    <Autocomplete
                        multiple
                        open={autoCompleteOpen}
                        onOpen={() => setAutoCompleteOpen(true)}
                        onClose={() => setAutoCompleteOpen(false)}
                        options={props.chapterLists.map(option => option.name)}
                        // value={values.courseChapters}
                        onChange={(event, newInputValue) => setValues({ ...values, courseChapters: newInputValue })}
                        // freeSolo
                        renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)}
                        renderInput={params => <TextField {...params} variant="outlined" label="Include Chapters" placeholder="Chapter List" />}
                    />
                    <Autocomplete
                        multiple
                        // open={autoCompleteOpen}
                        // onOpen={loadList}
                        // onClose={() => setAutoCompleteOpen(false)}
                        options={[]}
                        freeSolo
                        onChange={(event, newInputValue) => setValues({ ...values, courseSearchTags: newInputValue })}
                        renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)}
                        renderInput={params => <TextField {...params} inputRef={tagsRef} variant="outlined" label="Search Tags" placeholder="Tags..." />}
                    />
                    <Typography variant="h6" color="initial">
                        Uploads
                    </Typography>
                    <TextField
                        label="Chapter Cover Photo"
                        defaultValue={null}
                        type="file"
                        helperText="Upload Photo for chapter Cover"
                        inputRef={coverImageRef}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <span className="material-icons">panorama</span>
                                </InputAdornment>
                            ),
                        }}
                        //   onChange={}
                        variant="outlined"
                    />
                </Stack>
                <br></br>
                <br></br>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button
                        variant="text"
                        color="error"
                        onClick={() => {
                            SnackbarUtils.warning("Changes Discarded !")
                            setClose(false)
                            setTimeout(() => {
                                props.setOpenEditor({ open: false, tab: null, details: null })
                            }, 300)
                        }}
                    >
                        Discard
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => {
                        console.log(values, coverImageRef.current.files)
                        uploadCourse()
                    }}>
                        Create
                    </Button>
                </div>
            </Paper>
        </Dialog>
    )
}

export default CourseEditor
