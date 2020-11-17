import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { Row, Button, Table } from "react-bootstrap"
import { MdAdd } from "react-icons/md"
import { PostContext } from "./PostProvider"
import EditPostButton from "./EditPostButton"
import { ConfirmableDeleteButton } from "./ConfirmableDeleteButton"
import Category from "../categories/Category"
import Tag from "../tags/Tag"

export const PostList = props => {
    const { getPosts, deletePost, posts, getPostsByCategoryId } = useContext(PostContext)

    posts.sort((a,b) => b.id - a.id)

  
   const categoryId = parseInt(props.match.params.categoryId)
 
    getPostsByCategoryId(categoryId)
  
    useEffect((props) => {
      getPosts()
    }, [])
  

    const history = useHistory()

    const handleDelete = postId => {
      deletePost(postId)
        .then(getPosts)
    };

  const byCategory = parseInt(props.match.params.hasOwnProperty("categoryId"))
    useEffect(()=>{
        getPosts().then(() => {
          if(byCategory) {
            getPostsByCategoryId(props.match.params.categoryId)
          }
        })
    },[])


 return (
        <div className="postList">
          <Row className="align-items-center justify-content-end my-4">
            <Button variant="light" 
              className="d-flex align-items-center"
              onClick={() => history.push('/posts/create')}>
              Add Post <MdAdd style={{ fontSize: '48px' }} />
            </Button>
          </Row>

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
                  const { id, title, user, publication_date, category, tags } = post;
                  const readableDate = (new Date(publication_date + 'T00:00:00')).toLocaleDateString('en-US')
                  return (
                    <tr key={id} className="position-relative">
                      <td>
                        {
                          user.id === parseInt(localStorage.getItem('rare_user_id')) &&
                          <div className="d-flex">
                            <EditPostButton postId={id} />
                            <ConfirmableDeleteButton 
                              prompt="Are you sure you want to delete this post?"
                              onDelete={() => handleDelete(id)} />
                          </div>
                        }
                      </td>
                      <td><Link to={`/posts/${id}`}>{title}</Link></td>
                      <td>{user.username}</td>
                      <td>{readableDate}</td>
                      <td>
                        <Category category={category} />
                      </td>
                      <td>
                        {tags.map(t => (
                            <Tag key={t.id} tag={t} />
                        ))}
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table> 
        </div>
      )
    }
    