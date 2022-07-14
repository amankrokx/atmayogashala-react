import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Products from "./pages/Products"
import Home from "./pages/Home"
import Button from "@mui/material/Button"
import NavBar from "./components/navbar"
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

function App() {
    const [loggedIn, setLoggedIn] = useState(true)
    return (
        <div className="App">
            <NavBar state={loggedIn} />
            <AppBar position="absolute" color="transparent" style={{boxShadow: "none"}}>
              <Toolbar>
              </Toolbar>
            </AppBar>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/prod" element={<Products setSignin={{setLoggedIn, loggedIn}}  />} />
                <Route exact path="/but" element={<Button variant="contained">But</Button>} />
            </Routes>
        </div>
    )
}

export default App
