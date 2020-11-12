import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { Row, Col, Button, Table } from "react-bootstrap"
import { MdAdd } from "react-icons/md"

import { PostContext } from "./PostProvider"
import CategoryDropDown from "./CategoryDropDown"
import EditPostButton from "./EditPostButton"
import { ConfirmableDeleteButton } from "./ConfirmableDeleteButton"

export const PostList = props => {
    const { getPosts, deletePost, posts } = useContext(PostContext)

    posts.sort((a,b) => b.creation_time - a.creation_time)

    // Initialization effect hook -> Go get post data
    useEffect(() => {
        getPosts()
    }, [])

    const history = useHistory()

    const handleDelete = postId => {
      deletePost(postId)
        .then(getPosts)
    };

    return (
        <div className="postList">
          <Row className="align-items-center my-4">
            <Col>
              <input placeholder="search" />
            </Col>
            <Col className="d-flex justify-content-end">
              <Button variant="light" 
                className="d-flex align-items-center"
                onClick={() => history.push('/posts/create')}>
                Add Post <MdAdd style={{ fontSize: '48px' }} />
              </Button>
            </Col>
          </Row>

          <CategoryDropDown action={props}/>

          <Table bordered hover responsive="md">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Category</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {
                posts.map(post => {
                  const { title, user, publication_date, category, tags } = post;
                  return (
                    <tr className="position-relative">
                      <td>
                        {
                          user.id === parseInt(localStorage.getItem('rare_user_id')) &&
                          <div className="d-flex">
                            <EditPostButton postId={post.id} />
                            <ConfirmableDeleteButton 
                              prompt="Are you sure you want to delete this post?"
                              onDelete={() => handleDelete(post.id)} />
                          </div>
                        }
                      </td>
                      <td><Link to={`/posts/${post.id}`}>{title}</Link></td>
                      <td>{user.username}</td>
                      <td>{publication_date}</td>
                      <td>{category.label}</td>
                      <td>{tags.map(t => t.label).join(', ')}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table> 
        </div>
      )
    }