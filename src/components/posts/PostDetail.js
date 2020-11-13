import moment from "moment";
import React, { useContext, useState, useEffect } from "react";
import { Image, Badge, Row, Col, Button } from "react-bootstrap";
import { ConfirmableDeleteButton } from "./ConfirmableDeleteButton";
import { PostContext } from "./PostProvider";
import EditPostButton from "./EditPostButton";
import { CommentList } from "../comments/CommentList";
import "./PostDetail.css";
import CommentForm from "../comments/CommentForm";
import { PostTagList } from "../postTags/PostTagList";

export default (props) => {
  const { getPostById, deletePost, getPosts } = useContext(PostContext);
  const [post, setPost] = useState({ category: {}, user: {} });
  const currentUser = parseInt(localStorage.getItem("rare_user_id"));
  const date = moment(post.publication_time).format("dddd, MMMM Do YYYY");
  const handleDeleteButtonClick = () => {
    deletePost(post.id)
      .then(() => {
        getPosts();
      })
      .then(() => {
        props.history.goBack();
      });
  };

  useEffect(() => {
    const postId = parseInt(props.match.params.postId);
    getPostById(postId).then(setPost);
  }, []);

  return (
    <div className="postDetail__Container">
 
      <Row className="title__Container">
      {currentUser === post.user.id && (
        <Row className="button__Container">
          <ConfirmableDeleteButton onDelete={handleDeleteButtonClick} />
          <EditPostButton postId={post.id} />
        </Row>
      )}
        <div className="postDetail__title">
          <h2>{post.title}</h2>
        </div>
      </Row>
           <div className="category__Container">
      <Badge variant="info">{post.category.label}</Badge>
      </div>
     <div className="postandcategory__Container">
        <div className="post__Container">
        {post.id && (
          <PostTagList className="postTags" postTags={post.tags} />
         )}
         </div>
    
      </div>
      <div className="image__Container">
     <Image className="img-Fluid" src={post.image_url}  />
      </div>
      <p className="userName__class">{post.user.username}</p>
      <div className="view__Comments">
        <Button
          variant="secondary"
          type="submit"
          className="ml-2"
          onClick={(e) => props.history.push(`/posts/${post.id}/comments`)}
        >
          View Comments
        </Button>
      </div>
      <Row className="postDetail__Content">
        <p >{post.content}</p>
      </Row>
    
    </div>
  );
};
