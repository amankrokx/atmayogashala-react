import React from "react"
import Paper from "@mui/material/Paper"
import { Button, Dialog, DialogTitle, useMediaQuery, LinearProgress, TextField, InputAdornment, Tooltip, Tab, Tabs, Stack, Divider, Typography, Box } from "@mui/material"
import SnackbarUtils from "../SnackbarUtils"
import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import backPath from "../../backPath"
import LoaderUtils from "../Loader/LoaderUtils"
import Chip from "@mui/material/Chip"
import Autocomplete from "@mui/material/Autocomplete"

const ChapterEditor = props => {
    const [close, setClose] = useState(true)
    const [videoProgress, setVideoProgress] = useState(-1)
    const [videoTab, setVideoTab] = useState(props.details && props.details.details && props.details.details.videoUrl ? "url" : "upload")
    const [req, setReq] = useState(null)
    const [videoUrl, setVideoUrl] = useState("")
    const [disableUrl, setDisableUrl] = useState(false)
    const imageRef = useRef()
    const coverImageRef = useRef()
    const [values, setValues] = useState(props.details.details ? props.details.details : {
        chapterName: "",
        chapterShortDescription: "",
        chapterDuration: "",
        chapterLongDescription: "",
        chapterSearchTags: "",
        chapterVideoUrl: "" 
    })
    const tagsRef = useRef()
    const urlRef = useRef()
    const videoRef = useRef()

    const uploadChapter = () => {
        if (req) {
            // Uploading in progress
            SnackbarUtils.warning("Wait for Video Upload to Finish.")
            return
        }
        const formData = new FormData()
        console.log(values)
        for (const value in values) {
            if (values[value]) formData.append(value, values[value])
        }
        formData.append("mode", props.details.details && props.details.details._id ? "update" : "create")
        if (imageRef.current.files.length > 0) formData.append("chapterImage", imageRef.current.files[0])
        if (coverImageRef.current.files.length > 0) formData.append("chapterCoverImage", coverImageRef.current.files[0])
        formData.append('date', new Date())
        LoaderUtils.open()
        fetch(backPath() + "/addChapter", {
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
                    props.setChapterLists(list => list.push(res.data))
                    SnackbarUtils.success(props.details.details && props.details.details._id ? "Updated !" : "Created !")
                    props.updateState(state => state + 1)
                    setTimeout(() => {
                        props.setOpenEditor({open: false, tab: null, details: null})
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

    const uploadVideo = () => {
        let data = new FormData()
        data.append("video", videoRef.current.files[0])

        let request = new XMLHttpRequest()
        request.open("POST", backPath() + "/addVideo")
        // upload progress event
        request.upload.addEventListener("progress", function (e) {
            // upload progress as percentage
            setVideoProgress(Math.round((e.loaded / e.total) * 100))
            console.log((e.loaded / e.total) * 100)
        })
        // request finished event
        request.addEventListener("load", function (e) {
            // HTTP status message (200, 404 etc)
            console.log(request.status)
            if (request.status == 200) {
                const data = JSON.parse(request.response)
                if (data.status === "success") {
                    setVideoTab("url")
                    setTimeout(() => {
                        setDisableUrl(true)
                        setValues({ ...values, chapterVideoUrl: "https://www.youtube.com/watch?v=" + data.videoId })
                        setReq(null)
                    }, 400)
                }
            }
            // request.response holds response from the server
            // console.log(request.response)
        })
        // send POST request to server
        request.send(data)
        setReq(request)
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
                    <TextField label="Chapter Name" value={values.chapterName} onChange={(event, value) => setValues({ ...values, chapterName: event.target.value })} variant="outlined" />
                    <TextField
                        label="Chapter Short Descrpition"
                        value={values.chapterShortDescription}
                        onChange={(event, value) => setValues({ ...values, chapterShortDescription: event.target.value })}
                        variant="outlined"
                    />
                    <TextField
                        label="Chapter Duration ( minutes )"
                        value={values.chapterDuration}
                        onChange={(event, value) => setValues({ ...values, chapterDuration: event.target.value })}
                        type="number"
                        variant="outlined"
                    />
                    <TextField
                        label="Chapter Long Description"
                        value={values.chapterLongDescription}
                        onChange={(event, value) => {
                            setValues({ ...values, chapterLongDescription: event.target.value })
                        }}
                        multiline
                        minRows={4}
                        maxRows={9}
                        variant="outlined"
                    />
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        // open={autoCompleteOpen}
                        // onOpen={loadList}
                        // onClose={() => setAutoCompleteOpen(false)}
                        options={[]}
                        freeSolo
                        onChange={(event, newInputValue) => {
                            setValues({ ...values, chapterSearchTags: newInputValue })
                        }}
                        renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)}
                        renderInput={params => <TextField {...params} variant="outlined" label="Search Tags" placeholder="Tags..." />}
                    />
                    <Typography variant="h6" color="initial">
                        Uploads
                    </Typography>
                    <TextField
                        label="Chapter Cover Photo"
                        inputRef={coverImageRef}
                        type="file"
                        helperText="Upload Photo for chapter Cover"
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
                    <TextField
                        label="Chapter Image"
                        type="file"
                        inputRef={imageRef}
                        helperText="Upload Photos for Study"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <span className="material-icons">image</span>
                                </InputAdornment>
                            ),
                        }}
                        //   onChange={}
                        variant="outlined"
                    />
                    <Tabs
                        value={videoTab}
                        onChange={(event, newValue) => {
                            setVideoTab(newValue)
                        }}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="Courses and Chapters Tabs"
                    >
                        <Tab value="upload" label="Upload" />
                        <Tab value="url" label="Paste URL" />
                    </Tabs>
                    <Box>
                        {videoTab === "upload" ? (
                            <>
                                <TextField
                                    label="Chapter Video"
                                    defaultValue={null}
                                    type="file"
                                    fullWidth
                                    onChange={uploadVideo}
                                    inputRef={videoRef}
                                    helperText="Upload Video for Study"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <span className="material-icons">movie</span>
                                            </InputAdornment>
                                        ),
                                    }}
                                    //   onChange={}
                                    variant="outlined"
                                />
                                {videoProgress > -1 ? (
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Box sx={{ width: "100%", mr: 1 }}>
                                            <LinearProgress variant="determinate" value={videoProgress} />
                                        </Box>
                                        <Box sx={{ minWidth: 35 }}>
                                            <Typography variant="body2" color="text.secondary">{`${videoProgress}%`}</Typography>
                                        </Box>
                                    </Box>
                                ) : null}
                            </>
                        ) : (
                            <>
                                <TextField
                                    label="Chapter Video YouTube Link"
                                    // defaultValue={null}
                                    disabled={disableUrl}
                                    type="url"
                                    value={values.chapterVideoUrl}
                                    onChange={(event, value) => {
                                        setValues({ ...values, chapterVideoUrl: event.target.value })
                                    }}
                                    inputRef={urlRef}
                                    fullWidth
                                    helperText="Video Link for Study"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <span className="material-icons">link</span>
                                            </InputAdornment>
                                        ),
                                        endAdornment: disableUrl ? (
                                            <InputAdornment position="end">
                                                <Button
                                                    variant="text"
                                                    onClick={() => {
                                                        if ("clipboard" in navigator) navigator.clipboard.writeText(videoUrl).then(() => SnackbarUtils.success("Url Copied !"))
                                                    }}
                                                    sx={{ position: "relative", right: -20 }}
                                                >
                                                    <span className="material-icons-outlined">content_copy</span>
                                                </Button>
                                            </InputAdornment>
                                        ) : null,
                                    }}
                                    //   onChange={}
                                    variant="outlined"
                                />
                            </>
                        )}
                    </Box>
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
                            if (req) req.abort()
                            setReq(null)
                            setClose(false)
                            setTimeout(() => {
                                props.setOpenEditor({ open: false, tab: null, details: null })
                            }, 300)
                        }}
                    >
                        Discard
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            uploadChapter()
                        }}
                    >
                        Create
                    </Button>
                </div>
            </Paper>
        </Dialog>
    )
}

export default ChapterEditor