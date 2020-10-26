import moment from "moment";
import React, { useContext, useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { ConfirmableDeleteButton } from "./ConfirmableDeleteButton";
import { PostContext } from "./PostProvider";
import "./PostDetail.css";

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
    getPostById(postId).then(setPost);
  }, []);

  return (
    <div className="postDetail">
      <header className="postDetail--header">
        {date}
        <div>{post.title}</div>
        <div>{post.user.username}</div>
        <div>{post.category.name}</div>
      </header>
      <Image src={post.image} fluid />
      <div>{post.content}</div>
      {currentUser === post.user_id && (
        <ConfirmableDeleteButton onDelete={handleDeleteButtonClick} />
      )}
    </div>
  );
};
