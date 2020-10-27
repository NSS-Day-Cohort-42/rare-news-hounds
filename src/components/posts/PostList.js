import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import ListGroup from "react-bootstrap/ListGroup"
import { PostContext } from "./PostProvider"
import { PostListItem } from "./PostListItem"
import CategoryDropDown from "./CategoryDropDown"


export const PostList = props => {
    const { getPosts, posts } = useContext(PostContext)

    
    posts.sort((a,b) => b.creation_time - a.creation_time)

    // Initialization effect hook -> Go get animal data
    useEffect(() => {
        getPosts()
    }, [])

  
    

    return (
        <div className="postList">
          <CategoryDropDown action={props}/>
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