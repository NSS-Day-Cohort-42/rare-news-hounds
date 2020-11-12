import React, { useEffect, useContext, useState } from "react"
import { ListGroup, Col, Row } from "react-bootstrap"
import { CommentContext } from "./CommentProvider"
import { ConfirmableDeleteButton } from "../posts/ConfirmableDeleteButton"


export const CommentList = props => {
  const { comments, getCommentsByPostId, deleteComment } = useContext(CommentContext)

  useEffect(() => {
    const postId = parseInt(props.match.params.postId);
    getCommentsByPostId(postId)
    
  }, [])

  const confirmDelete = (commentId, props) => {
    const postId = parseInt(props.match.params.postId);
    deleteComment(commentId, postId);
  };

  
  return (
    <div>
      <div className="commentList" style={{ maxHeight: '250px', overflowY: 'scroll' }}>
        <ListGroup>

          {
            comments.map(c => {
              if (parseInt(localStorage.getItem("rare_user_id")) === c.author.id ) {
                return (

                  <div>
                <ListGroup.Item key={c.id}>
                 
                 <Row className="justify-content-between">
                  <h1>subject: {c.subject}</h1>
                      
                        <ConfirmableDeleteButton
                          prompt="Are you sure you want to delete this comment?"
                          onDelete={() => confirmDelete(c.id, props)} />
                      
                   </Row>
                  <h4>{c.content}</h4>
                  <h4>{new Date(c.created_on).toLocaleDateString('en-Us')}</h4>
                  <h4>{c.author && c.author.username}</h4>
                 
                  
                  
                  
                  
                  
                </ListGroup.Item>

              </div>
                          )
                        }
              else {
                return (

                  <div>
                <ListGroup.Item key={c.id}>
                  <div comment={c.content} />
                  <h1>subject: {c.subject}</h1>
                  <h4>{c.content}</h4>
                  <h4>{new Date(c.created_on).toLocaleDateString('en-Us')}</h4>
                  <h4>{c.author && c.author.username}</h4>
                  
                  
                  
                </ListGroup.Item>

              </div>
                          )
              }
            })
          }
        </ListGroup>

      </div>
    </div>
  )

}

