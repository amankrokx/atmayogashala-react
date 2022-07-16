import AppBar from "@mui/material/AppBar"
import React, { useEffect, useRef } from "react"
// import { Link } from "react-router-dom"
import Container from '@mui/material/Container'
import Toolbar from "@mui/material/Toolbar"
import Typography from '@mui/material/Typography'
import useMediaQuery from "@mui/material/useMediaQuery"
// import "./navbar.css"
import logo from "../../media/logo.png"
import { Button } from "@mui/material"
import LoginGoogle from "../../firebase/auth/google"
import { useSnackbar } from "notistack"
import MiniLogin from "../MiniLogin"

function NavBar(props) {
    const matches = useMediaQuery('(min-width:756px)');
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    
    return (
        <AppBar position="fixed" style={{ zIndex: 5 }}>
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    style={{
                        justifyContent: "space-between",
                    }}
                >
                    <img
                        src={logo}
                        alt="Logo"
                        className="navIcon"
                        style={{
                            height: matches ? "42px" : "36px",
                            width: matches ? "42px" : "36px",
                            // margin: "0 11px",
                        }}
                    ></img>
                    <Typography
                        style={{
                            fontWeight: "bold",
                            // margin: "10px",
                            fontSize: "1.5em",
                            color: "white",
                        }}
                    >
                        {matches ? "Atmayogashala" : "AYS"}
                    </Typography>
                    <MiniLogin></MiniLogin>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar
