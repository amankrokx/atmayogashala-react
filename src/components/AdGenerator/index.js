import React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Button, Dialog, DialogTitle, useMediaQuery, TextField } from "@mui/material"
import SnackbarUtils from "../SnackbarUtils"
import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import backPath from "../../backPath"

const AdForm = (props) => {
    const [close, setClose] = useState(true)
    let {name = "", title = "", body = "", _id = null} = props.details || {}
    const [values, setValues] = useState({
        name, title, body, _id
    })
    const nameRef = useRef()
    const titleRef = useRef()
    const bodyRef = useRef()
    const submit = () => {
        fetch(backPath() + '/addAd', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            body: JSON.stringify({
                mode: _id ? 'update' : 'create',
                data: {
                    values,
                    date: new Date()
                }
            }) // body data type must match "Content-Type" header
        }).then(data => data.text()).then(res => {
            // is a success or not
            if (res === "success") {
                SnackbarUtils.success(_id ? "Updated !" : "Created !")
                props.updateState(state => state + 1)
            } else {
                SnackbarUtils.error("Error : " + res)
            }
        }).catch((err) => {
            console.error(err)
            SnackbarUtils.error(err)
        });

        setClose(false)
        setTimeout(() => {
            props.setOpenMaker({open: false, details: null})
        }, 300)
    }
    
    const handleInput = () => {
        setValues({
            name: nameRef.current.value,
            title: titleRef.current.value,
            body: bodyRef.current.value,
            _id: values._id
        })
    }

    return (
        <Dialog open={close} onClose={() => {
            SnackbarUtils.warning("Changes Discarded !")
            setClose(false)
            setTimeout(() => {
                props.setOpenMaker({ open: false, details: null })
            }, 300)
            }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <DialogTitle>Advertisement Info</DialogTitle>
                <TextField
                    sx={{ margin: 1 }}
                    label="AdName"
                    //   onChange={}
                    variant="outlined"
                    onChange={handleInput}
                    value={values.name}
                    inputRef={nameRef}
                    />
                <TextField
                    sx={{ margin: 1 }}
                    label="Title"
                    onChange={handleInput}
                    value={values.title}
                    //   onChange={}
                    variant="outlined"
                    inputRef={titleRef}
                    />
                <TextField
                    sx={{ margin: 1 }}
                    label="Body"
                    onChange={handleInput}
                    //   onChange={}
                    value={values.body}
                    variant="outlined"
                    inputRef={bodyRef}
                />
                <TextField
                    sx={{ margin: 1 }}
                    //   value={"for free COurse"}
                    //   onChange={}
                    variant="outlined"
                    label="Background Image"
                    type="file"
                />
                <br></br>
                <br></br>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button variant="text" color="error" onClick={() => {
                        SnackbarUtils.warning("Changes Discarded !")
                        setClose(false)
                        setTimeout(() => {
                            props.setOpenMaker({ open: false, details: null })
                        }, 300)
                    }}>
                        Discard
                    </Button>
                    <Button variant="contained" color="primary" onClick={submit}>
                        Create
                    </Button>
                </div>
            </Paper>
        </Dialog>
    )
}

const AdGenerator = () => {
    const matches = useMediaQuery("(min-width:756px)")
    const [adLists, setAdLists] = useState([])
    const [openMaker, setOpenMaker] = useState({open: false, details: null})
    const [reload, setReload] = useState(0)
    useEffect(() => {
        fetch(backPath() + "/getAds")
            .then(data => data.json())
            .then(res => {
                setAdLists(res)
            })
    }, [reload])

    const makeAd = (isNew = true, id = -1) => {
        // console.log(isNew)
        setOpenMaker({open: true, details: (id > -1) ? adLists[id] : null})
    }

    const deleteAd = (id) => {
        fetch(backPath() + "/addAd", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            body: JSON.stringify({
                mode: "delete",
                data: {
                    values: { _id: id },
                },
            }), // body data type must match "Content-Type" header
        })
            .then(data => data.text())
            .then(res => {
                // is a success or not
                if (res === "success") {
                    SnackbarUtils.success("Deleted Ad.")
                    setReload(state => state + 1)
                } else {
                    SnackbarUtils.error("Error : " + res)
                }
            })
            .catch(err => {
                console.error(err)
                SnackbarUtils.error(err)
            })
    }

    return (
        <>
            <h3 style={{ paddingLeft: 20, display: "inline-block" }}>Active ADs</h3>
            <Button variant="contained" color="primary" onClick={() => makeAd(true, -1)} sx={{ float: "right", margin: "20px" }}>
                <b>Create</b>
                <span className="material-icons" style={{ marginLeft: 6 }}>
                    add
                </span>
            </Button>
            <TableContainer sx={{ minWidth: 300, maxWidth: matches ? "calc(100% - 80px)" : "100%", margin: "auto" }} component={Paper}>
                <Table aria-label="Active Advertisements table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">AD Name</TableCell>
                            <TableCell align="center">Created on</TableCell>
                            <TableCell align="center">Edit / View</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {adLists.map((value, index, array) => (
                            <TableRow key={value._id}>
                                <TableCell>{value.name}</TableCell>
                                <TableCell align="center">{new Date(value.date).toDateString()}</TableCell>
                                <TableCell align="center">
                                    <Button variant="text" color="secondary">
                                        <span className="material-icons">edit</span>
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant="text" color="error" onClick={() => deleteAd(value._id)}>
                                        <span className="material-icons">delete</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {adLists.length < 1 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <h3>No ADs created .</h3>
                                </TableCell>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
            </TableContainer>
            { openMaker.open ? <AdForm details={openMaker.details} setOpenMaker={setOpenMaker} updateState={setReload}></AdForm> : null}
        </>
    )
}

export default AdGenerator