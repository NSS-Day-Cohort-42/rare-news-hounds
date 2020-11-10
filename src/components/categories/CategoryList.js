import React, { useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Category from "./Category";
import { CategoryContext } from "./CategoryProvider";
import { Button, Col, ListGroup} from "react-bootstrap";
import { MdSettings } from "react-icons/md";
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
            <Row className="align-items-center">
              <Col xs="3">
                { c.label !== 'Uncategorized' && 
                  <Row>
                    <Col xs="6">
                      <Button className="border-0 bg-white text-dark" onClick={() => alert('edit not implemented')}>
                        <MdSettings style={{ fontSize: '36px' }} />
                      </Button>
                    </Col>

                    <Col xs="6">
                      <ConfirmableDeleteButton 
                        prompt="Are you sure you want to delete this category?" 
                        onDelete={() => deleteCategory(c.id)} />
                    </Col>
                  </Row>
                }
              </Col>

              <Col xs="9">
                <ListGroup key={c.id}>
                  <ListGroup.Item className="mb-2">
                  <Category category={c} key={c.id} />
      
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          ))}
      </article>
    </>
  );
};
