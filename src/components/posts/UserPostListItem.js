import React, { useContext } from "react"
import { ConfirmableDeleteButton } from "./ConfirmableDeleteButton"
import EditPostButton from "./EditPostButton"
import { PostContext } from "./PostProvider"
import "./PostListItem.css"

export const UserPostListItem = props => {
  const { post } = props
  const { id, title, user, category } = post

  const { deletePost, getPostsByUserId } = useContext(PostContext)

  const handleDelete = id => {
    deletePost(id)
      .then(() => getPostsByUserId(localStorage.getItem('rare_user_id')))
  }

  return (
    <div className="postListItem">
      <div className="postListItem--col-left">
        <p className="postListItem__title">{title}</p>
        <p className="postListItem__author">{user.first_name} {user.last_name}</p>
      </div>
      <div className="postListItem--col-right">
        <p className="postListItem__category">{category.name}</p>
        <ConfirmableDeleteButton onDelete={() => handleDelete(id)} />
        <EditPostButton postId={id} />
      </div>
    </div>
  )
}