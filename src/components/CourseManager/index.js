import React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
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

const CourseEditor = (props) => {
    const [close, setClose] = useState(true)
    const [autoCompleteOpen, setAutoCompleteOpen] = useState(false)
    const [chapterList, setChapterList] = useState([{ title: "The Shawshank Redemption", year: 1994 }])
    const [loaded, setLoaded] = useState(false)

    const loadList = () => {
        if (loaded) setAutoCompleteOpen(true)
        else setTimeout(() => {
            setChapterList(top100Films)
            setAutoCompleteOpen(true)
            setLoaded(true)
        }, 3000)
    }


    return (
        <Dialog
            open={close}
            onClose={() => {
                SnackbarUtils.warning("Changes Discarded !")
                setClose(false)
                setTimeout(() => {
                    props.setOpenEditor({ open: false, details: null })
                }, 300)
            }}
        >
            <Paper elevation={3} sx={{ padding: 3 }}>
                <DialogTitle>Course Editor</DialogTitle>
                <Autocomplete
                    multiple
                    id="tags-filled"
                    open={autoCompleteOpen}
                    onOpen={loadList}
                    onClose={() => setAutoCompleteOpen(false)}
                    options={chapterList.map(option => option.title)}
                    freeSolo
                    renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)}
                    renderInput={params => <TextField {...params} variant="filled" label="freeSolo" placeholder="Favorites" />}
                />
            </Paper>
        </Dialog>
    )

}

const ChapterEditor = (props) => {
    const [close, setClose] = useState(true)
    const [videoProgress, setVideoProgress] = useState(0)    
    const tagsRef = useRef()
    const videoRef = useRef()
    const uploadVideo = () => {
        let data = new FormData()
        data.append("video", videoRef.current.files[0])

        let request = new XMLHttpRequest()
        request.open("POST", backPath() + "/addVideo")
        // upload progress event
        request.upload.addEventListener("progress", function (e) {
            // upload progress as percentage
            setVideoProgress(Math.floor((e.loaded / e.total) * 100))
            console.log((e.loaded / e.total) * 100)
        })
        // request finished event
        request.addEventListener("load", function (e) {
            // HTTP status message (200, 404 etc)
            console.log(request.status)
            // request.response holds response from the server
            console.log(request.response)
        })
        // send POST request to server
        request.send(data)
    }

    return (
        <Dialog
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
                <DialogTitle>Chapter Editor</DialogTitle>
                <Stack spacing={2}>
                    <TextField
                        label="Chapter Name"
                        defaultValue={null}
                        //   onChange={}
                        variant="outlined"
                    />
                    <TextField
                        label="Chapter Short Descrpition"
                        defaultValue={null}
                        //   onChange={}
                        variant="outlined"
                    />
                    <TextField
                        label="Chapter Duration ( minutes )"
                        defaultValue={null}
                        type="number"
                        //   onChange={}
                        variant="outlined"
                    />
                    <TextField
                        label="Chapter Long Description"
                        defaultValue={null}
                        multiline
                        minRows={4}
                        maxRows={9}
                        //   onChange={}
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
                    <TextField
                        label="Chapter Image"
                        defaultValue={null}
                        type="file"
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
                    <TextField
                        label="Chapter Video"
                        defaultValue={null}
                        type="file"
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
                </Stack>
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

const CourseManager = () => {
    const matches = useMediaQuery("(min-width:756px)")
    const [courseLists, setCourseLists] = useState([])
    const [chapterLists, setChapterLists] = useState([])
    const [openEditor, setOpenEditor] = useState({open : true, tab: "course", details: null})
    const [reload, setReload] = useState(0)
    const [tab, setTab] = React.useState("course")

    const handleChange = (event, newValue) => {
        setTab(newValue)
    }

    useEffect(() => {
        console.log(`fetching ${tab} lists`)
        LoaderUtils.open()
        const path = (tab === "course") ? "/getCourseList" : "/getChapterList"
        fetch(backPath() + path)
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
        if (isNew) setOpenEditor({open: true, tab: which, details: null})
        else setOpenEditor({open: true, tab: which, details: (id > -1) ? courseLists[id] : null})
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
                    ) : (
                        <TableBody>
                            {chapterLists.length > 0 ? (
                                chapterLists.map((value, index, array) => (
                                    <TableRow key={value._id}>
                                        <TableCell>{value.name}</TableCell>
                                        <TableCell align="center">{value._id}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="View / Edit Chapter" arrow>
                                                <Button variant="text" color="secondary">
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
            {(openEditor.open && openEditor.tab === "course") ? <CourseEditor details={openEditor} setOpenEditor={setOpenEditor} updateState={setReload} /> : null}
            {(openEditor.open && openEditor.tab === "chapter") ? <ChapterEditor details={openEditor} setOpenEditor={setOpenEditor} updateState={setReload} /> : null}
        </>
    )
}
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  {
    title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  {
    title: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  {
    title: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];
export default CourseManager
