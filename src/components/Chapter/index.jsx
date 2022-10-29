import React, { useEffect } from "react";
import bring from "../bring";
import SnackbarUtils from "../SnackbarUtils";
import Typography from '@mui/material/Typography'
import { Divider } from "@mui/material";

function YouTubeGetID(url) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0]
}

function Chapter(props) {
    const [chapter, setChapter] = React.useState({
        active: false,
        buyers: 0,
        chapters: "",
        cover: "https://storage.googleapis.com/atmayogashala-3485c.appspot.com/Chapters/A%20good%20Chapter1666004499439/chapterImage.jpg?GoogleAccessId=firebase-adminsdk-qobue%40atmayogashala-3485c.iam.gserviceaccount.com&Expires=4070889000&Signature=eStjyLfRYzMj7%2Bbbv1NpW4temlhS0vpHMK3vG7XYBVWexUefSwdLRAIgR1nl01WzFR3P7FbCDLs7v4HkFeCSUWInu7ljvi5RgvWHp%2FNm6KeqaWplwEtAg8MrP9yqxOCCvGYAN0IuUorOszY6bYfGHArnjGp3JNFICKq8RCdMIZ3UB5yBFkP8cvw8KVEgXj165tsyxRv7%2Bit%2BXMm4UUCCwBofqL7F51Yz7hh3WVpNS0IL1bgu4ozN9eXA7DN2jqjR5lkmjM5%2F%2Bh2LLQOuCpbppag6bwokIpJmDzSx5iwQ4R%2BLUrdxT4%2BxRnEH4KDKXuEfbb7OypFuFmR%2BWBROxWWEAw%3D%3D",
        created: "2022-10-17T11:01:43.020Z",
        date: "2022-10-17T11:01:39.000Z",
        duration: 69,
        longDesc:
            '<p><strong>Yes, why not write in bold !</strong></p>\r\n<p><em>And when we have italics, why waste !</em></p>\r\n<p><img src="https://picsum.photos/seed/picsum/200/300" width="200" height="300"/></p>\r\n<p>magically, picture is also here !</p>',
        name: "A good Chapter",
        photo: "https://storage.googleapis.com/atmayogashala-3485c.appspot.com/Chapters/A%20good%20Chapter1666004499439/chapterCoverImage.jpg?GoogleAccessId=firebase-adminsdk-qobue%40atmayogashala-3485c.iam.gserviceaccount.com&Expires=4070889000&Signature=Rat2%2FcS1MD7ysA8EtCO5%2Fut%2FUXxp8SyRyQI8EpGTghwApMBLVGxjX7q%2FTzxBf1xC%2Bs5%2Bhg%2BlZ8etQFTOWIEGD%2FMgF%2Fa8FmeHpXevTbdREcfI0R9ji4nsn0uN44EeJX3Jyp%2BfyN3MZ%2B%2BTy4qzLh78dlK%2FSwfldBus0yPawT2lJcCG75SVQL9MRFCuADW9O0VWIubDmWci4sGeN8ZrjrHgWOJcMA%2BbEt7029SUArUFWmftfck4%2FSXYptZtjuNLMF2p89E14j7d748GCGblnZpwBdPKe6M1BawRENpro1kG2xsOCNBTOeWLaXaR2QYQEG1%2BDYVGZkZFmbKOxmCEeJXA8g%3D%3D",
        shortDesc: "Very good chapter to calm your itching when you're doing work for free all day long.",
        status: "success",
        tags: ["aman", "good"],
        video: "https://www.youtube.com/watch?v=tO01J-M3g0U",
        _id: "634d3617c12d53d6f1efe1c9",
    })

    useEffect(() => {
        console.log("Chapter component mounted");
        bring({ path: "/getAChapter?course=" + props.course + "&chapter=" + props.chapter, options: {method: "POST"} })
            .then((res) =>setChapter(res))
            .catch((err) => SnackbarUtils.error(err.message || "Some error Occurred"));
    }, [props.chapter]);
    return (
        <article>
            <div
                style={{
                    // maxWidth: "calc(100% - 32% - 200px)",
                    minWidth: "calc(100% - 32% - 400px)",
                    // width: "38%",
                    padding: "50px 15%",
                }}
            >
                <img src={chapter.cover} alt="cover" style={{ width: "100%" }} />
                <Typography variant="h4" color="initial">
                    {chapter.name}
                </Typography>
                <Typography variant="body" color="initial">
                    {chapter.shortDesc}
                </Typography>
                <br></br>
                <br></br>
                <Divider />
                <table>
                    <tbody>
                        <tr>
                            <td dangerouslySetInnerHTML={{ __html: chapter.longDesc }} />
                        </tr>
                    </tbody>
                </table>
                <img src={chapter.photo} alt="Chapter Description helper" style={{ width: "100%" }} />
                <div
                    style={{
                        float: "none",
                        clear: "both",
                        width: "100%",
                        position: "relative",
                        paddingBottom: "56.25%",
                        paddingTop: 25,
                        height: 0,
                    }}
                >
                    <iframe
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                        }}
                        title={chapter.name}
                        allow="fullscreen;"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        src={"https://www.youtube.com/embed/" + YouTubeGetID(chapter.video)}
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </article>
    )
}

export default Chapter