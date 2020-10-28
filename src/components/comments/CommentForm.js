import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"

export default () => {
    const [comment, setComment] = useState({})

    const handleTextareaChange = (e) => {
        const newComment = Object.assign({}, comment)
        newComment[e.target.name] = e.target.value
    }
    
    const handleSubmitCommentClick = (e) => {
        e.preventDefault()
        alert(comment)
    }
    return (
        <Form>
            <Form.Control as="textarea" onChange={handleTextareaChange} value={comment.content} name='content'>
            </Form.Control>
            <Button type="submit" onClick={handleSubmitCommentClick}>WOOF</Button>
        </Form>
    )
}