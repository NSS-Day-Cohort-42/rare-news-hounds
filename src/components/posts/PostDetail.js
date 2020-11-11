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
    <div className="postDetail">
      <Row>
        <Col xl="8" lg="7" sm="12">
          <h2 className="postDetail__title font-weight-bold">{post.title}</h2>
        </Col>
        <Col xl="4" lg="5" sm="12">
          {currentUser === post.user.id && (
            <Row className="justify-content-end">
              <ConfirmableDeleteButton onDelete={handleDeleteButtonClick} />
              <EditPostButton postId={post.id} />
            </Row>
          )}
        </Col>
      </Row>

      <Row className="justify-content-between">
        <Col>
          <p className="postDetail__username">{post.user.username}</p>
          <p className="postDetail__date">{date}</p>
        </Col>
        <Col className="d-flex justify-content-end">
          <p className="postDetail__category">
            <Badge variant="info">{post.category.label}</Badge>
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center my-4">
        <Image src={post.image} fluid />
      </Row>
      <Row className="justify-content-center my-4">
        <Button
          variant="secondary"
          type="submit"
          className="ml-2"
          onClick={(e) => props.history.push(`/posts/${post.id}/comments`)}
        >
          View Comments
        </Button>
      </Row>
      <Row className="justify-content-center my-4">
        <p className="postDetail__content w-75">{post.content}</p>
      </Row>
      {post.id && (
        <PostTagList postTags={post.tags}/>
      )}
    </div>
  );
};
