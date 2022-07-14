import AppBar from "@mui/material/AppBar"
import React from "react"
// import { Link } from "react-router-dom"
import Container from '@mui/material/Container'
import Toolbar from "@mui/material/Toolbar"
import Typography from '@mui/material/Typography'
import useMediaQuery from "@mui/material/useMediaQuery"
// import "./navbar.css"
import logo from "../../media/logo.png"
import { Button } from "@mui/material"

function NavBar(props) {
    const matches = useMediaQuery('(min-width:756px)');
    // console.log(props)
    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters style={{
                    justifyContent: "space-between"
                }}>
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
                            color: "white"
                        }}
                    >
                        {matches ? "Atmayogashala" : "AYS"}
                    </Typography>
                    {
                        props.state ? <Button variant="text" color="white" style={{
                            float: "right",
                            fontWeight: "bold"
                        }}>Login</Button> 
                        :
                        <Button variant="outlined" color="white">LogOut</Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar
