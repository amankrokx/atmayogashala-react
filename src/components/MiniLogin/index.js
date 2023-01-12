import  Container from "@mui/material/Container"
import { onAuthStateChanged } from "firebase/auth"
import React, { useContext, useEffect, useState } from "react"
// import LoginGoogle from "../../firebase/auth/google"
import SnackbarUtils from "../SnackbarUtils"
import Button from '@mui/material/Button'
import auth from "../../firebase/auth"
import IconButton from '@mui/material/IconButton'
import Badge from "@mui/material/Badge"
import Menu from "@mui/material/Menu"
import AccountMenu from "./AccountMenu"
import Typography from '@mui/material/Typography'
import LoginWindow from "./LoginWindow"
import useMediaQuery from "@mui/material/useMediaQuery"
import verifyCred from "./verifyCred"
import LoaderUtils from "../Loader/LoaderUtils"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import { useTheme } from "@mui/system"
import PropTypes from "prop-types"
import LinearProgress from "@mui/material/LinearProgress"
import Box from "@mui/material/Box"
import "./index.css"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../firebase/auth/AuthContext"

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    )
}
LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
}

function MiniLogin (props) {
    const matches = useMediaQuery("(min-width:756px)")
    const [anchorEl, setAnchorEl] = React.useState(null)
    const theme = useTheme()
    const authcontext = useContext(AuthContext)
    const navigate = useNavigate()
    const [drawer, setDrawer] = useState(false)
    const open = Boolean(anchorEl)

    if (authcontext.user) {
        return (
            <>
                <Container
                    style={{
                        float: "right",
                        width: "auto",
                        margin: "-20px",
                    }}
                >
                    <IconButton
                        aria-label="Notifications"
                        color="white"
                        onClick={() => {
                            // Display course glossary
                            // SnackbarUtils.info("Notifications Clicked .")
                            // setNotifs(noNotifs + 1)
                            setDrawer(d => true)
                        }}
                    >
                        <span className="material-icons" color="white">
                            video_library
                        </span>
                    </IconButton>
                    <AccountMenu></AccountMenu>
                </Container>
                <SwipeableDrawer anchor="right" open={drawer} onClose={() => setDrawer(false)} onOpen={() => {}}>
                    <div style={{ width: 280, padding: 16 }}>
                        <Typography variant="h4" color="initial">
                            My Courses
                        </Typography>
                        {authcontext.userData &&
                            authcontext.userData.courses &&
                            authcontext.userData.courses.map((course, index, arr) => (
                                <div
                                    key={index}
                                    className="course"
                                    style={{
                                        padding: "8px 8px 12px 12px",
                                        margin: 8,
                                        border: "1px solid " + theme.palette.grey.A700,
                                        borderRadius: 4,
                                        userSelect: "none",
                                    }}
                                    onClick={() => {
                                        navigate("/course/" + course.courseId)
                                        setDrawer(false)
                                    }}
                                >
                                    <Typography variant="caption" color="initial">
                                        {course.courseId}
                                    </Typography>
                                    <IconButton>
                                        <span className="material-icons">play_arrow</span>
                                    </IconButton>
                                    <LinearProgressWithLabel style={{ display: "block", width: "100%" }} variant="determinate" value={course.progress} />
                                </div>
                            ))}
                    </div>
                </SwipeableDrawer>
            </>
        )
    } else {
        return (
            <>
                <Button
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="text"
                    color="white"
                    style={{
                        fontWeight: "bold",
                    }}
                >
                    Login
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    // onClick={false}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            right: 10,
                            minWidth: 300,
                            margin: "0  ",
                            // background: "linear-gradient(45deg, #ffffff 83%, #4caf50 78%)",
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 30,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                            left: 0,
                        },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <Typography
                        variant="h4"
                        color="primary"
                        style={{
                            paddingLeft: matches ? "calc((100% - 756px)/2)" : 40,
                            paddingTop: 15,
                        }}
                    >
                        Get Started
                    </Typography>
                    <LoginWindow />
                </Menu>
                <div
                    id="recaptcha-container"
                    style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                    }}
                ></div>
            </>
        )
    }
}

export default MiniLogin