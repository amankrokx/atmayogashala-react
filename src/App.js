import React, { useState, useRef, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Products from "./pages/Products"
import AdminDashboard from "./pages/AdminDashboard"
import Home from "./pages/Home"
import Button from "@mui/material/Button"
import NavBar from "./components/navbar"
import Toolbar from '@mui/material/Toolbar'
import IconButton from "@mui/material/IconButton"
import { useTheme } from "@mui/material/styles"
import { SnackbarProvider, useSnackbar } from "notistack"
import Snack from "./components/Snack"
import Loader from "./components/Loader"
import Footer from "./components/Footer/index.js"
import Course from "./pages/Course"
import Checkout from "./pages/Checkout"
import AuthContext from "./firebase/auth/AuthContext"
import LoaderUtils from "./components/Loader/LoaderUtils"
import SnackbarUtils from "./components/SnackbarUtils"
import { onAuthStateChanged } from "firebase/auth"
import auth from "./firebase/auth"
import verifyCred from "./components/MiniLogin/verifyCred"

function App() {
    const [loggedIn, setLoggedIn] = useState(true)
    const notistackRef = useRef()
    const theme = useTheme()
    const [user, setUser] = useState(null)
    const [access, setAccess] = useState(null)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        LoaderUtils.halt()
        onAuthStateChanged(auth, async user => {
            if (user) {
                LoaderUtils.unhalt()
                setUser(user)
                // if (access === "facilitator" && user.emailVerified === false) {
                //     SnackbarUtils.warning("Please verify your email address!")
                //     setEmailVerify({
                //         ready: true,
                //         verified: true,
                //     })
                // } else
                //     setEmailVerify({
                //         ready: true,
                //         verified: false,
                //     })
                verifyCred(user)
                    .then(a => {
                        setUserData(a)
                        console.log(a)
                        setAccess(a)
                        SnackbarUtils.info("Welcome " + access + "!")
                    })
                    .catch(err => SnackbarUtils.error(err))
                SnackbarUtils.success("Logged In .")
            } else {
                LoaderUtils.unhalt()
                // SnackbarUtils.info("Please Login to continue.")
                setUser(null)
                setAccess("user")
            }
        })
    }, [])

    const authSyncSettings = {
        auth: auth,
        user: user,
        access: access,
        userData: userData,
        setUser: setUser,
        setAccess: setAccess,
    }
    
    return (
        <AuthContext.Provider value={authSyncSettings}>
            <SnackbarProvider
                dense
                preventDuplicate
                maxSnack={3}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                ref={notistackRef}
                action={key => (
                    <IconButton aria-label="Close" onClick={() => notistackRef.current.closeSnackbar(key)}>
                        <span className="material-icons" style={{ color: theme.palette.white.main }}>
                            close
                        </span>
                    </IconButton>
                )}
            >
                <div className="App">
                    <Snack></Snack>
                    <Loader></Loader>
                    <NavBar state={loggedIn} />
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/admin_dashboard/*" element={<AdminDashboard />} />
                        <Route exact path="/prod" element={<Products setSignin={{ setLoggedIn, loggedIn }} />} />
                        <Route exact path="/but" element={<Button variant="contained">But</Button>} />
                        <Route exact path="/course/*" element={<Course/>} />
                        <Route exact path="/checkout/*" element={<Checkout/>} />
                    </Routes>
                    <Footer />
                </div>
            </SnackbarProvider>
        </AuthContext.Provider>
    )
}

export default App
