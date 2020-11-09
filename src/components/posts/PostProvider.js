import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = props => {
  const [posts, setPosts] = useState([]);
  
  const getPosts = () => {
    return fetch(`http://localhost:8000/posts`)
      .then(res => res.json())
      .then(setPosts);
  };

  const getPostById = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`)
      .then(res => res.json())
  };

  const getPostsByUserId = userId => {
    return fetch(`http://localhost:8000/posts?user_id=${userId}`)
      .then(res => res.json())
      .then(setPosts);
  };

  const getPostsByCategoryId = categoryId => {
    return fetch(`http://localhost:8000/posts?category_id=${categoryId}`)
      .then(res => res.json())
      .then(setPosts);
  };

  const createPost = (post) => {
    return fetch(`http://localhost:8000/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(res => res.json())
      .then((newPost) => {
        getPosts()
        return newPost
      });
  };

  const updatePost = (id, post) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
  }

  const deletePost = id => {
    return fetch(`http://localhost:8000/posts/${id}`, {
      method: "DELETE"
    })
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        getPosts,
        getPostById,
        getPostsByUserId,
        deletePost,
        createPost,
        updatePost,
        getPostsByCategoryId
      }}
    >
      {props.children}
    </PostContext.Provider>
  )
};