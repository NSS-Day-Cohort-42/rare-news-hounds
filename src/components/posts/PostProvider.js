import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = props => {
  const [ posts, setPosts ] = useState([]);

  const getPostsByUserId = userId => {
    return fetch(`http://localhost:8088/posts?user_id=${userId}`)
      .then(res => res.json())
      .then(setPosts);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        getPostsByUserId
      }}
    >
      {props.children}
    </PostContext.Provider>
  )
};