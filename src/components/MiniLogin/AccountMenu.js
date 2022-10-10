import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { signOut } from "firebase/auth"
import auth from "../../firebase/auth"
import LoaderUtils from "../Loader/LoaderUtils"
import SnackbarUtils from "../SnackbarUtils"
import { Link } from "react-router-dom"
import backPath from "../../backPath"

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const logout = () => {
        LoaderUtils.open()
        signOut(auth).then(() => {
            fetch(backPath + "/logout", {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "include",
                // headers: {
                //     "Content-Type": "application/json",
                // },
                redirect: "follow", // manual, *follow, error
            }).then(res => res.text()).then(r => {
                LoaderUtils.close()
                if (r === "success") SnackbarUtils.toast("Signed Out .")
                else SnackbarUtils.error("Unable to Logout .")
            }).catch(e => {
                SnackbarUtils.error("Unable to Logout .")
            })
        })
    }

    return (
        <React.Fragment>
            <Tooltip title="Account settings">
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? "account-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: "1em" }}>AK</Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <Link
                    to="/"
                    style={{
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    {true ? (
                        <MenuItem>
                            <Avatar /> Home
                        </MenuItem>
                    ) : null}
                </Link>
                <Link
                    to="admin_dashboard"
                    style={{
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    {true ? (
                        <MenuItem>
                            <Avatar /> Dashboard
                        </MenuItem>
                    ) : null}
                </Link>
                <MenuItem>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => document.requestFullScreen()}>
                    <ListItemIcon>
                        <span className="material-icons" fontSize="small">
                            fullscreen
                        </span>
                    </ListItemIcon>
                    Fullscreen
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <span className="material-icons" fontSize="small">
                            settings
                        </span>
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem
                    onClick={logout}
                >
                    <ListItemIcon>
                        <span className="material-icons" fontSize="small">
                            logout
                        </span>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}
