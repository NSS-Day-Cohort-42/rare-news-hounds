import React from "react"
import "./PostListItem.css"

export const PostListItem = props => {
  const { post } = props
  const { title, user, category } = post

  return (
    <div className="postListItem">
      <div className="postListItem--col-left">
        <p className="postListItem__title mr-2">{title}</p>
        <p className="postListItem__author mr-1">{user.first_name} {user.last_name}</p>
      </div>
      <div className="postListItem--col-right">
        <p className="postListItem__category">{category.name}</p>
      </div>
    </div>
  )
}
