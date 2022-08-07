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
                    <TextField
                        label="Course Name"
                        defaultValue={null}
                        //   onChange={}
                        variant="outlined"
                    />
                    <TextField
                        label="Course Short Descrpition"
                        defaultValue={null}
                        //   onChange={}
                        variant="outlined"
                    />
                    <TextField
                        label="Course Price ( Rupees )"
                        defaultValue={null}
                        type="number"
                        //   onChange={}
                        variant="outlined"
                    />
                    <TextField
                        label="Course Long Description"
                        defaultValue={null}
                        multiline
                        minRows={4}
                        maxRows={9}
                        //   onChange={}
                        variant="outlined"
                    />
                    <Autocomplete
                        multiple
                        open={autoCompleteOpen}
                        onOpen={() => setAutoCompleteOpen(true)}
                        onClose={() => setAutoCompleteOpen(false)}
                        options={props.chapterLists.map(option => option.name)}
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
                        onChange={(event, newInputValue) => {
                            console.log(newInputValue)
                        }}
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
                    <Button variant="contained" color="primary">
                        Create
                    </Button>
                </div>
            </Paper>
        </Dialog>
    )
}

export default CourseEditor
