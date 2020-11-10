import React from "react"
import { Row, Col } from "react-bootstrap"

import CategoryForm from "./CategoryForm"
import CategoryList from "./CategoryList"

/**
 * Component to wrap the CategoryForm and CategoryList, mostly for layout purposes
 */
export const CategoryManager = () => {

  /* Row having flex-md-row-reverse className will cause the Form to appear on the right in medium-and-up
  screen sizes, but to stack on top of the CategoryList in lower-than-medium screen sizes */
  return (
    <Row className="flex-md-row-reverse align-items-start justify-content-around">
      <Col lg="5" sm="12" className="border border-dark rounded py-4">
        <h2 className="text-center">Create a new category</h2>
        <CategoryForm />
      </Col>
      <Col lg="5" sm="12">
        <h2 className="text-center my-4">Categories</h2>
        <CategoryList />
      </Col>
    </Row>
  )
}