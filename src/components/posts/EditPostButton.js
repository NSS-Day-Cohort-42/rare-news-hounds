import React from "react"
import { useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"

// This component will hold the edit button that will send the user 
// to a form to edit that selected post

//Create a function that will be called when clicked.
//it should pull in current post ID

//Create an edit button
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