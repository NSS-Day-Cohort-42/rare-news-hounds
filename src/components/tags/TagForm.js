import React, { useContext, useRef } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { TagContext } from "./TagProvider";
import NewTagButton from "./NewTagButton";

export default (props) => {
  const { createTag, tags } = useContext(TagContext);
  const tagNames = tags.map((t) => t.name.toLowerCase());
  const tagRef = useRef("");
  const handleSubmitButtonPress = (e) => {
    if (
      !tagNames.includes(tagRef.current.value.toLowerCase().trim()) &&
      tagRef.current.value.trim().length
    ) {
      e.preventDefault();
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
    <Form>
      <FormGroup>
        <Form.Label>Tag</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a new tag name"
          ref={tagRef}
        />
      </FormGroup>
      <NewTagButton action={handleSubmitButtonPress} />
    </Form>
  );
};
