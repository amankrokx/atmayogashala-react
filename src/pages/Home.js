import React, { useState } from "react"
import LoaderUtils from "../components/Loader/LoaderUtils"
import Card from "../components/Card"
import pp from "../media/product4.jpg"
import Typography from '@mui/material/Typography'
import Chip from "@mui/material/Chip"
import useMediaQuery from "@mui/material/useMediaQuery"
import BannerAd from "../components/BannerAd"
import yogaClip from "../media/adprimary.png"
import AdBackground from "../media/AdBackground.webp"
import yogaBack from "../media/yogaBack.webp"
import Zoom from "@mui/material/Zoom"
import prod4 from "../media/product4.jpg"
import { useTheme } from "@mui/material/styles"
import moveImg from "../media/move.jpg"
import relaxImg from "../media/relax.jpg"
import breatheImg from "../media/breath.jpg"


function ZoomCard (props) {
    const theme = useTheme()
    const [height, setHeight] = useState(34)
    return (
        <Zoom in={true} style={{ transitionDelay: props.delay ? props.delay : "200ms", transitionDuration: 750, height: 100, width: 100, boxShadow: theme.shadows[8] }}>
            <div
                style={{
                    position: "relative",
                    backgroundImage: `url(${props.photo || prod4})`,
                    height: 200,
                    width: 300,
                    minWidth: 300,
                    margin: 30,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                onMouseOver={() => setHeight('100%')}
                onMouseOut={() => setHeight(34)}
            >
                <span
                    style={{
                        position: "absolute",
                        bottom: 0,
                        fontSize: 24,
                        fontWeight: 400,
                        marginBottom: 5,
                        marginLeft: 15,
                        zIndex: 2,
                    }}
                >
                    {props.title}
                </span>
                <span
                    className="material-icons"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        margin: 10,
                        marginRight: 15,
                        zIndex: 2,
                        color: theme.palette.primary.main,
                    }}
                >
                    play_circle_filled
                </span>
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        height: height,
                        backgroundColor: "#ffffff99",
                        overflow: "hidden",
                        padding: 10,
                        paddingTop: 34,
                        boxSizing: 'border-box',
                        backdropFilter: 'blur(3px)',
                        transition: 'height 0.2s ease-in-out'
                    }}
                >
                    <Typography color="secondary">
                        <br ></br>
                        {props.description}
                    </Typography>
                </div>
            </div>
        </Zoom>
    )
}

function Home() {
    const matches = useMediaQuery("(min-width:756px)")
    const theme = useTheme()
    const chipClick = (e) => {
        console.log(e)
    }

    return (
        <div>
            <div
                style={{
                    width: "100%",
                    // minHeight: "calc(100vw * 1.39)",
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    backgroundImage: `url(${yogaBack})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100%",
                    backgroundAttachment: "fixed",
                    backgroundPositionY: matches ? "bottom" : 0,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "row",
                        justifyContent: matches ? "space-between" : "center",
                        width: "100%",
                    }}
                >
                    <ZoomCard
                        delay="200ms"
                        title="Breathe"
                        photo={breatheImg}
                        description="A long paragraph A long paragraphA long paragraphA long paragraphA long paragraphA long paragraphA long paragraph"
                    ></ZoomCard>
                    <ZoomCard
                        delay="500ms"
                        title="Relax"
                        photo={relaxImg}
                        description="A long paragraph A long paragraphA long paragraphA long paragraphA long paragraphA long paragraphA long paragraph"
                    ></ZoomCard>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "row",
                        justifyContent: matches ? "space-between" : "center",

                        width: "100%",
                    }}
                >
                    <ZoomCard delay="1100ms" title="Explore" description="A long paragraph A long paragraphA long paragraphA long paragraphA long paragraphA long paragraphA long paragraph"></ZoomCard>
                    <Typography variant={matches ? "h2" : "h4"} color={theme.palette.white.main}>
                        <span style={{ marginLeft: matches ? -30 : 0 }}>1 Minute</span>
                        <br></br>
                        <span style={{ marginLeft: matches ? 30 : 0 }}>10 Breaths</span>
                    </Typography>
                    <ZoomCard
                        delay="800ms"
                        title="Move"
                        photo={moveImg}
                        description="A long paragraph A long paragraphA long paragraphA long paragraphA long paragraphA long paragraphA long paragraph"
                    ></ZoomCard>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "row",
                        justifyContent: matches ? "space-between" : "center",

                        width: "100%",
                    }}
                >
                    <ZoomCard delay="1400ms" title="Breathe" description="A long paragraph A long paragraphA long paragraphA long paragraphA long paragraphA long paragraphA long paragraph"></ZoomCard>
                    <ZoomCard delay="1700ms" title="Breathe" description="A long paragraph A long paragraphA long paragraphA long paragraphA long paragraphA long paragraphA long paragraph"></ZoomCard>
                </div>
            </div>

            <div
                style={{
                    fontWeight: "bold",
                    fontSize: "2em",
                    textAlign: "center",
                    wordWrap: "break-word",
                    padding: 50,
                    paddingBottom: 30,
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
            <BannerAd
                info={{
                    photoPrimary: yogaClip,
                    title: "Get 10% off !",
                    photoBackground: AdBackground,
                }}
            />
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
