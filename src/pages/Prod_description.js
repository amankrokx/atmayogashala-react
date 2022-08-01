import React from "react"
import Button from '@mui/material/Button'
import Toolbar from "@mui/material/Toolbar"
import LoaderUtils from "../components/Loader/LoaderUtils"
import Card from "../components/Description"
import pp from "../media/product4.jpg"
import { ratingClasses } from "@mui/material"

function Prod_description() {
    return (
        <div>
            <Toolbar></Toolbar>

            {/* <Button variant="outlined" color="success" onClick={() => LoaderUtils.toggle()}>
                Done !
            </Button> */}
            {/* <h1>Welcome to my website!</h1> */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-around'
            }}>
            <Card info={{
                photo: pp,
                title: "Fit Yogi",
                date: "23/23/2023",
                description1: "Something as description about the course to be included here for the card .",
                description2: "Technical points",
                description3: "Yoga points",
                tagline: "This is a space to put on a tagline for the course",
                rating: 4.5,
                price: 1999,
                author: {
                    name : 'Infinite_n00b',
                }
            }}></Card>
            {/* <Card></Card> */}
            </div>
        </div>
    )
}

export default Prod_description
