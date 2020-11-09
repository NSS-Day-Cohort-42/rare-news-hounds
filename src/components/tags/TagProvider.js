import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const [tags, setTags] = useState([]);

  const getTags = () => {
    return fetch(`http://localhost:8000/tags`)
      .then((res) => res.json())
      .then(setTags);
  };

  const createTag = (category) => {
    return fetch(`http://localhost:8000/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    }).then(getTags);
  };

  return (
    <TagContext.Provider
      value={{
        tags,
        getTags,
        createTag,
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
