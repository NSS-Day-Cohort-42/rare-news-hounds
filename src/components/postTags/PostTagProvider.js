import React, { useState, createContext } from "react";

export const PostTagContext = createContext();

export const PostTagProvider = (props) => {
  const getPostTagsByPostId = (postId) => {
    return fetch(`http://localhost:8000/posttags?postId=${postId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_token")}`,
        "Content-Type": "application/json",
      }
    }).then((res) => res.json());
  };

  const addPostTag = (postTag) => {
    return fetch("http://localhost:8000/posttags", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postTag),
    });
  };

  const deletePostTag = (postTagId) => {
    return fetch(`http://localhost:8000/posttags/${postTagId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_token")}`,
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <PostTagContext.Provider
      value={{
        getPostTagsByPostId,
        addPostTag,
        deletePostTag,
      }}
    >
      {props.children}
    </PostTagContext.Provider>
  );
};
