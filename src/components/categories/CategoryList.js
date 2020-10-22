import React, { useContext, useEffect } from "react";
import Category from "./Category";
import { CategoryContext } from "./CategoryProvider";

export default (props) => {
  const { categories, getCategories } = useContext(CategoryContext);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <article>
        {categories.map((c) => (
          <Category category={c} key={c.id} />
        ))}
      </article>
    </>
  );
};
