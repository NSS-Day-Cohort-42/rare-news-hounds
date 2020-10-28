import React, { useEffect, useContext } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { CommentContext } from "./CommentProvider"
import { Comment } from "./Comment"

export const CommentList = props => {
  const { postId } = props

  const { comments, getCommentsByPostId } = useContext(CommentContext)

  useEffect(() => {
    getCommentsByPostId(postId)
  }, [])

  return (
    <div>
      <h3 className="text-center my-3">Comments</h3>
      <ListGroup className="w-75 mx-auto">
        {
          comments.map(c => (
            <ListGroup.Item key={c.id}>
              <Comment comment={c} />
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </div>
  )
}