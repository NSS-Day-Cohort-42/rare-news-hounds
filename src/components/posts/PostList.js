import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import ListGroup from "react-bootstrap/ListGroup"
import { PostContext } from "./PostProvider"
import { PostListItem } from "./PostListItem"
import CategoryDropDown from "./CategoryDropDown"

export const PostList = props => {
    const { getPosts, posts } = useContext(PostContext)

    posts.sort((a,b) => b.publication_date - a.publication_date)

    // Initialization effect hook -> Go get post data
    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className="postList">
          <h1 className="text-center my-4">All Posts</h1>
          <CategoryDropDown action={props}/>
          <ListGroup>
            { posts.map(post => (
              <ListGroup.Item action key={post.id} as={Link} to={`/posts/${post.id}`}>
                <PostListItem post={post} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )
    }