import React, { useContext, useEffect, useRef, useState } from "react"
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import { CategoryContext } from "../categories/CategoryProvider";
import { PostContext } from "./PostProvider";
import CancelEditButton from "./CancelEditButton";
import { Row } from "react-bootstrap";
import { PostTagForm } from "../postTags/PostTagForm";

export const PostForm = (props) => {
    const {createPost, updatePost, getPostById} = useContext(PostContext)
    const {categories, getCategories} = useContext(CategoryContext)
    const [ selectedPostTags, setSelectedPostTags ] = useState([])

    const titleRef = useRef("")
    const categoryRef = useRef("")
    const imageRef = useRef("")
    const contentRef = useRef("")
    

    const isEditMode = props.match.params.hasOwnProperty("postId")

    useEffect(()=>{
        getCategories().then(() => {
          if(isEditMode) {
            getPostById(props.match.params.postId)
              .then(populateFormValues)
          }
        })
    },[])

    const populateFormValues = post => {
      titleRef.current.value = post.title
      categoryRef.current.value = post.category_id
      imageRef.current.value = post.image_url
      contentRef.current.value = post.content

      
     
    }

    const onTogglePostTag = (changedTagId) => {
      let newSelectedPostTags = [];
      //check if the tag is already in the list of selected tags
      if (selectedPostTags.some((tagId) => tagId === changedTagId)) {
        // Remove the id of the tag from the list of selected tags
        newSelectedPostTags = selectedPostTags.filter(
          (tagId) => tagId !== changedTagId
        );
      } else {
        // Add the tag to the list of selected tags
        selectedPostTags.push(changedTagId);
        // Copy the selected tags array to a new variable so that state will update correctly
        newSelectedPostTags = selectedPostTags.slice();
      }
      // Set component state, which will cause the component to re-render
      setSelectedPostTags(newSelectedPostTags);
    };

    const constructNewPost = () => {
        if (titleRef.current.value === "") {
            window.alert("Please fill in a title")
        } else if(categoryRef.current.value === '0') {
            window.alert("Please select a category")
        
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
            image_url: imageRef.current.value,
            content: contentRef.current.value,
            postTags: selectedPostTags,
            publish_status: true,
            approve_status: true,
            
          }

          if(isEditMode) {
            updatePost(props.match.params.postId, newPostObject)
              .then(() => props.history.push(`/posts/${props.match.params.postId}`))
          }
          else {
            createPost(newPostObject)
              .then((newPost) => props.history.push(`/posts/${newPost.id}`))
          }
        }
    }

    return (
        <Form>
            <h1 className="text-center my-4">
              { isEditMode ? "Edit Post" : "Create New Post" }
            </h1>
            <FormGroup controlId ="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" ref={titleRef} />
            </FormGroup>
            <FormGroup controlId ="text">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" placeholder="Image Url" ref={imageRef} />
            </FormGroup>
            <FormGroup controlId ="text">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter post..." ref={contentRef} />
            </FormGroup>
            <FormGroup controlId="categorySelect">
            <Form.Label>Category</Form.Label>
                <Form.Control as="select" ref={categoryRef}>
                <option value ="0">Select a category</option>
                {categories.map(c => (
                    <option key={c.id} value={c.id}>
                        {c.label}
                    </option>
                ))}
                </Form.Control>
            </FormGroup>
            <PostTagForm selectedPostTags={selectedPostTags} onTogglePostTag={onTogglePostTag} />
            <Row className="justify-content-end">
                {isEditMode && <CancelEditButton action={props}/>}
                <Button variant="success" 
                    type="submit" 
                    className="ml-2"
                    onClick={e=> {
                        e.preventDefault()
                        constructNewPost()
                    }}>Save Post</Button>
            </Row>
        </Form>    
    )

}