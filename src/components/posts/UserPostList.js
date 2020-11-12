import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import ListGroup from "react-bootstrap/ListGroup"
import { PostContext } from "./PostProvider"
import { ImagePostListItem } from "./ImagePostListItem"

export const UserPostList = props => {
  const { posts, getPostsByUserId } = useContext(PostContext)

  posts.sort((a,b) => a.publication_date - b.publication_date)


  useEffect(() => {
    getPostsByUserId(localStorage.getItem('rare_user_id')) 
  }, [])
 
  return (
    <div className="postList">
      <h1 className="text-center my-4">My Posts</h1>
      <ListGroup>
        { posts.map(post => (
          <ListGroup.Item action key={post.id} as={Link} to={`/posts/${post.id}`}>
            <ImagePostListItem post={post} />
          </ListGroup.Item>
        )).reverse()}
      </ListGroup>
    </div>
  )
}