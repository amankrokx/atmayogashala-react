import React, { useState, useRef, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Products from "./pages/Products"
import Home from "./pages/Home"
import Button from "@mui/material/Button"
import NavBar from "./components/navbar"
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from "@mui/material/IconButton"
import { useTheme } from "@mui/styles"
import { SnackbarProvider, useSnackbar } from "notistack"
import Snack from "./components/Snack"
import Loader from "./components/Loader"
import Footer from "./components/Footer"


function App() {
    const [loggedIn, setLoggedIn] = useState(true)
    const notistackRef = useRef()
    const theme = useTheme()

    
    return (
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
                <Snack>
                    <Loader></Loader>
                    <AppBar position="absolute" color="transparent" style={{ boxShadow: "none" }}>
                        <NavBar state={loggedIn} />
                    </AppBar>
                    <Toolbar></Toolbar>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/prod" element={<Products setSignin={{ setLoggedIn, loggedIn }} />} />
                        <Route exact path="/but" element={<Button variant="contained">But</Button>} />
                    </Routes>
                    <Footer />
                </Snack>
            </div>
        </SnackbarProvider>
    )
}

export default App
