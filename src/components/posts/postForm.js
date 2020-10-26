import React, { useContext, useEffect, useRef, useState } from "react"
import moment from 'moment';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
// import NewPostButton from "./NewPostButton";
import { CategoryContext } from "../categories/CategoryProvider";
import { PostContext } from "./PostProvider";

export const PostForm = (props) => {
    const {createPost, updatePost, getPostById} = useContext(PostContext)
    const {categories, getCategories} = useContext(CategoryContext)

    const titleRef = useRef("")
    const categoryRef = useRef("")
    const imageRef = useRef("")
    const contentRef = useRef("")
    const publicationRef = useRef("")

    const isEditMode = props.match.params.hasOwnProperty("post_id")

    useEffect(()=>{
        getCategories().then(() => {
          if(isEditMode) {
            getPostById(props.match.params.post_id)
              .then(populateFormValues)
          }
        })
    },[])

    const populateFormValues = post => {
      titleRef.current.value = post.title
      categoryRef.current.value = post.category_id
      imageRef.current.value = post.image
      contentRef.current.value = post.content
      publicationRef.current.value = moment(post.publication_time + 86400000).format(
        "YYYY-MM-DD"
      );
    }

    const constructNewPost = () => {
        if (titleRef.current.value === "") {
            window.alert("Please fill in a title")
        } else if(categoryRef.current.value === '0') {
            window.alert("Please select a category")
        } else if (publicationRef.current.value === "") {
            window.alert("Please select a publication date")
        }/*else if (imageRef.current.value === "") {
            window.alert("Please add an image URL")
        }*/else if (contentRef.current.value === "") {
            window.alert("Please fill out content")
        } else {
          // validation success - create a new object from the form inputs and then either save or update it
          const newPostObject = {
            user_id: localStorage.getItem('rare_user_id'),
            title: titleRef.current.value,
            category_id: categoryRef.current.value,
            image: imageRef.current.value,
            content: contentRef.current.value,
            publish_status: true,
            approve_status: true,
            publication_time: publicationRef.current.valueAsNumber
          }

          if(isEditMode) {
            updatePost(props.match.params.post_id, newPostObject)
          }
          else {
            newPostObject.creation_time = Date.now()
            createPost(newPostObject)
            .then((newPost) => props.history.push(`/posts/${newPost.id}`))
          }
        }
    }

    return (
        <Form>
            <FormGroup controlId ="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" ref={titleRef} />
            </FormGroup>
            <FormGroup controlId="categorySelect">
            <Form.Label>Categories</Form.Label>
                <Form.Control as="select" ref={categoryRef}>
                <option value ="0">Select a category</option>
                {categories.map(c => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
                </Form.Control>
            </FormGroup>
            <FormGroup>
                <Form.Label>Publish Date:</Form.Label>
                <Form.Control type="date" ref={publicationRef} disabled={isEditMode} /> 
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