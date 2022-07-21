import { useCallback, useEffect, useRef, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from '@mui/material/Container'
import { Box, InputAdornment, Slide, TextField, Button } from "@mui/material";
import { loginEmail, signupEmail } from "../../firebase/auth/email"
import loginPhone from "../../firebase/auth/phone"
import fb from "../../media/facebook.png"
import google from "../../media/google.png"
import twitter from "../../media/twitter.png"
import SnackbarUtils from "../SnackbarUtils";
import LoginGoogle from "../../firebase/auth/google"

function LoginWindow (props) {
    const [page, setPage] = useState("phoneLogin")
    const matches = useMediaQuery("(min-width:756px)")
    const [passVisible, setPassVisible] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const containerRef = useRef(null)
    const emailRef = useRef(null)
    const emailSignupRef = useRef(null)
    const phoneRef = useRef(null)
    const otpRef = useRef(null)
    const passwordRef = useRef(null)
    const passwordSignupRef = useRef(null)
    let timeout = 200
    // const [email, setEmail] = useState("email")
    // https://ipapi.co/country_calling_code/
    const getCC = () => {
        try {
            fetch("https://ipapi.co/country_calling_code/").then(data => data.text()).then(data => phoneRef.current.value = data)
        } catch (e) {
            console.warn(e)
        }
    }
    useEffect(() => {
        getCC()
    }, [])

    // loginPhone.generateRecaptcha()

    const EmailLogin = useCallback(() => {
        // console.log(emailRef.current.value, passwordRef.current.value)
        loginEmail(emailRef.current.value, passwordRef.current.value)
    }, [])
    const EmailSignup = useCallback(() => {
        // console.log(emailRef.current.value, passwordRef.current.value)
        signupEmail(emailSignupRef.current.value, passwordSignupRef.current.value)
    }, [])
    const PhoneLogin = useCallback(() => {
        // console.log(phoneRef.current.value, otpRef.current.value)
        loginPhone.sendOtp(phoneRef.current.value).then(s => {setOtpSent(s)}).catch(s => {setOtpSent(s)})
        // loginPhone.sendOtp(phoneRef.current.value)
    }, [])
    const PhoneVerify = useCallback(() => {
        // console.log(phoneRef.current.value, otpRef.current.value)
        loginPhone.verifyOtp(otpRef.current.value)
    }, [])
    
    return (
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                height: "fit-content",
                width: matches ? 756 : "calc(100% - 40px)",
                minHeight: 500,
                // background: "#eee",
                margin: "0 auto",
                flexDirection: "column",
                alignItems: "center",
            }}
            ref={containerRef}
        >
            <Slide direction="left" in={page === "emailLogin"} container={containerRef.current} unmountOnExit {...{ timeout, easing: "ease-in" }}>
                <Box
                    component="form"
                    noValidate
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "nowrap",
                        width: "100%",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignContent: "center",
                            justifyContent: "center",
                        }}
                    >
                        <br />
                        <TextField
                            color="primary"
                            id="emailLogin"
                            variant="outlined"
                            label="Email"
                            type="email"
                            // defaultValue=""
                            helperText="johncena@wwe.com"
                            placeholder="Enter Email"
                            required
                            fullWidth
                            inputRef={emailRef}
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <span className="material-icons">email</span>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <br />
                        <br />
                        <TextField
                            color="primary"
                            id="outlined-password-input"
                            label="Password"
                            type={passVisible ? "text" : "password"}
                            autoComplete="current-password"
                            helperText="Your Password"
                            placeholder="********"
                            required
                            fullWidth
                            inputRef={passwordRef}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <span className="material-icons">lock</span>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <span className="material-icons" aria-label="toggle password visibility" onClick={() => setPassVisible(!passVisible)} edge="end">
                                            {passVisible ? "visibility_off" : "visibility"}
                                        </span>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <span
                            style={{
                                margin: "0 0 10px auto",
                                fontSize: 12,
                                color: "grey",
                                cursor: "pointer",
                            }}
                        >
                            Forgot Password ?
                        </span>
                        <span
                            style={{
                                margin: "auto",
                                fontSize: 13,
                                color: "grey",
                                marginBottom: 10,
                                cursor: "pointer",
                            }}
                            onClick={() => setPage("emailSignup")}
                        >
                            Signup with Email .
                        </span>
                        <Button variant="contained" color="primary" onClick={EmailLogin}>
                            Login
                        </Button>
                        <Button variant="text" color="primary" size="small" style={{ margin: "10px 0" }} onClick={() => setPage("phoneLogin")}>
                            Use Phone
                        </Button>
                    </div>
                </Box>
            </Slide>
            <Slide direction="down" in={page === "emailSignup"} container={containerRef.current} unmountOnExit {...{ timeout, easing: "ease-in" }}>
                <Box
                    component="form"
                    noValidate
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "nowrap",
                        width: "100%",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignContent: "center",
                            justifyContent: "center",
                        }}
                    >
                        <br />
                        <TextField
                            color="primary"
                            id="emailLogin"
                            variant="outlined"
                            label="Email"
                            type="email"
                            // defaultValue=""
                            helperText="johncena@wwe.com"
                            placeholder="Enter Email"
                            required
                            fullWidth
                            inputRef={emailSignupRef}
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <span className="material-icons">email</span>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <br />
                        <br />
                        <TextField
                            color="primary"
                            id="outlined-password-input"
                            label="Password"
                            type={passVisible ? "text" : "password"}
                            helperText="Set a Password"
                            placeholder="********"
                            required
                            fullWidth
                            inputRef={passwordSignupRef}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <span className="material-icons">lock</span>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <span className="material-icons" aria-label="toggle password visibility" onClick={() => setPassVisible(!passVisible)} edge="end">
                                            {passVisible ? "visibility_off" : "visibility"}
                                        </span>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <span
                            style={{
                                margin: "0 0 10px auto",
                                fontSize: 12,
                                color: "grey",
                                cursor: "pointer",
                            }}
                        >
                            Forgot Password ?
                        </span>
                        <span
                            style={{
                                margin: "auto",
                                fontSize: 13,
                                color: "grey",
                                marginBottom: 10,
                                cursor: "pointer",
                            }}
                            onClick={() => setPage("emailLogin")}
                        >
                            Already have an Account ? Login .
                        </span>
                        <Button variant="contained" color="primary" onClick={EmailSignup}>
                            Signup
                        </Button>
                        <Button variant="text" color="primary" size="small" style={{ margin: "10px 0" }} onClick={() => setPage("phoneLogin")}>
                            Use Phone
                        </Button>
                    </div>
                </Box>
            </Slide>
            <Slide direction="right" in={page === "phoneLogin"} container={containerRef.current} unmountOnExit {...{ timeout, easing: "ease-in" }}>
                <Box
                    component="form"
                    noValidate
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "nowrap",
                        width: "100%",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignContent: "center",
                            justifyContent: "center",
                        }}
                    >
                        <br />
                        <TextField
                            color="primary"
                            id="phoneLogin"
                            variant="outlined"
                            label="Phone"
                            type="tel"
                            // defaultValue=""
                            helperText="+91 9935 718 201"
                            placeholder="Enter Phone"
                            required
                            fullWidth
                            inputRef={phoneRef}
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <span className="material-icons">phone</span>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <br />
                        <br />
                        <TextField
                            disabled={!otpSent}
                            color="primary"
                            id="otp"
                            label="OTP"
                            type="number"
                            helperText="Your OTP"
                            placeholder="Enter OTP"
                            required
                            fullWidth
                            inputRef={otpRef}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <span className="material-icons">password</span>
                                    </InputAdornment>
                                ),
                                maxLength: "6",
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={e => {
                                e.preventDefault()
                                if (otpSent) PhoneVerify()
                                else PhoneLogin()
                            }}
                        >
                            {otpSent ? "Verify" : "Send OTP"}
                        </Button>
                        {/* <span
                            style={{
                                margin: "10px 0 0 auto",
                                fontSize: 13,
                            }}
                        >
                            Use Phone instead .
                        </span> */}
                        <Button variant="text" color="primary" size="small" style={{ margin: "10px 0" }} onClick={() => setPage("emailLogin")}>
                            Use Email
                        </Button>
                    </div>
                </Box>
            </Slide>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: 200,
                }}
            >
                <img src={fb} style={{ cursor: "pointer" }} onClick={() => SnackbarUtils.warning("Not Yet Available .")} alt="Login with Facebook"></img>
                <img src={twitter} style={{ cursor: "pointer" }} onClick={() => SnackbarUtils.warning("Not Yet Available .")} alt="Login with Twitter"></img>
                <img src={google} style={{ cursor: "pointer" }} onClick={LoginGoogle} alt="Login with Google"></img>
            </div>
        </Container>
    )
}

export default LoginWindow