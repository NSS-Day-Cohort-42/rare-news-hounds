import moment from "moment";
import React, { useContext, useState, useEffect } from "react";
import { Image, Badge, Row, Col, Button, Container } from "react-bootstrap";
import { ConfirmableDeleteButton } from "./ConfirmableDeleteButton";
import { PostContext } from "./PostProvider";
import EditPostButton from "./EditPostButton";
import "./PostDetail.css";
import { PostTagList } from "../postTags/PostTagList";
import ReactionList from "../reactions/ReactionList";
import PostReactions from "./PostReactions";
import { Link } from "react-router-dom";

export default (props) => {
  const { getPostById, deletePost, getPosts } = useContext(PostContext);
  const [post, setPost] = useState({ category: {}, user: {} });
  const currentUser = parseInt(localStorage.getItem("rare_user_id"));
  const date = moment(post.publication_time).format("dddd, MMMM Do YYYY");
  const userIsAdmin = localStorage.getItem("is_admin") ? true : false
  const handleDeleteButtonClick = () => {
    deletePost(post.id)
      .then(() => {
        getPosts();
      })
      .then(() => {
        props.history.goBack();
      });
  };

  const handleReaction = (postId) => {
    getPostById(postId).then(setPost);
  };

  useEffect(() => {
    const postId = parseInt(props.match.params.postId);
    getPostById(postId).then(setPost);
  }, []);

  return (
    <Container>
      <Row>
        <Col xl="8" lg="7" sm="12">
          <h2 className="postDetail__title font-weight-bold">{post.title}</h2>
        </Col>
        <Col xl="4" lg="5" sm="12">
          {((currentUser === post.user.id) || (userIsAdmin)) && (
            <Row className="justify-content-end">
              <ConfirmableDeleteButton onDelete={handleDeleteButtonClick} />
              <EditPostButton postId={post.id} />
              {(localStorage.getItem("is_admin") && post.approved) ? <div> Approved</div> : localStorage.getItem("is_admin") ?  <p>Not Approved</p> : <></>}
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
            <Badge variant="info">{post.category.label}</Badge>
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center my-4">
        <Image src={post.image_url} fluid />
      </Row>

      <Row>

        <Col className="d-flex justify-content-between align-items-center sm-6">
          <p className="postDetail__username">By: <Link to={`/profiles/${post.user.id}`}>{post.user.username}</Link></p>
          <Button
            variant="outline-dark"
            type="submit"
            className="ml-2"
            onClick={(e) => props.history.push(`/posts/${post.id}/comments`)}
          >
            View Comments
          </Button>
        </Col>

        <Col className="sm-6">
          {post.id && (
            <ReactionList
              postReactions={post.reactions}
              userReactions={post.user_reactions}
              postId={post.id}
              handleReaction={handleReaction}
            />
          )}
        </Col>
      </Row>
      <Row className="justify-content-center my-4">
        <p className="postDetail__content w-75">{post.content}</p>
      </Row>
      {post.id && <PostTagList postTags={post.tags} />}
    </Container>
  );
};
