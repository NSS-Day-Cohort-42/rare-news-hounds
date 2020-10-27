import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { PostTagForm } from "./PostTagForm"
import { PostTagList } from "./PostTagList"

export const PostTagManager = ({postId, isPostAuthor}) => {
	const [ isEditing, setIsEditing ] = useState(false)

	const endEditTags = () => setIsEditing(false)
	const startEditTags = () => setIsEditing(true)

	return (
		<>
		{
			isEditing 
			? <PostTagForm endEditTags={endEditTags} postId={postId}/>
			: <>
			<PostTagList postId={postId}/>
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
		</>
	)
}