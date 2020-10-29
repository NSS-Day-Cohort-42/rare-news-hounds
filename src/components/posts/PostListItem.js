import React from "react"
import Badge from "react-bootstrap/Badge"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "./PostListItem.css"

export const PostListItem = props => {
  const { post } = props
  const { title, user, category } = post

  return (
    <Row className="align-items-center">
      <Col sm="10">
          <p className="postListItem__title my-1 mr-2 font-weight-bold">{title}</p>
          <p className="postListItem__author text-uppercase my-1 mr-1">{user.first_name} {user.last_name}</p>
      </Col>
      <Col sm="2" className="d-flex justify-content-end">
        <Badge variant="info">
          <span className="postListItem__categoryName">{category.name}</span>
        </Badge>
      </Col>
    </Row>
  )
}
