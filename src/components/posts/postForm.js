import React, { useContext, useRef } from "react"
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import NewPostButton from "./NewPostButton";
import { CategoryContext } from "../categories/CategoryProvider";
import { PostContext } from "./PostProvider";
export const PostForm = (props) => {
    const {createPost} = useContext(PostContext)
    const {categories, getCategories} = useContext(CategoryContext)
    const categoryRef = useRef("")
    const handleSubmitButtonPress = (e) => {
        e.preventDefault()
        const newPost = {
            user_id: categoryRef.localStorage.getItem('rare_user_id'),

        }
    }

    return (
        <Form>
            <FormGroup controlId ="email">
                <Form.Label>Title</Form.Label>
                <Form.Control as="text" placeholder="Enter Title" />
            </FormGroup>
            <Form.Group controlId="categorySelect">
            <Form.Label>Categories</Form.Label>
                <Form.Control as="select">
                <select value ="0">Select a category</select>
                {categories.mao(c => (
                    <select key={c.id} value={c.id}>
                        {c.name}
                    </select>
                ))}
                </Form.Control>
            </Form.Group>
            <FormGroup>
                <Form.Label>Publish Date:</Form.Label>
                <Form.Control type="date" /> 
            </FormGroup>
            <FormGroup controlId ="Email">
                <Form.Label>Image</Form.Label>
                <Form.Control as="Text" placeholder="Image Url" />
            </FormGroup>
            <FormGroup controlId ="Email">
                <Form.Label>Content</Form.Label>
                <Form.Control as="Textarea" rows={3} placeholder="Enter post..." />
            </FormGroup>
            <NewPostButton />
        </Form>    
    )

}