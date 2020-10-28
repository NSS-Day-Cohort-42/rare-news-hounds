import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { ConfirmableDeleteButton } from "../posts/ConfirmableDeleteButton"

export const Comment = props => {
  const { comment } = props
  const { id, content, post_id, user_id, user } = comment

  return (
    <Row>
      <Col sm="8">
        <p className="font-weight-bold">{user.username}</p>
        <p>{content}</p>
      </Col>
      {
        parseInt(localStorage.getItem("rare_user_id")) === user_id && (
          <Col sm="4">
            <ConfirmableDeleteButton onDelete={() => alert(`delete ${id}, from post ${post_id}`)} />
          </Col>
        )
      }
    </Row>
  )
}