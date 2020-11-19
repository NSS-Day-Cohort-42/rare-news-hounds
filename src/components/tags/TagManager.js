import React from "react"
import { Row, Col } from "react-bootstrap"

import TagForm from "./TagForm"
import TagList from "./TagList"

/**
 * Component to wrap the TagForm and TagList, mostly for layout purposes
 */
export const TagManager = () => {

  /* Row having flex-md-row-reverse className will cause the Form to appear on the right in medium-and-up
  screen sizes, but to stack on top of the List in lower-than-medium screen sizes */
  return (
    <Row className="flex-md-row-reverse align-items-start justify-content-around">
      { localStorage.getItem('is_admin') && 
        <Col lg="5" sm="12" className="border border-dark rounded py-4">
          <h2 className="text-center">Create a new tag</h2>
          <TagForm />
        </Col>
      }
      <Col lg="5" sm="12">
        <h2 className="text-center my-4">Tags</h2>
        <TagList />
      </Col>
    </Row>
  )
}