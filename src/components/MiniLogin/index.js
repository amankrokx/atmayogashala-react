import  Container from "@mui/material/Container"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import LoginGoogle from "../../firebase/auth/google"
import SnackbarUtils from "../SnackbarUtils"
import Button from '@mui/material/Button'
import auth from "../../firebase/auth"
import IconButton from '@mui/material/IconButton'
import { Badge } from "@mui/material"
import AccountMenu from "./AccountMenu"


function MiniLogin (props) {
    const [logged, setLogged] = useState(false)
    const [noNotifs, setNotifs] = useState(0)

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setLogged(true)
                SnackbarUtils.success("Logged In .")
            } else {
                setLogged(false)
                SnackbarUtils.toast("Please Sign In .")
            }
        })
    }, [])
    if (logged) {
        return (
            <Container
                style={{
                    float: "right",
                    width: "auto",
                    margin: "-20px",
                }}
            >
                <IconButton aria-label="Notifications" color="white" onClick={() => {
                        SnackbarUtils.info("Notifications Clicked .")
                        setNotifs(noNotifs + 1)
                    }}>
                    <Badge badgeContent={noNotifs} color="error">
                        <span
                            className="material-icons"
                            color="white"
                        >
                            notifications
                        </span>
                    </Badge>
                </IconButton>
                <AccountMenu></AccountMenu>
            </Container>
        )
    } else {
        return (
            <Button
                variant="text"
                color="white"
                onClick={LoginGoogle}
                style={{
                    fontWeight: "bold",
                }}
            >
                Login
            </Button>
        )
    }
}

export default MiniLogin