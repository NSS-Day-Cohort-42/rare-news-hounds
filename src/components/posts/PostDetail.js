import React, { useContext, useState, useEffect } from "react";
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
          <section>{post.category.name}</section>
    </>
  );
};
