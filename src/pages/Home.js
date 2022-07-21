import React from "react"
import Button from '@mui/material/Button'
import Toolbar from "@mui/material/Toolbar"
import LoaderUtils from "../components/Loader/LoaderUtils"


function Home() {
    return (
        <div>
            <Toolbar></Toolbar>

            <Button variant="outlined" color="success" onClick={() => LoaderUtils.toggle()}>
                Done !
            </Button>
            <h1>Welcome to my website!</h1>
        </div>
    )
}

export default Home
