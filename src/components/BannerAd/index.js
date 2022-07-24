import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'


function BannerAd(props) {
    const matches = useMediaQuery("(min-width:756px)")

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
                    This Festive Season,
                </Typography>
                <Typography
                    variant={matches ? "h3" : "h5"}
                    color="primary"
                    style={{
                        fontWeight: "bold",
                        textAlign: "end",
                    }}
                >
                    Get 10% off !
                </Typography>
                <Typography variant={matches ? "h5" : "caption"} color="secondary" style={{ textAlign: "end" }}>
                    On all Courses and subscriptions
                </Typography>
            </div>
            <div
                style={{
                    height: "inherit",
                    display: "flex",
                    justifyContent: "space-around",
                    width: matches ? "50%" : "60%",
                }}
            >
                <img
                    src={props.info.photoPrimary}
                    alt="Banner AD clip"
                    style={{
                        height: "inherit",
                    }}
                ></img>
            </div>
        </div>
    )
}

export default BannerAd