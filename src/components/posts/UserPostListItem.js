import React, { useContext } from "react"
import { ConfirmableDeleteButton } from "./ConfirmableDeleteButton"
import EditPostButton from "./EditPostButton"
import { PostContext } from "./PostProvider"
import { Row, Col, Image } from "react-bootstrap"
import "./PostListItem.css"

export const UserPostListItem = props => {
  const { post } = props
  const { id, title, user, publication_date, image_url } = post
  const readableDate = (new Date(publication_date + 'T00:00:00')).toLocaleDateString('en-Us')

  const { deletePost, getPostsByUserId } = useContext(PostContext)

  const handleDelete = id => {
    deletePost(id)
      .then(() => getPostsByUserId(localStorage.getItem('rare_user_id')))
  }

  return (
    <div>
      <Row className="align-items-center">
        <Col sm="8">
          <h2 className="font-weight-bold">{title}</h2>
        </Col>
        <Col sm="4">
          <p className="text-right">Publication Date: {readableDate}</p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Image src={image_url} style={{ maxHeight: '300px' }} />
      </Row>

      <Row className="align-items-center">
        <Col sm="3">
          <p>Author: {user.fullname}</p>
        </Col>
        <Col sm="6" className="d-flex justify-content-end">
          <div>Reactions Placeholder</div>
        </Col>
        <Col sm="3" className="d-flex justify-content-end">
          <EditPostButton postId={id} />
          <ConfirmableDeleteButton onDelete={() => handleDelete(id)} />
        </Col>
      </Row>
    </div>
  )

  // return (
  //   <Row className="align-items-center">
  //     <Col sm="7">
  //       <p className="postListItem__title text-primary my-1 mr-2 font-weight-bold">{title}</p>
  //       <p className="postListItem__author text-uppercase my-1 mr-1">{user.fullname}</p>
  //       <p className="postListItem__author text-uppercase my-1 mr-1">{publication_date}</p>
  //       </Col>
  //     <Col sm="5">
  //       <Row className="justify-content-end align-items-center">
  //         <Badge variant="info" className="postListItem__category">
  //           <span className="postListItem__categoryName">{category.label}</span>
  //         </Badge>

  //         <ConfirmableDeleteButton onDelete={() => handleDelete(id)} />
  //         <EditPostButton postId={id} />
  //       </Row>
  //     </Col>
  //   </Row>
  // )
}