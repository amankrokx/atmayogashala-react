import React from "react"
import { Breadcrumbs, Button, Dialog, DialogTitle, Menu, MenuItem, useMediaQuery, TextField } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Link, Route, Routes } from 'react-router-dom'
import AdGenerator from "../components/AdGenerator"
import CourseManager from "../components/CourseManager"

const AdminDashboard = () => {
    const [anchorEl, setAnchorEl] = React.useState(null)
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
                            to="/"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            Home
                        </Link>
                        <Link
                            to="/admin_dashboard"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to=""
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            {
                                window.location.toString().split("/")[4]
                            }
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
                        <Link
                            to="ads"
                            style={{
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            <MenuItem onClick={handleClose}>Ads</MenuItem>
                        </Link>
                        <Link
                            to="courses"
                            style={{
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            <MenuItem onClick={handleClose}>Courses</MenuItem>
                        </Link>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route exact path="ads" element={<AdGenerator />} />
                <Route exact path="courses" element={<CourseManager />} />
                <Route
                    exact
                    path="/"
                    element={
                        <center>
                            <h1>Welcome to Admin Dashboard.</h1>
                        </center>
                    }
                />
            </Routes>
        </>
    )
}

export default AdminDashboard