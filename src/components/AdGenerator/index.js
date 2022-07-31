import React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Button, Dialog, DialogTitle, useMediaQuery, TextField } from "@mui/material"

const AdGenerator = () => {
    const matches = useMediaQuery("(min-width:756px)")
    const [close, setClose] = React.useState(true)

    return (
        <>
        <h3 style={{ paddingLeft: 20 }}>Active ADs</h3>
            <TableContainer sx={{ minWidth: 300, maxWidth: matches ? "calc(100% - 80px)" : "100%", margin: "auto" }} component={Paper}>
                <Table aria-label="Active Advertisements table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">AD Name</TableCell>
                            <TableCell align="center">Created on</TableCell>
                            <TableCell align="center">Edit / View</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1 Minute 10 breaths</TableCell>
                            <TableCell align="center">{new Date().toDateString()}</TableCell>
                            <TableCell align="center">
                                <Button variant="text" color="secondary">
                                    <span className="material-icons">edit</span>
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button variant="text" color="error">
                                    <span className="material-icons">delete</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>1 Minute 10 breaths</TableCell>
                            <TableCell align="center">{new Date().toDateString()}</TableCell>
                            <TableCell align="center">
                                <Button variant="text" color="secondary">
                                    <span className="material-icons">edit</span>
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button variant="text" color="error">
                                    <span className="material-icons">delete</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>1 Minute 10 breaths</TableCell>
                            <TableCell align="center">{new Date().toDateString()}</TableCell>
                            <TableCell align="center">
                                <Button variant="text" color="secondary">
                                    <span className="material-icons">edit</span>
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button variant="text" color="error">
                                    <span className="material-icons">delete</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>1 Minute 10 breaths</TableCell>
                            <TableCell align="center">{new Date().toDateString()}</TableCell>
                            <TableCell align="center">
                                <Button variant="text" color="secondary">
                                    <span className="material-icons">edit</span>
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button variant="text" color="error">
                                    <span className="material-icons">delete</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={close} onClose={() => setClose(false)}>
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <DialogTitle>Advertisement Info</DialogTitle>
                    <TextField
                        sx={{ margin: 1 }}
                        label="AdName"
                        value={"1 Minute 10 breaths"}
                        //   onChange={}
                        variant="outlined"
                    />
                    <TextField
                        sx={{ margin: 1 }}
                        label="Title"
                        value={"Enroll Now !"}
                        //   onChange={}
                        variant="outlined"
                    />
                    <TextField
                        sx={{ margin: 1 }}
                        label="Body"
                        value={"for free Course"}
                        //   onChange={}
                        variant="outlined"
                    />
                    <TextField
                        sx={{ margin: 1 }}
                        //   value={"for free COurse"}
                        //   onChange={}
                        variant="outlined"
                        label="Background Image"
                        type="file"
                    />
                    <br></br>
                    <br></br>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button variant="text" color="error">
                            Discard
                        </Button>
                        <Button variant="contained" color="primary">
                            Create
                        </Button>
                    </div>
                </Paper>
            </Dialog>
        </>
    )
}

export default AdGenerator