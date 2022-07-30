import React from "react"
import { Breadcrumbs, Button, Dialog, DialogTitle, Menu, MenuItem, useMediaQuery, TextField } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

const AdminDashboard = () => {
    const matches = useMediaQuery("(min-width:756px)")
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [close, setClose] = React.useState(true)
    const open = Boolean(anchorEl)
    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <AppBar position="static" color="secondary">
                <Toolbar
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Breadcrumbs separator=">" color="white" aria-label="BreadCrumbs">
                        <Link
                            to="home"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            Home
                        </Link>
                        <Link
                            to="home"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="home"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            ADs
                        </Link>
                    </Breadcrumbs>
                    <Button color="white" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
                        <span className="material-icons">apps</span>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <h3 style={{ paddingLeft: 20 }}>Active ADs</h3>
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
                        <TableRow>
                            <TableCell>1 Minute 10 breaths</TableCell>
                            <TableCell align="center">{new Date().toDateString()}</TableCell>
                            <TableCell align="center">
                                <Button variant="text" color="secondary">
                                    <span className="material-icons">edit</span>
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button variant="text" color="error">
                                    <span className="material-icons">delete</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>1 Minute 10 breaths</TableCell>
                            <TableCell align="center">{new Date().toDateString()}</TableCell>
                            <TableCell align="center">
                                <Button variant="text" color="secondary">
                                    <span className="material-icons">edit</span>
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button variant="text" color="error">
                                    <span className="material-icons">delete</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>1 Minute 10 breaths</TableCell>
                            <TableCell align="center">{new Date().toDateString()}</TableCell>
                            <TableCell align="center">
                                <Button variant="text" color="secondary">
                                    <span className="material-icons">edit</span>
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button variant="text" color="error">
                                    <span className="material-icons">delete</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>1 Minute 10 breaths</TableCell>
                            <TableCell align="center">{new Date().toDateString()}</TableCell>
                            <TableCell align="center">
                                <Button variant="text" color="secondary">
                                    <span className="material-icons">edit</span>
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button variant="text" color="error">
                                    <span className="material-icons">delete</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={close} onClose={() => setClose(false)}>
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <DialogTitle>Advertisement Info</DialogTitle>
                    <TextField
                        sx={{ margin: 1 }}
                        label="AdName"
                        value={"1 Minute 10 breaths"}
                        //   onChange={}
                        variant="outlined"
                    />
                    <TextField
                        sx={{ margin: 1 }}
                        label="Title"
                        value={"Enroll Now !"}
                        //   onChange={}
                        variant="outlined"
                    />
                    <TextField
                        sx={{ margin: 1 }}
                        label="Body"
                        value={"for free Course"}
                        //   onChange={}
                        variant="outlined"
                    />
                    <TextField
                        sx={{ margin: 1 }}
                        //   value={"for free COurse"}
                        //   onChange={}
                        variant="outlined"
                        label="Background Image"
                        type="file"
                    />
                    <br ></br>
                    <br ></br>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <Button variant="text" color="error">
                        Discard
                        </Button>
                        <Button variant="contained" color="primary">
                        Create
                        </Button>
                    </div>
                </Paper>
            </Dialog>
        </>
    )
}

export default AdminDashboard