import React, { useContext, useRef } from "react";
import { Form, FormGroup, Row, Col } from "react-bootstrap";
import { TagContext } from "./TagProvider";
import NewTagButton from "./NewTagButton";

export default (props) => {
  const { createTag, tags } = useContext(TagContext);
  const tagNames = tags.map((t) => t.name.toLowerCase());
  const tagRef = useRef("");
  const handleSubmitButtonPress = (e) => {
    e.preventDefault();
    if (
      !tagNames.includes(tagRef.current.value.toLowerCase().trim()) &&
      tagRef.current.value.trim().length
    ) {
      const newTag = {
        name: tagRef.current.value,
      };
      createTag(newTag);
      tagRef.current.value = "";
    } else {
      alert("Please enter a valid tag name");
    }
  };

  return (
    <Form onSubmit={handleSubmitButtonPress}>
      <Row>
        <Col sm="10">
          <FormGroup>
            <Row>
              <Form.Label column sm="1" className="text-right">Tag</Form.Label>
              <Col sm="11">
                <Form.Control
                  type="text"
                  placeholder="Enter a new tag name"
                  ref={tagRef}
                />
              </Col>
            </Row>
          </FormGroup>
        </Col>

        <Col sm="2">
          <NewTagButton />
        </Col>
      </Row>
    </Form>
  );
};
