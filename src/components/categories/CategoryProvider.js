import React, { useState } from "react";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    return fetch(`http://localhost:8000/categories`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
      }
    })
      .then((res) => res.json())
      .then(setCategories);
  };

  const createCategory = (category) => {
    return fetch(`http://localhost:8000/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
      },
      body: JSON.stringify(category),
    }).then(getCategories);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        getCategories,
        createCategory,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
