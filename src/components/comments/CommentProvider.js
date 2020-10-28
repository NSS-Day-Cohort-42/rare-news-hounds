import React, { useState } from "react";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
  const [comments, setComments] = useState([]);

  const getCommentsByPostId = (post_id) => {
    return fetch(`http://localhost:8088/comments?post_id=${post_id}`)
      .then((res) => res.json())
      .then(setComments);
  };

  return (
    <CommentContext.Provider value={{ comments, getCommentsByPostId }}>
      {props.children}
    </CommentContext.Provider>
  );
};
