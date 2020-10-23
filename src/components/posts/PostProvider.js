import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = props => {
  const [ posts, setPosts ] = useState([]);

  const getPosts = () => {
    return fetch("http://localhost:8088/posts")
        .then(res => res.json())
        .then(setPosts)
}

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
  const deletePost = id => {
    return fetch(`http://localhost:8088/posts/${id}`, {
      method: "DELETE"
    })
  }

  return (
    <PostContext.Provider
      value={{
        posts, getPosts,
        getPostsByUserId,
        deletePost,
        createPost
      }}
    >
      {props.children}
    </PostContext.Provider>
  )
};