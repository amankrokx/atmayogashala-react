import  Container from "@mui/material/Container"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import LoginGoogle from "../../firebase/auth/google"
import SnackbarUtils from "../SnackbarUtils"
import Button from '@mui/material/Button'
import auth from "../../firebase/auth"


function MiniLogin (props) {
    const [logged, setLogged] = useState(false)

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
            <Container maxWidth="sm" style={{
                float: "right"
            }}>
                <Button variant="outlined" color="white"
                    style={{
                        float:"right"
                    }}
                    onClick={() => {
                        signOut(auth).then(() => {
                            SnackbarUtils.success("Signed Out Successfully .")
                        })
                    }}
                >
                  Sign Out
                </Button>
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