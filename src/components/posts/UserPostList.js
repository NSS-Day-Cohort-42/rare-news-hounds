import React, { useEffect, useContext, useState } from "react"
import { Link } from "react-router-dom"
import ListGroup from "react-bootstrap/ListGroup"
import { PostContext } from "./PostProvider"
import { ImagePostListItem } from "./ImagePostListItem"

export const UserPostList = props => {
  const { userId } = props

  const { posts, getPostsByUserId } = useContext(PostContext)

  // state variable keeping track of if call to API has resolved yet
  const [ isLoaded, setIsLoaded ] = useState(false)

  const isCurrentUser = userId === parseInt(localStorage.getItem('rare_user_id'))

  posts.sort((a,b) => b.id - a.id)

  useEffect(() => {
    getPostsByUserId(userId) 
      .then(() => setIsLoaded(true))
  }, [])

  /**
   * Get the proper header for the list
   */
  const getHeader = () => {
    // List of user's own posts - header should be "My Posts"
    if(isCurrentUser) {
      return "My Posts"
    }

    // Not the user's own posts and the API call has returned with posts - 
    // grab the username from the first post
    else if(!isCurrentUser && posts.length) {
      return `${posts[0].user.username}'s Posts`
    }

    // The API call returned with no posts, tell the user there are no posts for this user
    else if(!posts.length && isLoaded) {
      return "There are no posts for this user :/"
    }
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