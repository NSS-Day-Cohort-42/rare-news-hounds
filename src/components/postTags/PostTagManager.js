import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { PostTagForm } from "./PostTagForm"

export const PostTagManager = ({postId}) => {
	const [ isEditing, setIsEditing ] = useState(false)

	const endEditTags = () => setIsEditing(false)
	const startEditTags = () => setIsEditing(true)

	return (
		<>
		{
			isEditing ?
			<PostTagForm endEditTags={endEditTags} postId={postId}/>
			: <Button 
			onClick={startEditTags}
			 >Manage Tags</Button>
		}
		</>
	)
}