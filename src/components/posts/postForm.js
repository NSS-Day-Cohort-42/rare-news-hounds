import React, { useContext, useEffect, useRef } from "react"
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
// import NewPostButton from "./NewPostButton";
import { CategoryContext } from "../categories/CategoryProvider";
import { PostContext } from "./PostProvider";
export const PostForm = (props) => {
    const {createPost} = useContext(PostContext)
    const {categories, getCategories} = useContext(CategoryContext)
    

    const titleRef = useRef("")
    const categoryRef = useRef("")
    const imageRef = useRef("")
    const contentRef = useRef("")
    const publicationRef = useRef("")
    const constructNewPost = () => {

        
        if (titleRef.current.value === "") {
            window.alert("Please fill in a title")
        } else if(categoryRef.current.value === '0') {
            window.alert("Please select a category")
        } else if (publicationRef.current.value === "") {
            window.alert("Please select a puplication date")
        }/*else if (imageRef.current.value === "") {
            window.alert("Please add an image URL")
        }*/else if (contentRef.current.value === "") {
            window.alert("Please fill out content")
        } else {
        createPost({
            user_id: localStorage.getItem('rare_user_id'),
            title: titleRef.current.value,
            category_id: categoryRef.current.value,
            image: imageRef.current.value,
            content: contentRef.current.value,
            publish_status: true,
            approve_status: true,
            publication_time: publicationRef.current.valueAsNumber,
            creation_time: Date.now()

        })
        .then((newPost) => props.history.push(`/posts/${newPost.id}`))
    }
    }

    useEffect(()=>{
        getCategories()
    },[])

    return (
        <Form>
            <FormGroup controlId ="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" ref={titleRef} />
            </FormGroup>
            <Form.Group controlId="categorySelect">
            <Form.Label>Categories</Form.Label>
                <Form.Control as="select" ref={categoryRef}>
                <option value ="0">Select a category</option>
                {categories.map(c => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
                </Form.Control>
            </Form.Group>
            <FormGroup>
                <Form.Label>Publish Date:</Form.Label>
                <Form.Control type="date" ref={publicationRef}/> 
            </FormGroup>
            <FormGroup controlId ="text">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" placeholder="Image Url" ref={imageRef} />
            </FormGroup>
            <FormGroup controlId ="text">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter post..." ref={contentRef} />
            </FormGroup>
            <Button type="submit" 
            onClick={e=> {
                e.preventDefault()
                constructNewPost()
            }}>Save Post</Button>
        </Form>    
    )

}