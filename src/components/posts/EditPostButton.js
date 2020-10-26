import React from "react"
import { useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"

export default (props) => {
    const history = useHistory()
   
    return (
        <Button onClick={evt => {
            evt.preventDefault()
            history.push(`/posts/edit/${props.postId}`)   
        }}>
            Edit Post
        </Button>
    )
}