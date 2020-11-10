import React, { useContext, useRef } from "react";
import { Form, FormGroup, Row, Col } from "react-bootstrap";
import { CategoryContext } from "./CategoryProvider";
import NewCategoryButton from "./NewCategoryButton";

export default (props) => {
  const { createCategory, categories } = useContext(CategoryContext);
  const categoryLabels = categories.map((c) => c.label.toLowerCase());
  const categoryRef = useRef("");

  const handleSubmitButtonPress = (e) => {
    e.preventDefault();
    if (
      !categoryLabels.includes(categoryRef.current.value.toLowerCase().trim()) &&
      categoryRef.current.value.trim().length
    ) {
      const newCategory = {
        label: categoryRef.current.value,
      };
      createCategory(newCategory);
      categoryRef.current.value = "";
    } else {
      alert("Please enter a valid category name");
    }
  };

  return (
    <Form onSubmit={handleSubmitButtonPress} className="my-4">
      <Row className="flex-column">
          <FormGroup>
            <Form.Control
              className="w-75 mx-auto"
              type="text"
              placeholder="Add text"
              ref={categoryRef}
            />
          </FormGroup>

          <NewCategoryButton />
      </Row>
    </Form>
  );
};
