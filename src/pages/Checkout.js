import React, { useState, useEffect } from "react"
import SnackbarUtils from "../components/SnackbarUtils"
import Typography from '@mui/material/Typography'
import { useMediaQuery, useTheme } from "@mui/material"

export default function Checkout() {
    const matches = useMediaQuery("(min-width:756px)")
    const theme = useTheme()
    const [course, setCourse] = useState({
            _id: "63442806eb77c1f28c6e0347",
            shortDesc: 'To test out wether markdown form submission works or not',      
            price: 9999,
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
    return (
        <div>
            <Typography variant="h5" color="black" style={{padding: 16, fontWeight: "bold"}}>You're Almost there...!</Typography>
            <section style={{
                display: "flex",
                margin: "auto",
                width: matches ? "calc(100% - 48px)" : "calc(100% - 16px)",
                boxShadow: theme.shadows[5],
                padding: 24,
                boxSizing: "border-box",
                background: theme.palette.grey.A200,
            }}>
                <div style={{
                    
                }}>
                    Order Summary
                    <img src={course.cover} alt="Product Image" style={{width: 240}}/>
                </div>
            </section>
        </div>
    )
}
