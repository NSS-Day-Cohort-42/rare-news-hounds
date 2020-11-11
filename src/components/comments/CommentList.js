import React, { useEffect, useContext, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { CommentContext } from "./CommentProvider"


export const CommentList = props => {
  const { comments, getCommentsByPostId } = useContext(CommentContext)
  
  useEffect(() => {
    const postId = parseInt(props.match.params.postId);
    getCommentsByPostId(postId)
  }, [])

  return (
    <div>
      <div className="commentList" style={{ maxHeight: '250px', overflowY: 'scroll' }}>
        <ListGroup>

          {
            comments.map(c => (
              <ListGroup.Item key={c.id}>
                <div comment={c.content} />
                <h1>subject: {c.subject}</h1>
                <h4>{c.content}</h4>
                <h4>{new Date(c.created_on).toLocaleDateString('en-Us')}</h4>
                <h4>{c.author && c.author.username}</h4>
              </ListGroup.Item>
            ))
          }
        </ListGroup>

      </div>
    </div>
  )

}

