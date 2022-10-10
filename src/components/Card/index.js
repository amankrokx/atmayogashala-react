import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Rating from "@mui/material/Rating"
import Chip from "@mui/material/Chip"
import Avatar from "@mui/material/Avatar"
import { Link } from "react-router-dom"
import webShareAPI from "../webShareAPI"

export default function ImgMediaCard({ info }) {
    console.log(info)
    return (
        <Card sx={{ width: 345, minWidth: 345, margin: "10px" }}>
            <CardMedia component="img" alt="green iguana" height="160" image={info.cover} />
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {info.name}
                    <div>
                        <Button>
                            <span className="material-icons" onClick={() => {
                                webShareAPI("http://" + window.location.host + "/courses/" + info._id, info.name, info.shortDesc)
                            }}>share</span>
                        </Button>
                        <Chip
                            avatar={
                                <Avatar alt={info.author.toString()}>
                                    {info.author.toString().charAt(0)}
                                </Avatar>
                            }
                            label={info.author}
                            color="secondary"
                            size="small"
                            variant="filled"
                        />
                    </div>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {info.shortDesc}
                </Typography>
                <Rating name="read-only" value={info.rating || 2.5} precision={0.5} defaultValue={1} readOnly style={{ marginTop: 10 }} />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span>₹</span>
                    <span style={{ marginLeft: 5 }}>{info.price}</span>
                    <span className="material-icons" style={{ fontSize: 18, marginLeft: 5 }}>
                        sell
                    </span>
                </div>
            </CardContent>
            <CardActions style={{ justifyContent: "flex-end", paddingRight: 20, paddingBottom: 15 }} onClick={() => {}}>
                <Link
                    to={'/course/' + info._id}
                    style={{
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    <Button size="small" style={{ marginRight: 10 }}>
                        Learn More
                    </Button>
                    <Button size="small" variant="contained">
                        <span className="material-icons" style={{ fontSize: 18, marginRight: 5 }}>
                            add_shopping_cart
                        </span>
                        Buy
                    </Button>
                </Link>
            </CardActions>
        </Card>
    )
}
