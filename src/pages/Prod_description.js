import React from "react"
import Button from '@mui/material/Button'
import Toolbar from "@mui/material/Toolbar"
import Typography from '@mui/material/Typography';
import LoaderUtils from "../components/Loader/LoaderUtils"
import Card from "../components/Description"
import Course_card from "../components/Card"
import pp from "../media/product4.jpg"
import { ratingClasses } from "@mui/material"

function Prod_description() {
    return (
        <div>
            <Toolbar></Toolbar>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around'
            }}>
            <Card info={{
                photo: pp,
                title: "Fit Yogi",
                date: "23/23/2023",
                description1: "Something as description about the course to be included here for the card . Buy this course and improve your body and mind in terns of everything. One minute ten breadth is a wondreful fun act yoga for quic recapture of your Body and mind state.",
                description2: "Technical points",
                des2: ["Technical description about the course", 
                "Course pricing and benefits in terms of online mode pof yoga teaching", 
                "How effective is online yoga and be regular to see results",
                "Minimum system requirements and other detailed stuff"],
                description3: "Yoga points",
                des3: ["Technical description about the course", 
                "Course pricing and benefits in terms of online mode pof yoga teaching", 
                "How effective is online yoga and be regular to see results",
                "Minimum system requirements and other detailed stuff"],
                tagline: "This is a space to put on a tagline for the course",
                rating: 4.5,
                price: 1999,
                author: {
                    name : 'Infinite_n00b',
                }
            }}></Card>
            {/* <Card></Card> */}
            </div>
            <Typography style={{
                margin: 30,
                alignSelf: 'center',
                fontWeight: 700,
                fontSize: 18,
            }}>
                Recomended Courses: 
            </Typography>
            <div style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                }}>
                <Course_card 
                    info={{
                            photo: pp,
                            title: "Fit Yogi",
                            description: "Something as description about the course to be included here fro the card .",
                            rating: 3.5,
                            price: 1999,
                            author: {
                                name: "Aman",
                            },
                        }}></Course_card>
                <Course_card 
                    info={{
                            photo: pp,
                            title: "Fit Yogi",
                            description: "Something as description about the course to be included here fro the card .",
                            rating: 3.5,
                            price: 1999,
                            author: {
                                name: "Aman",
                            },
                        }}></Course_card>
                <Course_card 
                    info={{
                            photo: pp,
                            title: "Fit Yogi",
                            description: "Something as description about the course to be included here fro the card .",
                            rating: 3.5,
                            price: 1999,
                            author: {
                                name: "Aman",
                            },
                        }}></Course_card>
                <Course_card 
                    info={{
                            photo: pp,
                            title: "Fit Yogi",
                            description: "Something as description about the course to be included here fro the card .",
                            rating: 3.5,
                            price: 1999,
                            author: {
                                name: "Aman",
                            },
                        }}></Course_card>
            </div>

        </div>
    )
}

export default Prod_description
