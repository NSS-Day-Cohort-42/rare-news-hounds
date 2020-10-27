import React, { useContext, useRef } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { CategoryContext } from "./CategoryProvider";
import NewCategoryButton from "./NewCategoryButton";

export default (props) => {
  const { createCategory, categories } = useContext(CategoryContext);
  const categoryNames = categories.map((c) => c.name);
  const categoryRef = useRef("");
  const handleSubmitButtonPress = (e) => {
    if (categoryRef.current.value) e.preventDefault();
    const newCategory = {
      name: categoryRef.current.value,
    };
    createCategory(newCategory);
    categoryRef.current.value = "";
  };

  return (
    <>
      <Form>
        <FormGroup>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a new category name"
            ref={categoryRef}
          />
        </FormGroup>
              <NewCategoryButton action={handleSubmitButtonPress} />
              <section>{categoryNames.map(cn => <div>{cn}</div> )}</section>
      </Form>
    </>
  );
};
