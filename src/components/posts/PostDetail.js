import moment from "moment";
import React, { useContext, useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { PostContext } from "./PostProvider";

export default (props) => {
  const { getPostById } = useContext(PostContext);
  const [post, setPost] = useState({ category: {}, user: {} });

  useEffect(() => {
    const postId = parseInt(props.match.params.postId);
    getPostById(postId).then(setPost);
  }, []);

  return (
    <>
      <section>{moment(post.publication_time).format("dddd, MMMM Do YYYY, h:mm:ss a")}</section>
      <section>{post.title}</section>
      <section>{post.user.username}</section>
      <section>{post.category.name}</section>
      <section>{post.publication_time}</section>
      <Image src={post.image} />
      <section>{post.content}</section>
    </>
  );
};
