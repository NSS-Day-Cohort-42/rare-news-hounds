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
    <div className="commentList" style={{ maxHeight: '250px', overflowY: 'scroll' }}>
      <ListGroup>
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