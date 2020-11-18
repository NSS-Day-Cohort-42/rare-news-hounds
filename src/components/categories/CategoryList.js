import React, { useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Category from "./Category";
import { CategoryContext } from "./CategoryProvider";
import { Button, Col, ListGroup} from "react-bootstrap";
import { MdSettings } from "react-icons/md";
import { ConfirmableDeleteButton } from "../posts/ConfirmableDeleteButton";
import { ConfirmableEditCategoryButton} from "../categories/ConfirmableEditCategoryButton";
import { Link } from "react-router-dom";

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
          {categories.map((c) => {
            const canEditAndDelete = localStorage.getItem('is_admin') &&
              c.label !== 'Uncategorized'

            return (
              <Row key={c.id} className="align-items-center">
                { canEditAndDelete &&
                  <Col xs="3">
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
                    
                  </Col>
                }

                <Col xs={canEditAndDelete ? "9" : "12"}>
                  <ListGroup key={c.id}>
                    <ListGroup.Item className="mb-2">
                      <Link to={`posts/categories/${c.id}`}>
                      
                      <h3>
                        <Category category={c} />
                      </h3>
                    
                      </Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            )
          })}
      </article>
    </>
  );
};
