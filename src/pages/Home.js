import React from "react"
import Button from '@mui/material/Button'
import Toolbar from "@mui/material/Toolbar"
import LoaderUtils from "../components/Loader/LoaderUtils"
import Card from "../components/Card"
import pp from "../media/product4.jpg"

function Home() {
    return (
        <div>
            <Toolbar></Toolbar>

            <Button variant="outlined" color="success" onClick={() => LoaderUtils.toggle()}>
                Done !
            </Button>
            <h1>Welcome to my website!</h1>
            <Card info={{
                photo: pp,
                title: "Fit Yogi",
                description: "Something as description about the course to be included here fro the card .",
                rating: 3.5,
                price: 1999,
                author: {
                    name: 'Aman',
                }
            }}></Card>
        </div>
    )
}

export default Home
