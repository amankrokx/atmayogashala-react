import React from "react";
import Button from '@mui/material/Button'

export default function Products({ setSignin }) {
    return (
        <Button
            variant="contained"
            color="primary"
            style={{ margin: "70px" }}
            onClick={() => {
                setSignin.setLoggedIn(!setSignin.loggedIn)
            }}
        >
            change login state
        </Button>
    )
}