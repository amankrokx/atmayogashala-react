import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import backPath from "../../backPath"

function BannerAd(props) {
    const matches = useMediaQuery("(min-width:756px)")
    const [ads, setAds] = useState([])
    const [adIndex, setAdIndex] = useState(-1)
    
    useEffect(() => {
        fetch(backPath() + '/getAds')
            .then(data => data.json())
            .then(res => {
                if (res.length > 0) {
                    console.log(res)
                    setAds(res)
                    setAdIndex(0)
                    const timer = window.setInterval(() => {
                        setAdIndex(count => (count + 1) % res.length)
                    }, 4000)
                    return () => {
                        window.clearInterval(timer)
                    }
                }
            })
    }, [])
    return (
        <div
            style={{
                height: 240,
                width: matches ? "calc(100% - 80px)" : "100%",
                margin: matches ? "15px 40px" : "15px 0",
                background: "grey",
                display: "flex",
                justifyContent: "space-between",
                background: "radial-gradient(circle at 88% 58%, #001E96 0%, #04277F 12%, #242667 52%, #6B0A7B 100%)",
                borderRadius: 5,
                backgroundImage: `url(${props.info.photoBackground})`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
            }}
        >
            <div
                style={{
                    display: "flex",
                    position: "relative",
                    flexDirection: "column",
                    alignContent: "center",
                    flexWrap: "nowrap",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    width: matches ? "50%" : "40%",
                    paddingLeft: matches ? 20 : 5,
                    paddingRight: matches ? null : 10,
                }}
            >
                <Typography variant={matches ? "h6" : "caption"} color="#fff" style={{ textAlign: "end" }}>
                    {adIndex > -1 ? ads[adIndex].name : "This Festive Season,"}
                </Typography>
                <Typography
                    variant={matches ? "h3" : "h5"}
                    color="primary"
                    style={{
                        fontWeight: "bold",
                        textAlign: "end",
                    }}
                >
                    {adIndex > -1 ? ads[adIndex].title : "Get 10% off !"}
                </Typography>
                <Typography variant={matches ? "h5" : "caption"} color="secondary" style={{ textAlign: "end" }}>
                    {adIndex > -1 ? ads[adIndex].body : "On all Courses and subscriptions"}
                </Typography>
                <span style={{ position: "absolute", bottom: 5, left: 5, color: "white", fontSize: 8 }}>{adIndex > -1 ? new Date(ads[adIndex].date).toDateString() : null}</span>
            </div>
            <div
                style={{
                    height: "inherit",
                    display: "flex",
                    justifyContent: "space-around",
                    width: matches ? "50%" : "60%",
                    position: 'relative'
                }}
            >
                <img
                    src={adIndex > -1 ? ads[adIndex].imageUrl : props.info.photoPrimary}
                    alt="Banner AD clip"
                    style={{
                        height: "inherit",
                    }}
                ></img>
                <span style={{ position: "absolute", top: 5, right: 5, color: "white", fontSize: 8 }}>
                    {adIndex > -1 ? ads[adIndex]._id : null}
                </span>

            </div>
        </div>
    )
}

export default BannerAd