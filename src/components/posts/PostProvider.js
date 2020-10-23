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
        deletePost
      }}
    >
      {props.children}
    </PostContext.Provider>
  )
};