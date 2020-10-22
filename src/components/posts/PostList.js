import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import ListGroup from "react-bootstrap/ListGroup"
import { PostContext } from "./PostProvider"
import { Post } from "./Post"
import "./Animals.css"

export const PostList = props => {
    const { getPosts, posts } = useContext(PostContext)

    

    // Initialization effect hook -> Go get animal data
    useEffect(() => {
        getPosts()
    }, [])

   

    useEffect(() => {
        setFiltered(animals)
    }, [animals])

    return (
        <div className="postList">
          <ListGroup>
            { posts.map(post => (
              <ListGroup.Item key={post.id} as={Link} to={`/posts/${post.id}`}>
                <PostListItem post={post} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )
    }