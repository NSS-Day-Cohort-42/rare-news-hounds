import React, { useContext, useRef } from "react";
import { Form, FormGroup, Row, Col } from "react-bootstrap";
import { CategoryContext } from "./CategoryProvider";
import NewCategoryButton from "./NewCategoryButton";

export default (props) => {
  const { createCategory, categories } = useContext(CategoryContext);
  const categoryNames = categories.map((c) => c.name.toLowerCase());
  const categoryRef = useRef("");
  const handleSubmitButtonPress = (e) => {
    e.preventDefault();
    if (
      !categoryNames.includes(categoryRef.current.value.toLowerCase().trim()) &&
      categoryRef.current.value.trim().length
    ) {
      const newCategory = {
        name: categoryRef.current.value,
      };
      createCategory(newCategory);
      categoryRef.current.value = "";
    } else {
      alert("Please enter a valid category name");
    }
  };

  return (
    <Form onSubmit={handleSubmitButtonPress}>
      <Row>
        <Col sm="10">
          <FormGroup>
            <Form.Control
              type="text"
              placeholder="Enter a new category name"
              ref={categoryRef}
            />
          </FormGroup>
        </Col>

        <Col sm="2">
          <NewCategoryButton />
        </Col>
      </Row>
    </Form>
  );
};
