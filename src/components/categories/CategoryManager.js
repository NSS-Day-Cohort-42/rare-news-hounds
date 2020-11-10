import React from "react"
import { Row, Col } from "react-bootstrap"

import CategoryForm from "./CategoryForm"
import CategoryList from "./CategoryList"

export const CategoryManager = () => {
  return (
    <Row className="flex-md-row-reverse align-items-start justify-content-around">
      <Col md="5" sm="12" className="border border-dark rounded py-4">
        <h2 className="text-center">Create a new category</h2>
        <CategoryForm />
      </Col>
      <Col md="5" sm="12">
        <h2 className="text-center my-4">Categories</h2>
        <CategoryList />
      </Col>
    </Row>
  )
}