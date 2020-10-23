import React, { useContext, useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { PostTagForm } from "../postTags/PostTagForm";
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
          <section>{post.title}</section>
          <section>{post.user.username}</section>
          <section>{post.category.name}</section>
          <section>{post.publication_time}</section>
          <Image src={post.image}/>
          <section>{post.content}</section>
					<PostTagForm postId={post.id} />
    </>
  );
};
