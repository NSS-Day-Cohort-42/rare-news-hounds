import React, { useContext, useRef } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { TagContext } from "./TagProvider";
import NewTagButton from "./NewTagButton";

export default (props) => {
    const {createTag} = useContext(TagContext)
    const tagRef = useRef("")  
    const handleSubmitButtonPress = (e) => {
        e.preventDefault()
        const newTag = {
            name: tagRef.current.value
        }
        createTag(newTag)
        tagRef.current.value = ""
    }    

return (
  <Form>
    <FormGroup>
      <Form.Label>Tag</Form.Label>
          <Form.Control type="text" placeholder="Enter a new tag name" ref={tagRef}/>
        </FormGroup>
        <NewTagButton action={handleSubmitButtonPress} />
    </Form>
)
};
