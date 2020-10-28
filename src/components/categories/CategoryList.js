import React, { useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Category from "./Category";
import { CategoryContext } from "./CategoryProvider";
import { Button, Container, Col} from "react-bootstrap";
import { ConfirmableDeleteButton } from "../posts/ConfirmableDeleteButton";
// import "./Category.css"

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
        <Container fluid>

          {categories.map((c) => (
            <>
            <Row className="">
              <Col>
            <Category category={c} key={c.id} />
            </Col>
            
            <Col className="d-flex justify-content-end mb-3">
              <ConfirmableDeleteButton />
              <Button classname="mb-1">Edit</Button>
            </Col>
            </Row>
            </>
          ))}

        </Container>
      </article>
    </>
  );
};
