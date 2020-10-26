import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { PostTagForm } from "./PostTagForm"

export const PostTagManager = ({postId, isPostAuthor}) => {
	const [ isEditing, setIsEditing ] = useState(false)

	const endEditTags = () => setIsEditing(false)
	const startEditTags = () => setIsEditing(true)

	const displayTagList = () => {

		return <>
		<div>List of tags goes here</div>
		{
		isPostAuthor
		? <Button 
				onClick={startEditTags} >
				Manage Tags
			</Button>
		: '' 
		}

		</>
	}

	return (
		<>
		{
			isEditing 
			? <PostTagForm endEditTags={endEditTags} postId={postId}/>
			: displayTagList()
		}
		</>
	)
}