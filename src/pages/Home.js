import React from "react"
import Button from '@mui/material/Button'
import Toolbar from "@mui/material/Toolbar"

function Home() {
    return (
        <div>
            <Toolbar></Toolbar>

            <Button variant="outlined" color="success">
                Done !
            </Button>
            <h1>Welcome to my website!</h1>
        </div>
    )
}

export default Home
