import React from "react"
import "./UserPostListItem.css"

export const UserPostListItem = props => {
  const { post } = props
  const { title, user_id, category_id } = post

  return (
    <div className="userPostListItem">
      <div className="userPostListItem--col-left">
        <p className="userPostListItem__title">{title}</p>
        <p className="userPostListItem__author">{user_id}</p>
      </div>
      <div className="userPostListItem--col-right">
        <p className="userPostListItem__category">{category_id}</p>
      </div>
    </div>
  )
}