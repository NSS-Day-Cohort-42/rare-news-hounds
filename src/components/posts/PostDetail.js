import moment from "moment";
import React, { useContext, useState, useEffect } from "react";
import { Image, Badge, Row, Col } from "react-bootstrap";
import { ConfirmableDeleteButton } from "./ConfirmableDeleteButton";
import { PostContext } from "./PostProvider";
import { PostTagManager } from "../postTags/PostTagManager";
import EditPostButton from "./EditPostButton";
import { CommentList } from "../comments/CommentList";
import "./PostDetail.css";
import CommentForm from "../comments/CommentForm";

export default (props) => {
  const { getPostById, deletePost, getPosts } = useContext(PostContext);
  const [post, setPost] = useState({ category: {}, user: {} });
  const currentUser = parseInt(localStorage.getItem("rare_user_id"));
  const date = moment(post.publication_time + 86400000).format(
    "dddd, MMMM Do YYYY"
  );
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
    getPostById(postId)
      .then(setPost)
  }, []);

  return (
    <div className="postDetail">
      <Row >
        <Col xl="8" lg="7" sm="12">
          <h2 className="postDetail__title font-weight-bold">{post.title}</h2>
          <p className="postDetail__username">{post.user.username}</p>
        </Col>
        <Col xl="4" lg="5" sm="12">
          {currentUser === post.user_id && (
            <Row className="justify-content-end">
              <ConfirmableDeleteButton onDelete={handleDeleteButtonClick} />
              <EditPostButton postId={post.id} />
            </Row>
          )}
        </Col>
      </Row>

      <Row className="justify-content-between">
        <Col>
          <p className="postDetail__date">{date}</p>
        </Col>
        <Col className="d-flex justify-content-end">
          <p className="postDetail__category">
            <Badge variant="info">{post.category.name}</Badge>
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center my-4">
        <Image src={post.image} fluid />
      </Row>
      <Row className="justify-content-center my-4">
        <p className="postDetail__content w-75">{post.content}</p>
      </Row>

      { post.id && 
        <>
          <PostTagManager postId={post.id} isPostAuthor={currentUser === post.user_id} /> 

          <h3 className="text-center my-3">Comments</h3>
          <Row className="w-50 mx-auto my-4">
            <CommentList postId={post.id} />
          </Row>

          <Row className="w-50 m-auto">
            <CommentForm postId={post.id} />
          </Row>
        </>
      }
    </div>
  );
};
