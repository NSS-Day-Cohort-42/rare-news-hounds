import React, { useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
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
        <h2 className="my-4 text-center">Existing Categories</h2>
        <Row className="justify-content-center">
          {categories.map((c) => (
            <Category category={c} key={c.id} />
          ))}
        </Row>
      </article>
    </>
  );
};
