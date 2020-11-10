import React, { useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Category from "./Category";
import { CategoryContext } from "./CategoryProvider";
import { Button, Col, ListGroup} from "react-bootstrap";
import { ConfirmableDeleteButton } from "../posts/ConfirmableDeleteButton";


export default (props) => {
  const { categories, getCategories, deleteCategory } = useContext(CategoryContext);

  categories.sort((a,b)=> {
   const labelA = a.label.toUpperCase();
   const labelB = b.label.toUpperCase();
    if (labelA < labelB){
      return -1
    }
    if (labelA > labelB) {
      return 1
    }
    return 0
  })

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <article>
          {categories.map((c) => (
            <ListGroup key={c.id}>
              <ListGroup.Item className="mb-2">
              <Row>
                <Col className="mt-2">
              <Category category={c} key={c.id} />
              </Col>
              <Col className="d-flex justify-content-end m-2">
                <ConfirmableDeleteButton 
                  prompt="Are you sure you want to delete this category?" 
                  onDelete={() => deleteCategory(c.id)} />
                <Button>Edit</Button>
              </Col>
              </Row>
              </ListGroup.Item>
            </ListGroup>
          ))}
      </article>
    </>
  );
};
