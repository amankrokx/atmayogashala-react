import AppBar from "@mui/material/AppBar"
import React from "react"
// import { Link } from "react-router-dom"
import Container from '@mui/material/Container'
import Toolbar from "@mui/material/Toolbar"
import logo from "../media/logo.png"
import Typography from '@mui/material/Typography'

const styles = {
    img: {
        height: "42px",
        width: "42px"
    },
    heading: {
        marginLeft: "20px"
    }
}

function NavBar() {
    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={logo} alt="Logo" style={styles.img}></img>
                    <Typography sx={{}}>AtmaYogaShala</Typography>
                    <Typography
                        variant="h5"
                        color="initial"
                        style={styles.heading}
                    >
                        AtmaYogaShala
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar
