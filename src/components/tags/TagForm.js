import React, { useContext, useState, useRef } from "react";
import { Form, FormGroup, Row, Col } from "react-bootstrap";
import { TagContext } from "./TagProvider";
import NewTagButton from "./NewTagButton";

export default (props) => {
  const { createTag, tags } = useContext(TagContext);
  const [tag, setTag] = useState({label: ""})
  const tagNames = tags.map((t) => t.label.toLowerCase());

  const handleSubmitButtonPress = (e) => {
    e.preventDefault();
    if (
      !tagNames.includes(tag.label.toLowerCase().trim()) &&
      tag.label.trim().length
    ) {
      createTag(tag);
      tag.label = "";
    } else {
      alert("Please enter a valid tag name");
    }
  };

  const handleControlledInputChange = (e) => {
    const newTag = Object.assign({}, tag)
    newTag[e.target.name] = e.target.value
    setTag(newTag)
  }

  return (
    <Form onSubmit={handleSubmitButtonPress}>
      <Row>
        <Col sm="10">
          <FormGroup>
            <Form.Control
              type="text"
              placeholder="Enter a new tag name"
              name="label"
              value={tag.label}
              onChange={handleControlledInputChange}
            />
          </FormGroup>
        </Col>

        <Col sm="2">
          <NewTagButton />
        </Col>
      </Row>
    </Form>
  );
};
