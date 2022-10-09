import { useTheme } from "@mui/material/styles"
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import FacebookIcon from "@mui/icons-material/Facebook"
import YouTubeIcon from "@mui/icons-material/YouTube"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import GoogleIcon from "@mui/icons-material/Google"
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'
import IconButton from '@mui/material/IconButton'
import { useRef } from 'react'
import SnackbarUtils from "../SnackbarUtils"
import { useState } from 'react'

function Footer(props) {
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
    const newsletterInput = useRef()
    const [emailError, setEmailError] = useState(false)
    styles.iconText.color = theme.palette.secondary.main
    styles.icon.color = theme.palette.grey.A700
    const setEmailColor = () => {
        if (
            newsletterInput.current.value.length < 1 ||
            newsletterInput.current.value
                .toLowerCase()
                .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        )
            setEmailError(false)
        else setEmailError(true)
    }
    const subscribeNewsleter = () => {
        if (newsletterInput.current.value
                .toLowerCase()
                .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ) {
            // Fetch request
            console.log(newsletterInput.current.value)
            newsletterInput.current.value = null
            SnackbarUtils.success("Subscribes to Newsletter .")
        } else SnackbarUtils.error("Please check Email address .")
    }

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
                marginTop: 20,
            }}
        >
            {matches ? (
                <div
                    style={{
                        paddingLeft: 30,
                        fontSize: "1.3em",
                    }}
                >
                    AtmaYogaShala{" "}
                </div>
            ) : null}
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                    alignContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    flexDirection: matches ? "row" : "column-reverse",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: matches ? "50%" : "100%",
                    }}
                >
                    {matches ? null : (
                        <>
                            <Divider />
                            <br></br>
                        </>
                    )}
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
                        minWidth: 300,
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
                        error={emailError}
                        helperText={emailError ? "Invalid Email" : null}
                        inputRef={newsletterInput}
                        InputProps={{
                            onChange: setEmailColor,
                            onKeyDown: (e) => {
                                if (e.key === 'Enter') subscribeNewsleter()
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <span className="material-icons">email</span>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="Subscribe" onClick={subscribeNewsleter}>
                                        <span className="material-icons" aria-label="subscribe" edge="end">
                                            send
                                        </span>
                                    </IconButton>
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

export default Footer