import React from "react";
import Button from '@mui/material/Button'
import LoaderUtils from "../components/Loader/LoaderUtils";

export default function Products({ setSignin }) {
    return (
        <Button
            variant="contained"
            color="primary"
            style={{ margin: "70px" }}
            onClick={() => {
                LoaderUtils.toggle()
            }}
        >
            Change Loading
        </Button>
    )
}