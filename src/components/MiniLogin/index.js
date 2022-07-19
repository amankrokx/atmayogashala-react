import  Container from "@mui/material/Container"
import { EmailAuthProvider, GoogleAuthProvider, onAuthStateChanged, PhoneAuthProvider, getAuth } from "firebase/auth"
import React, { useEffect, useState } from "react"
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

// import FirebaseAuth from "react-firebaseui/FirebaseAuth"

// Configure FirebaseUI.
// const uiConfig = {
//     // Popup signin flow rather than redirect flow.
//     signInFlow: "popup",
//     // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//     signInSuccessUrl: "/",
//     // We will display Google and Facebook as auth providers.
//     signInOptions: [
//         GoogleAuthProvider.PROVIDER_ID,
//         {
//             provider: PhoneAuthProvider.PROVIDER_ID,
//             recaptchaParameters: {
//                 type: 'image', // 'audio'
//                 size: 'invisible', // 'invisible' or 'compact'
//                 badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
//             },
//             defaultCountry: 'IN', // Set default country to the United Kingdom (+44).
//             loginHint: '+91 9876543210'
//         },
//         {
//             provider: EmailAuthProvider.PROVIDER_ID,
//             requireDisplayName: true,
//             signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
//         },
//     ],
//     privacyPolicyUrl: "./privacy-policy.html",
//     tosUrl: "./privacy-policy.html",
//     autoUpgradeAnonymousUsers: true,
// }

function MiniLogin (props) {
    const [logged, setLogged] = useState(false)
    const [noNotifs, setNotifs] = useState(0)
    const matches = useMediaQuery("(min-width:756px)")

    const [anchorEl, setAnchorEl] = React.useState(true)
    const open = Boolean(anchorEl)
    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setLogged(true)
                SnackbarUtils.success("Logged In .")
            } else {
                setLogged(false)
                SnackbarUtils.toast("Please Sign In .")
            }
        })
    }, [])
    if (logged) {
        return (
            <Container
                style={{
                    float: "right",
                    width: "auto",
                    margin: "-20px",
                }}
            >
                <IconButton aria-label="Notifications" color="white" onClick={() => {
                        SnackbarUtils.info("Notifications Clicked .")
                        setNotifs(noNotifs + 1)
                    }}>
                    <Badge badgeContent={noNotifs} color="error">
                        <span
                            className="material-icons"
                            color="white"
                        >
                            notifications
                        </span>
                    </Badge>
                </IconButton>
                <AccountMenu></AccountMenu>
            </Container>
        )
    } else {
        return (
            <>
                <Button
                    onClick={handleClick}
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
                    onClose={handleClose}
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
                    {/* <FirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={auth}
                        style={{
                            left: 0,
                            width: "calc(100% - 20px)",
                        }}
                    ></FirebaseAuth> */}
                </Menu>
            </>
        )
    }
}

export default MiniLogin