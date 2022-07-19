import { Fragment, useEffect, useRef, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from '@mui/material/Container'
import { Box, InputAdornment, Slide, TextField, Button } from "@mui/material";


function LoginWindow (props) {
    const [page, setPage] = useState("emailLogin")
    const matches = useMediaQuery("(min-width:756px)")
    const [passVisible, setPassVisible] = useState(false)
    const containerRef = useRef(null)
    // const [email, setEmail] = useState("email")
    // // https://ipapi.co/country_calling_code/
    // useEffect(() => {
    //     fetch("https://ipapi.co/country_calling_code/").then(data => data.text()).then(data => setEmail(data))
    // })
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
            }}
            ref={containerRef}
        >
            <Slide direction="left" in={page === "emailLogin"} container={containerRef.current}>
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
                            defaultValue=""
                            helperText="johncena@wwe.com"
                            placeholder="Enter Email"
                            required
                            fullWidth
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
                            }}
                        >
                            Forgot Password ?
                        </span>
                        <Button variant="contained" color="primary">
                            Login
                        </Button>
                        {/* <span
                            style={{
                                margin: "10px 0 0 auto",
                                fontSize: 13,
                            }}
                        >
                            Use Phone instead .
                        </span> */}
                        <Button variant="text" color="primary" size="small" style={{ margin: "10px 0" }}>
                            Use Phone
                        </Button>
                    </div>
                </Box>
            </Slide>
        </Container>
    )
}

export default LoginWindow