import React, { useContext } from "react"
import { ConfirmableDeleteButton } from "./ConfirmableDeleteButton"
import EditPostButton from "./EditPostButton"
import { PostContext } from "./PostProvider"
import Badge from "react-bootstrap/Badge"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "./PostListItem.css"

export const UserPostListItem = props => {
  const { post } = props
  const { id, title, user, category, publication_date } = post

  const { deletePost, getPostsByUserId } = useContext(PostContext)

  const handleDelete = id => {
    deletePost(id)
      .then(() => getPostsByUserId(localStorage.getItem('rare_user_id')))
  }

  return (
    <Row className="align-items-center">
      <Col sm="7">
        <p className="postListItem__title text-primary my-1 mr-2 font-weight-bold">{title}</p>
        <p className="postListItem__author text-uppercase my-1 mr-1">{user.fullname}</p>
        <p className="postListItem__author text-uppercase my-1 mr-1">{publication_date}</p>
        </Col>
      <Col sm="5">
        <Row className="justify-content-end align-items-center">
          <Badge variant="info" className="postListItem__category">
            <span className="postListItem__categoryName">{category.label}</span>
          </Badge>

          <ConfirmableDeleteButton onDelete={() => handleDelete(id)} />
          <EditPostButton postId={id} />
        </Row>
      </Col>
    </Row>
  )
}