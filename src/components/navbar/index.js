import AppBar from "@mui/material/AppBar"
import React from "react"
// import { Link } from "react-router-dom"
import Container from '@mui/material/Container'
import Toolbar from "@mui/material/Toolbar"
import Typography from '@mui/material/Typography'
import useMediaQuery from "@mui/material/useMediaQuery"
// import "./navbar.css"
import logo from "../../media/logo.png"
import MiniLogin from "../MiniLogin"
import Loader from "../Loader"

function NavBar(props) {
    const matches = useMediaQuery('(min-width:756px)');
    
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
                            position: "absolute",
                            left: "50%",
                            transform: "translate(-50%, 0)"
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
