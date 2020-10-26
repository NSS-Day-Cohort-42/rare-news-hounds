import React, { useContext } from "react"
import { ConfirmableDeleteButton } from "./ConfirmableDeleteButton"
import EditPostButton from "./EditPostButton"
import { PostContext } from "./PostProvider"
import "./UserPostListItem.css"

export const UserPostListItem = props => {
  const { post } = props
  const { id, title, user, category } = post

  const { deletePost, getPostsByUserId } = useContext(PostContext)

  const handleDelete = id => {
    deletePost(id)
      .then(() => getPostsByUserId(localStorage.getItem('rare_user_id')))
  }

  return (
    <div className="userPostListItem">
      <div className="userPostListItem--col-left">
        <p className="userPostListItem__title">{title}</p>
        <p className="userPostListItem__author">{user.first_name} {user.last_name}</p>
      </div>
      <div className="userPostListItem--col-right">
        <p className="userPostListItem__category">{category.name}</p>
        <ConfirmableDeleteButton onDelete={() => handleDelete(id)} />
        <EditPostButton action={props} />
      </div>
    </div>
  )
}