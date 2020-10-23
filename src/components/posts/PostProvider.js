import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = props => {
  const [ posts, setPosts ] = useState([]);


  const getPostsByUserId = userId => {
    return fetch(`http://localhost:8088/posts?user_id=${userId}`)
      .then(res => res.json())
      .then(setPosts);
  };

  const createPost = (post) => {
    return fetch(`http://localhost:8088/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(getPosts);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        getPostsByUserId,
        getPosts,
        createPost
      }}
    >
      {props.children}
    </PostContext.Provider>
  )
};