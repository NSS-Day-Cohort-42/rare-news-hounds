import React, { useEffect, useContext, useState } from "react"
import { Link } from "react-router-dom"
import { ListGroup } from "react-bootstrap"

import { PostContext } from "./PostProvider"
import { ImagePostListItem } from "./ImagePostListItem"

export const SubscribedPostList = () => {
  const { posts, getSubscribedPosts } = useContext(PostContext)

  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    getSubscribedPosts()
      .then(() => setIsLoaded(true))
  }, [])

  let loadingMessage;
  if(!isLoaded) {
    loadingMessage = "Loading..."
  }
  else if(isLoaded && !posts.length) {
    loadingMessage = "There are no posts to show in your feed right now... go subscribe to some users with posts! Start tailing some puppers (puppers is a metaphor for users) to see some posts here!!!"
  }

  return (
    <div className="postList">
      <h1>My Feed</h1>
      <p className="font-italic">{loadingMessage}</p>
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