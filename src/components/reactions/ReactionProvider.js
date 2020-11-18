import React, { useState } from "react";

export const ReactionContext = React.createContext();

export const ReactionProvider = (props) => {
  const [reactions, setReactions] = useState([]);

  const getReactions = () => {
    return fetch(`http://localhost:8000/reactions`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setReactions);
  };

  return (
      <ReactionContext.Provider value={{ reactions, getReactions }}>
      {props.children}
    </ReactionContext.Provider>
  );
};
