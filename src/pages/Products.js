import React from "react";
import Button from '@mui/material/Button'
import { useSnackbar } from "notistack"
import SnackbarUtils from "../components/SnackbarUtils";

export default function Products({ setSignin }) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    return (
        <Button
            variant="contained"
            color="primary"
            style={{ margin: "70px" }}
            onClick={() => {
                setSignin.setLoggedIn(!setSignin.loggedIn)
                SnackbarUtils.error("This is an Error !")
            }}
        >
            change login state
        </Button>
    )
}