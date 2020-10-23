import React from "react"
import "./PostListItem.css"

export const PostListItem = props => {
  const { post } = props
  const { title, user_id, category_id } = post

  return (
    <div className="PostListItem">
      <div className="PostListItem--col-left">
        <p className="PostListItem__title">{title}</p>
        <p className="PostListItem__author">{user_id}</p>
      </div>
      <div className="PostListItem--col-right">
        <p className="PostListItem__category">{category_id}</p>
      </div>
    </div>
  )
}