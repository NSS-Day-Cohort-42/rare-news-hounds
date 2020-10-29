import React, { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { CommentContext } from "./CommentProvider"


export default ({postId}) => {
    const [comment, setComment] = useState({content:""})
    const { createComment } = useContext(CommentContext)

    const handleTextareaChange = (e) => {
        const stateComment = Object.assign({}, comment)
        stateComment[e.target.name] = e.target.value
        setComment(stateComment)
    }
    
    const handleSubmitCommentClick = (e) => {
        e.preventDefault()
        if (comment.content.trim().length) {
            const newComment = {
                content: comment.content,
                post_id: postId,
                timestamp: Date.now(),
                user_id: parseInt(localStorage.getItem("rare_user_id"))
            }
            createComment(newComment)
            const clearedComment = Object.assign({}, comment)
            clearedComment.content = ""
            setComment(clearedComment)
        }
        else alert('Please enter a doggone MESSAGE')
    } 
    
    return (
        <Form>
            <Form.Control as="textarea" onChange={handleTextareaChange} value={comment.content} name='content' placeholder="Who's a good boyyyy?">
            </Form.Control>
            <Button type="submit" onClick={handleSubmitCommentClick}>WOOF</Button>
        </Form>
    )
}