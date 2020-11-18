import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { ListGroup } from "react-bootstrap"

import { PostContext } from "./PostProvider"
import { ImagePostListItem } from "./ImagePostListItem"

export const SubscribedPostList = () => {
  const { posts, getSubscribedPosts } = useContext(PostContext)

  useEffect(() => {
    getSubscribedPosts()
  }, [])

  return (
    <div className="postList">
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