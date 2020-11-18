import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import ListGroup from "react-bootstrap/ListGroup"
import { PostContext } from "./PostProvider"
import { ImagePostListItem } from "./ImagePostListItem"

export const UserPostList = props => {
  const { userId } = props

  const { posts, getPostsByUserId } = useContext(PostContext)

  posts.sort((a,b) => b.id - a.id)

  useEffect(() => {
    getPostsByUserId(userId) 
  }, [])

  const getHeader = () => {
    if(userId === parseInt(localStorage.getItem('rare_user_id'))) {
      return "My Posts"
    }
    else if(posts.length) {
      return `${posts[0].user.username}'s Posts`
    }

    return ""
  }
 
  return (
    <div className="postList">
      <h1 className="text-center my-4">{getHeader()}</h1>
      <ListGroup>
        { posts.map(post => (
          <ListGroup.Item action key={post.id} as={Link} to={`/posts/${post.id}`}>
            <ImagePostListItem post={post} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}