import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    return fetch(`http://localhost:8000/posts`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_token")}`,
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then(setPosts);
  };

  const getPostById = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_token")}`,
        "Content-Type": "application/json",
      }
    })
      .then((res) =>
        res.json()
      );
  };

  const getPostsByUserId = (userId) => {
    return fetch(`http://localhost:8000/posts?user_id=${userId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_token")}`,
        "Content-Type": "application/json",
      }
    }
    )
      .then((res) => res.json())
      .then(setPosts);
  };

  const getPostsByCategoryId = (category_id) => {
    return fetch(`http://localhost:8000/posts?category_id=${category_id}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then(setPosts);
  };

  const getSubscribedPosts = () => {
    return fetch('http://localhost:8000/posts?subscribed=true', {
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
      }
    })
      .then(res => res.json())
      .then(setPosts);
  };

  const createPost = (post) => {
    return fetch(`http://localhost:8000/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((newPost) => {
        getPosts();
        return newPost;
      });
  };

  const updatePost = (id, post) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
      },
      body: JSON.stringify(post),
    });
  };

  const deletePost = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
      },

    });
  };

  const updatePostApproval = (id, approved) => {
    const updateObject = { approved }

    return fetch(`http://localhost:8000/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
      },
      body: JSON.stringify(updateObject)
    })
      .then(getPosts)
  }

  const addReaction = (reactionId, postId) => {
    return fetch(`http://localhost:8000/posts/${postId}/reaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
      },
      body: JSON.stringify({"reaction_id": reactionId})
    })
  }

  const deleteReaction = (reactionId, postId) => {
    return fetch(`http://localhost:8000/posts/${postId}/reaction`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
      },
      body: JSON.stringify({"reaction_id": reactionId})
    })
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        getPosts,
        getPostById,
        getPostsByUserId,
        getSubscribedPosts,
        deletePost,
        createPost,
        updatePost,
        getPostsByCategoryId,
        updatePostApproval,
        addReaction,
        deleteReaction
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
