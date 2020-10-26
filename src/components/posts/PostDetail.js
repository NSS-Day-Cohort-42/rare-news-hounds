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
          <p className="postDetail__title">{post.title}</p>
          <p className="postDetail__date">{date}</p>
          <p className="postDetail__username">{post.user.username}</p>
          <p className="postDetail__category">{post.category.name}</p>
      </header>
      <div className="postDetail__headerimage">
        <Image src={post.image} fluid />
      </div>
      <p>{post.content}</p>
      {currentUser === post.user_id && (
        <ConfirmableDeleteButton onDelete={handleDeleteButtonClick} />
      )}
    </div>
  );
};
