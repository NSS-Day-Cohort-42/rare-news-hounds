import React, { useContext, useRef } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { CategoryContext } from "./CategoryProvider";
import NewCategoryButton from "./NewCategoryButton";

export default (props) => {
    const {createCategory} = useContext(CategoryContext)
    const categoryRef = useRef("")  
    const handleSubmitButtonPress = (e) => {
        e.preventDefault()
        const newCategory = {
            name: categoryRef.current.value
        }
        createCategory(newCategory)
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
