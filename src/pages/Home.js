import React from "react"
import LoaderUtils from "../components/Loader/LoaderUtils"
import Card from "../components/Card"
import pp from "../media/product4.jpg"
import Typography from '@mui/material/Typography'
import Chip from "@mui/material/Chip"
import useMediaQuery from "@mui/material/useMediaQuery"
import BannerAd from "../components/BannerAd"
import yogaClip from "../media/adprimary.png"
import AdBackground from "../media/AdBackground.webp"

function Home() {
    const matches = useMediaQuery("(min-width:756px)")

    const chipClick = (e) => {
        console.log(e)
    }

    return (
        <div>
            <div
                style={{
                    fontWeight: "bold",
                    fontSize: "2em",
                    textAlign: "center",
                    wordWrap: "break-word",
                    padding: 50,
                }}
            >
                Get the Best Yoga courses curated by top Instructors .
            </div>
            <div style={matches ? { paddingLeft: 50 } : { display: "flex", justifyContent: "space-evenly" }}>
                <Chip label="All Courses" color="primary" onClick={chipClick} style={{ margin: 15 }} />
                <Chip label="Personalised" color="primary" variant="outlined" onClick={chipClick} style={{ margin: 15 }} />
                <Chip label="Group" color="primary" variant="outlined" onClick={chipClick} style={{ margin: 15 }} />
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                }}
            >
                <Card
                    info={{
                        photo: pp,
                        title: "Fit Yogi",
                        description: "Something as description about the course to be included here fro the card .",
                        rating: 3.5,
                        price: 1999,
                        author: {
                            name: "Aman",
                        },
                    }}
                ></Card>
                <Card
                    info={{
                        photo: pp,
                        title: "Fit Yogi",
                        description: "Something as description about the course to be included here fro the card .",
                        rating: 3.5,
                        price: 1999,
                        author: {
                            name: "Aman",
                        },
                    }}
                ></Card>
                <Card
                    info={{
                        photo: pp,
                        title: "Fit Yogi",
                        description: "Something as description about the course to be included here fro the card .",
                        rating: 3.5,
                        price: 1999,
                        author: {
                            name: "Aman",
                        },
                    }}
                ></Card>
            </div>
            <BannerAd info={{
                photoPrimary: yogaClip,
                title: "Get 10% off !",
                photoBackground: AdBackground
            }}/>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                }}
            >
                <Card
                    info={{
                        photo: pp,
                        title: "Fit Yogi",
                        description: "Something as description about the course to be included here fro the card .",
                        rating: 3.5,
                        price: 1999,
                        author: {
                            name: "Aman",
                        },
                    }}
                ></Card>
                <Card
                    info={{
                        photo: pp,
                        title: "Fit Yogi",
                        description: "Something as description about the course to be included here fro the card .",
                        rating: 3.5,
                        price: 1999,
                        author: {
                            name: "Aman",
                        },
                    }}
                ></Card>
                <Card
                    info={{
                        photo: pp,
                        title: "Fit Yogi",
                        description: "Something as description about the course to be included here fro the card .",
                        rating: 3.5,
                        price: 1999,
                        author: {
                            name: "Aman",
                        },
                    }}
                ></Card>
            </div>
        </div>
    )
}

export default Home
