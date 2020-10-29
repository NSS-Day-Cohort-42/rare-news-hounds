import React, { useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Category from "./Category";
import { CategoryContext } from "./CategoryProvider";
import { Button, Col, ListGroup} from "react-bootstrap";
import { ConfirmableDeleteButton } from "../posts/ConfirmableDeleteButton";


export default (props) => {
  const { categories, getCategories } = useContext(CategoryContext);

  categories.sort((a,b)=> {
   const nameA = a.name.toUpperCase();
   const nameB = b.name.toUpperCase();
    if (nameA < nameB){
      return -1
    }
    if (nameA > nameB) {
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
        <h2 className="my-4 text-center">Existing Categories</h2>
          {categories.map((c) => (
            <ListGroup>
              <ListGroup.Item className="mb-2">
              <Row>
                <Col className="mt-2">
              <Category category={c} key={c.id} />
              </Col>
              <Col className="d-flex justify-content-end m-2">
                <ConfirmableDeleteButton onDelete={() => alert('delete not implemented')} />
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
