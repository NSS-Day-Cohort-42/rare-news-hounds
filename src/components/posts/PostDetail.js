import moment from "moment";
import React, { useContext, useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { ConfirmableDeleteButton } from "./ConfirmableDeleteButton";
import { PostContext } from "./PostProvider";

export default (props) => {
  const { getPostById, deletePost } = useContext(PostContext);
  const [post, setPost] = useState({ category: {}, user: {} });

  useEffect(() => {
    const postId = parseInt(props.match.params.postId);
    getPostById(postId).then(setPost);
  }, []);

  const currentUser = localStorage.getItem("rare_user_id");
  const date = moment(post.publication_time).format(
    "dddd, MMMM Do YYYY, h:mm:ss a"
  );

  return (
    <>
      <section>{date}</section>
      <section>{post.title}</section>
      <section>{post.user.username}</section>
      <section>{post.category.name}</section>
      <Image src={post.image} />
      <section>{post.content}</section>
          <ConfirmableDeleteButton onDelete={() => {
              deletePost(post.id).then()
          }}/>
    </>
  );
};
