import React, { useState } from "react";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
  const [comments, setComments] = useState([]);

  const getCommentsByPostId = (post_id) => {
    return fetch(`http://localhost:8088/comments?post_id=${post_id}`)
      .then((res) => res.json())
      .then(setComments);
  };

  // delete the comment with the given id, then fetch comments for given post id and update state
  const deleteComment = (comment_id, post_id) => {
    return fetch(`http://localhost:8088/comments/${comment_id}`, {
      method: "DELETE"
    })
      .then(() => getCommentsByPostId(post_id))
  }

  return (
    <CommentContext.Provider value={{ comments, getCommentsByPostId, deleteComment }}>
      {props.children}
    </CommentContext.Provider>
  );
};
