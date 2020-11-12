import React, { useState } from "react";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
  const [comments, setComments] = useState([]);


  const getCommentsByPostId = (post_id) => {
    return fetch(`http://localhost:8000/comments?post_id=${post_id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
        }
    })
        .then(response => response.json())
        .then(setComments)
}

  const createComment = (newComment) => {
    return fetch(`http://localhost:8000/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
      },
      body: JSON.stringify(newComment),
    }).then(() => {
      getCommentsByPostId(newComment.post_id);
    });
  };

  const deleteComment = (comment_id, post_id) => {
    return fetch(`http://localhost:8000/comments/${comment_id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
      }
    }).then(() => getCommentsByPostId(post_id));
  };

  const updateComment = (comment, postId) => {
    return fetch(`http://localhost:8000/comments/${comment.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    }).then(() => getCommentsByPostId(postId))
  }

  return (
    <CommentContext.Provider
      value={{ comments, getCommentsByPostId, createComment, deleteComment, updateComment }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};
