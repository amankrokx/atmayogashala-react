import React from "react"
import RichTextEditor from "react-rte"

// some things inside RTE are just for styling, delete the id's etc.

export default function BodyTextEditor({ values, setValues }) {
    const [editorValue, setEditorValue] = React.useState(RichTextEditor.createValueFromString(values.longDesc, "html"))

    const handleChange = value => {
        setEditorValue(value)
        setValues({...values, longDesc: value.toString("html")})
    }


    return <RichTextEditor value={editorValue} onChange={handleChange} required multiline variant="filled" style={{ minHeight: 410 }} />
}
