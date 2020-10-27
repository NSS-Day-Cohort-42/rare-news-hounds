import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import ListGroup from "react-bootstrap/ListGroup"
import { PostContext } from "./PostProvider"
import { UserPostListItem } from "./UserPostListItem"

export const UserPostList = props => {
  const { posts, getPostsByUserId } = useContext(PostContext)

  const sortPostsByCreation = posts.sort((a,b) => b.creation_time - a.creation_time)


  useEffect(() => {
    getPostsByUserId(localStorage.getItem('rare_user_id')) 
  }, [])
 
  return (
    <div className="userPostList">
      <ListGroup>
        { posts.map(post => (
          <ListGroup.Item key={post.id} as={Link} to={`/posts/${post.id}`}>
            <UserPostListItem post={post} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}