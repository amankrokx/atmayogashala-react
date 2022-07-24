import { useTheme } from '@emotion/react'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import FacebookIcon from "@mui/icons-material/Facebook"
import YouTubeIcon from "@mui/icons-material/YouTube"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import GoogleIcon from "@mui/icons-material/Google"
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'

export default function (props) {
    let styles = {
        icon : {
            verticalAlign: 'middle',
        },
        iconText : {
            marginLeft: 20,
            fontSize: '0.9em',
            // width: '80%'
        },
        marginTen : {
            margin : 10,
            display: 'flex',
            marginLeft: '10%'
        }
    }
    let theme = useTheme()
    const matches = useMediaQuery("(min-width:756px)")

    styles.iconText.color = theme.palette.secondary.main
    styles.icon.color = theme.palette.grey.A700
    return (
        <footer
            style={{
                width: "100%",
                height: "fit-content",
                background: theme.palette.grey.A200,
                minHeight: 100,
                display: "flex",
                flexDirection: "column",
                padding: 20,
                boxSizing: "border-box",
                marginTop: 20
            }}
        >
            { matches ? <div style={{
                paddingLeft: 30,
                fontSize: '1.3em'
            }}>AtmaYogaShala </div> : null }
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                    alignContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    flexDirection: matches ? 'row' : 'column-reverse'
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: matches ? '50%' : '100%',
                    }}
                >
                    {matches ? null : <><Divider /><br></br></>}
                    <div style={styles.marginTen}>
                        <div className="material-icons" style={styles.icon}>
                            email
                        </div>
                        <span style={styles.iconText}>atmayogashala@gmail.com</span>
                    </div>
                    <div style={styles.marginTen}>
                        <div className="material-icons" style={styles.icon}>
                            phone
                        </div>
                        <span style={styles.iconText}>+91 97580012369</span>
                    </div>
                    <div style={styles.marginTen}>
                        <div className="material-icons" style={styles.icon}>
                            place
                        </div>
                        <span style={styles.iconText}>40, Maharaja Surya Rao Rd, Dutch Village, Venus Colony, Teynampet, Chennai, Tamil Nadu 600018</span>
                    </div>
                    {matches ? null : <br></br>}

                </div>
                <div
                    style={{
                        width: "50%",
                        textAlign: "center",
                        minWidth: 300
                    }}
                >
                    <div
                        style={{
                            fontSize: "1.7em",
                            fontWeight: "bold",
                            margin: "20px 0",
                            color: theme.palette.primary.main,
                        }}
                    >
                        Connect with us
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            flexWrap: "wrap",
                            color: theme.palette.grey.A700,
                        }}
                    >
                        <FacebookIcon />
                        <GoogleIcon />
                        <TwitterIcon />
                        <InstagramIcon />
                        <YouTubeIcon />
                    </div>
                    <br></br>
                    <center>
                        <Divider width="80%" />
                    </center>
                    <TextField
                        id="newsletter"
                        label="Subscribe to Newsletter ."
                        //   value={}
                        placeholder="johncena@wwe.com"
                        //   onChange={}
                        style={{ margin: "30px 20px", width: "calc(100% - 40px)" }}
                        color="primary"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <span className="material-icons">email</span>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <span className="material-icons" aria-label="subscribe" edge="end">
                                        send
                                    </span>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
            </div>
            <Divider />
            <br></br>
            <div
                style={{
                    textAlign: "center",
                    fontSize: "0.8em",
                    color: theme.palette.grey.A700,
                }}
            >
                Copyright © 2022 | <b>AtmaYogaShala</b>
            </div>
        </footer>
    )
}