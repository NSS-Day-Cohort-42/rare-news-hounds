import React, { useRef } from "react";
import { Form, FormGroup } from "react-bootstrap";
import NewCategoryButton from "./NewCategoryButton";

export default (props) => {
    const categoryRef = useRef("")  
    const handleSubmitButtonPress = (e) => {
        e.preventDefault()
        alert('this will submit a new category')
    }    

return (
  <Form>
    <FormGroup>
      <Form.Label>Category</Form.Label>
          <Form.Control type="text" placeholder="Enter a new category name" ref={categoryRef}/>
        </FormGroup>
        <NewCategoryButton action={handleSubmitButtonPress} />
    </Form>
)
};
