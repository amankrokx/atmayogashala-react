import Typography from '@mui/material/Typography'



export default function (props) {
    return (
        <div
            style={{
                height: 240,
                width: "calc(100% - 80px)",
                margin: "15px 40px",
                background: "grey",
                display: "flex",
                justifyContent: "space-between",
                background: "radial-gradient(circle at 88% 58%, #001E96 0%, #04277F 12%, #242667 52%, #6B0A7B 100%)",
                borderRadius: 5,
                backgroundImage: `url(${props.info.photoBackground})`,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed'
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                alignItems: 'flex-end',
                width: '50%',
                paddingLeft: 20
            }}>
                <Typography variant="h6" color="#fff">
                    This Festive Season, 
                </Typography>
                <Typography variant="h3" color="primary" style={{
                    fontWeight: 'bold'
                }}>Get 10% off !</Typography>
                <Typography variant="h5" color="secondary">
                    On all Courses and subscriptions
                </Typography>
            </div>
            <div
                style={{
                    height: "inherit",
                    display: 'flex',
                    justifyContent: 'space-around',
                    width: '50%'
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