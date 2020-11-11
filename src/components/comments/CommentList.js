import React, { useEffect, useContext } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { CommentContext } from "./CommentProvider"
import { Comment } from "./Comment"
import CommentForm from './CommentForm'


export const CommentList = props => {

  const { postId } = props

  const { comments, getCommentsByPostId } = useContext(CommentContext)
console.log('Here',comments)
  useEffect(() => {
    getCommentsByPostId(postId)
  }, [])

  return (
    <div>
      {/* <CommentForm {...props}/> */}

      <div className="commentList" style={{ maxHeight: '250px', overflowY: 'scroll' }}>
        <ListGroup>
          {
            comments.map(c => (
              <ListGroup.Item key={c.id}>
                <Comment comment={c.content} />
              </ListGroup.Item>
            ))
          }
        </ListGroup>

      </div>
    </div>
  )

}

