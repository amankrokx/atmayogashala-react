import React, { useState, useEffect } from "react"
import SnackbarUtils from "../components/SnackbarUtils"
import Typography from '@mui/material/Typography'
import { useMediaQuery, useTheme, CircularProgress, Chip, Divider, Alert } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { Link } from "react-router-dom"
import logo from "../media/logo.png"
import auth from "../firebase/auth"
import LoaderUtils from "../components/LoaderUtils"

export default function Checkout() {
    const matches = useMediaQuery("(min-width:756px)")
    const theme = useTheme()
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState({
            _id: "63442806eb77c1f28c6e0347",
            shortDesc: 'To test out wether markdown form submission works or not',      
            price: 6969.69,
            name: 'A HtmlCourse',
            active: false,
            buyers: 0,
            chapters: [ '633d531265c7e2f68a374f09' ],
            cover: 'https://storage.googleapis.com/atmayogashala-3485c.appspot.com/Courses/A%20markdown%20Course.jpg?GoogleAccessId=firebase-adminsdk-qobue%40atmayogashala-3485c.iam.gserviceaccount.com&Expires=4070889000&Signature=grNVRkTo0S95LVm2rkhV4D389kmfR8PT%2B%2FfpC8oLU9ApSlGC8pDuqKVN8SlKanFrbF3Pt4lymK%2B2kwwn8rQGf7FR9YCklY3YIl8DImMNpSsUCq4S4zjIq4ymqOqLQiZfZxBIVe6h1YO1WO3oCYFWZ1%2BuYG5%2Bpev9lz2Ez0fpLfVLjX8Dn7AegLLiBqf%2FAkhmSYmkKWlkWXvwnFOBYhbQS8ke127qwiy30qCqRGjBQUTgGB14E%2FefTfCNREmJ9%2FM6Z3xpLdFF0UWYr9CQmAj6T92cqA5MKsaTr2hpCJFB98ZlAqSI1j2zZwhDK1S53aX%2FPa78t9ydxN8RicIfFWp1VA%3D%3D',
            created: "2022-10-10T14:11:18.805Z",
            author: 'aman',
            longDesc: '<p><strong>Html this time</strong></p>\r\n' +
                '<p><strong>fsdgdfsgdsfg</strong></p>\r\n' +
                '<p><br></p>\r\n' +
                '<ol>\r\n' +
                '  <li><strong>point 1</strong></li>\r\n' +
                '  <li><strong>point 2</strong></li>\r\n' +
                '</ol>',
            tags: [ 'xghdsrgfh', 'fgdhjdytgfhjtdjgyh', 'ghjftghj', 'aman' ],
            date: "2022-10-10T16:25:25.014Z"
    })
    const loadScript = src => {
        return new Promise(resolve => {
            LoaderUtils.open()
            const script = document.createElement("script")
            script.src = src
            script.onload = () => {
                LoaderUtils.close()
                resolve(true)
            }
            script.onerror = () => {
                LoaderUtils.close()
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    const proceedPayment = async () => {
        setLoading(true)
        const user = auth.currentUser
        const options = {
            key: "rzp_test_JotTRx6TZHZKGC", // Enter the Key ID generated from the Dashboard
            amount: (50000).toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "AtmaYogashala",
            description: "Payment for buying course " + course.name,
            image: logo,
            order_id: "order_KSyNCCJVQBSjHc", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response) {
                setLoading(false)
                console.warn(response)
            },
            prefill: {
                name: user.displayName || "",
                email: user.email || "",
                contact: user.phoneNumber || "",
            },
            notes: {
                coupon: "AMANTEST",
            },
            theme: {
                color: theme.palette.primary.main,
            },
        }
        const rzp = new Razorpay(options)
        rzp.on("payment.failed", function (response) {
            setLoading(false)
            console.warn(response)
        })
    }
    
    return (
        <div>
            <Typography variant="h5" color="black" style={{ padding: 16, fontWeight: "bold" }}>
                You're Almost there...!
            </Typography>
            <section
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: matches ? "row" : "column",
                    margin: "auto",
                    width: matches ? "fit-content" : "calc(100% - 16px)",
                    boxShadow: theme.shadows[5],
                    padding: 24,
                    boxSizing: "border-box",
                    justifyContent: "space-between",
                    background: theme.palette.grey.A200,
                    position: "relative",
                }}
            >
                <div style={{ minWidth: "40%", margin: 16 }}>
                    <Typography variant="h6" color={theme.palette.grey.A700} style={{ fontWeight: "bold" }}>
                        Order Summary
                    </Typography>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: matches ? "nowrap" : "wrap",
                            flexDirection: "row",
                            marginTop: 8,
                            padding: 16,
                            backgroundColor: theme.palette.white.main,
                            boxShadow: theme.shadows[5],
                        }}
                    >
                        <img src={course.cover} alt="Product" style={{ width: matches ? 160 : "100%" }} />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                marginLeft: 16,
                                paddingTop: matches ? 0 : 16,
                                width: "100%",
                            }}
                        >
                            <Typography variant="h5" color={theme.palette.grey.A700} style={{ fontWeight: "bold" }}>
                                {course.name}
                            </Typography>
                            <Typography variant="caption" color="initial">
                                {"Author "}
                                <Link to={`/search?k=/${course.author}`} style={{ textDecoration: "none" }}>
                                    {course.author}
                                </Link>
                            </Typography>
                            <Typography variant="body1" color="initial" style={{ fontWeight: "bold" }}>
                                {"₹ " + course.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div style={{ minWidth: "40%", margin: 16 }}>
                    <Typography variant="h6" color={theme.palette.grey.A700} style={{ fontWeight: "bold" }}>
                        Order Details
                    </Typography>
                    <div
                        style={{
                            display: "flex",
                            marginTop: 8,
                            padding: 16,
                            backgroundColor: theme.palette.white.main,
                            boxShadow: theme.shadows[5],
                            minWidth: 160,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                width: "100%",
                            }}
                        >
                            <Typography variant="caption" color={theme.palette.grey.A700} style={{ fontWeight: "bold" }}>
                                Total
                            </Typography>
                            <Divider style={{ margin: "8px 0" }} />
                            <Typography variant="caption" color="initial">
                                Price
                                <span style={{ float: "right" }}>{"₹ " + course.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                            </Typography>
                            <Typography variant="caption" color="initial">
                                Discount
                                <span style={{ float: "right" }}>{"₹ " + "0".toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                            </Typography>
                            <Typography variant="caption" color="initial">
                                GST (18%)
                                <span style={{ float: "right" }}>{"₹ " + (Math.trunc(course.price * 18) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                            </Typography>
                            <Divider style={{ margin: "8px 0" }} />
                            <Typography variant="caption" color={theme.palette.grey.A700} style={{ fontWeight: "bold" }}>
                                Subtotal
                                <span style={{ float: "right" }}>{"₹ " + (Math.trunc(course.price * 118) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                            </Typography>
                            <Alert
                                icon={false}
                                severity="success"
                                sx={{
                                    mt: 1,
                                    lineHeight: 1,
                                    padding: "0 16px",
                                    display: "block",
                                }}
                            >
                                <Typography variant="caption" color="primary" style={{ fontWeight: "bold" }}>
                                    Total Savings
                                    <span style={{ float: "right" }}>{"₹ " + (0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                </Typography>
                            </Alert>
                        </div>
                    </div>
                </div>
                <LoadingButton variant="contained" color="primary" loading={loading} onClick={proceedPayment} style={{ width: "calc(100% - 36px)", margin: "16px auto 0 auto" }}>
                    <b>Proceed to Payment</b>
                </LoadingButton>
            </section>
        </div>
    )
}
