import React, { useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Category from "./Category";
import { CategoryContext } from "./CategoryProvider";
import { Button, Col, ListGroup} from "react-bootstrap";
import { MdSettings } from "react-icons/md";
import { ConfirmableDeleteButton } from "../posts/ConfirmableDeleteButton";
import { ConfirmableEditCategoryButton} from "../categories/ConfirmableEditCategoryButton";

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
            <Row key={c.id} className="align-items-center">
              <Col xs="3">
                { c.label !== 'Uncategorized' && 
                  <Row>
                    <Col xs="6">
                    <ConfirmableEditCategoryButton category={c} />
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
                    <h3>
                      <Category category={c} />
                    </h3>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          ))}
      </article>
    </>
  );
};
